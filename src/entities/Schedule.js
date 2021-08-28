const colorsJson = require('./colors.json')
const Schedule = function () {
    /**
     * @param {string} element 
     * Complete date e.g. June 3
     * @returns {string} 
     * Just the month
     */
    function _getMonth(element) {
        return element && element.substr(0, element.indexOf(' '));
    }

    const colorKeys = Object.keys(colorsJson);

    function _isColorName(colorname) {
        for (let i = 0; i < colorKeys.length; ++i) {
            if (colorsJson[colorKeys[i]].toLowerCase() === colorname.toLowerCase()) {
                return true
            }
        }
        return false
    }

    /**
     * @param {string} colours
     * Simple or multiple names e.g. "Blue and Red" or "Yellow Purple"
     * @returns {string|Array}
     * Colour names
     */
    function _getColours(colours) {
        try {
            const str = colours.trim().replace(' and ', ' ').replace(new RegExp(',', 'g'), ' ').toLowerCase();
            const arr = str.split(" ");
            const arrCopy = [];
            arr.forEach((element) => {
                const e = element.trim();
                if (e && arrCopy.indexOf(e) === -1 && _isColorName(e.trim())) {
                    arrCopy.push(e.trim());
                }
            });
            return arrCopy
        } catch {
            return []
        }
    }

    /**
     * @param {string|Array} currentNode 
     * 3 elements from a table line e.g. 'June 3', 'ALS Awareness Month', 'Purple Yellow and Green'
     * @returns {object}
     * { occasions, colourCaption, colours }
     */
    function _getConfig(currentNode) {
        let colourCaption = typeof currentNode[2] === "string" ? currentNode[2] : "";
        let colours = _getColours(colourCaption)
        if (colours.length === 0) colours = _getColours(currentNode[1]);
        if (!colourCaption) {
            colourCaption = colours.join(', ');
        }
        const occasions = currentNode[1];
        return { occasions, colourCaption, colours };
    }

    // based on the spreadsheet of the CNTower agenda
    // actual: 'Date', 'Occasion* (Subject to Change)', and 'Colour'
    const NUMBER_OF_COLUMNS = 3

    /**
     * @param {string|Array} arr 
     * The whole spreadsheet as an array of strings 
     * [ 
     *  "Date",
     *  "Occasion* (Subject to Change)",
     *  "Colour",
     *  ... valid lines ...
     *  "CN Tower",
     *  "Canada Lands Company Société Immobilière du Canada",
     *  "Canada" 
     * ]
     * @returns {string|Array}
     * Valid columns
     */
    function _getValidLines(arr) {
        const startValidLines = NUMBER_OF_COLUMNS;
        const endValidLines = arr.length - NUMBER_OF_COLUMNS;
        return arr && arr.slice(startValidLines, endValidLines);
    }

    /**
     * 
     * @param {string} month 
     * e.g. March, April
     * @param {array} items 
     * valid array of the cntower's spreadsheet
     * @returns 
    { 
        month: 'June',
        dates:
            [ { day: 1, configs: [ 
                { occasions: 'ALS Awareness Month',
                    colourCaption: 'Purple',
                    colours: [ 'purple' ] },
                { occasions: 'Unplug to Connect - Boys and Girls Clubs of Canada',
                    colourCaption: 'Green',
                    colours: [ 'green' ] } ] },
              { day: 2, configs: [Array] }
            ]
    }
     */
    function _getMonthObject(month, items) {
        let dates = [];
        let currentNode = [];
        items.forEach((element, index) => {
            currentNode.push(element);
            const newNode = ((index + 1) % NUMBER_OF_COLUMNS) === 0;
            if (newNode) {
                if (currentNode[0].indexOf(month) > -1) {
                    const day = currentNode[0].replace(month, '').trim();
                    const config = _getConfig(currentNode);

                    const lastDate = dates[dates.length - 1];
                    if (lastDate && lastDate.day === parseInt(day)) {
                        lastDate.configs.push(config);
                    } else {
                        dates.push({ day: parseInt(day), configs: [config] });
                    }
                }
                currentNode = [];
            }
        });

        const ret = { month, dates };
        return ret;
    }

    /**
     * Returns an array with month objects
     * @param {*} linesArray agenda as an array of strings
     * @returns 
     * Array of MonthObjects {month, dates} 
     */
    async function _getTowerScheduleComplete(linesArray) {
        const lines = _getValidLines(linesArray);
        if (!lines || lines.length < NUMBER_OF_COLUMNS) {
            return [];
        }

        const months = [];
        let month = _getMonth(lines[0]);
        if (month) {
            const monthObj = _getMonthObject(month, lines);

            //try to get the last JSON agenda from database
            try{
                const Database = require('../utils/Database');
                const lastAgenda = await Database.getLastRecord();
                const aa = JSON.parse(lastAgenda)
                const dates = aa.find(a => a.month === month);
                const datesnew = dates.dates.reduce((acc, cur) => {
                    return acc.some(m => m.day === cur.day) ? acc : [...acc, cur]
                }, monthObj.dates).sort((a,b)=>{
                    return a.day < b.day ? -1 : (a.day > b.day ? 1 : 0)
                })            
                monthObj.dates = datesnew;
            } catch(e){}


            months.push(monthObj);
            //Verify if agenda has one more distinct month (agenda can have one or two months)
            const lastValidLineIndex = lines.length - NUMBER_OF_COLUMNS;
            month = _getMonth(lines[lastValidLineIndex]);
            if (months[0].month !== month) {
                months.push(_getMonthObject(month, lines));
            }
        }
        return months;
    }

    /**
     * Returns an array with the colour names
     * @param {*} linesArray agenda as an array of the strings
     */
    function _getLightColours(linesArray) {
        const items = _getValidLines(linesArray);
        if (!items || items.length < NUMBER_OF_COLUMNS) {
            return [];
        }

        let currentNode = [], colours = [];
        items.forEach((element, index) => {
            currentNode.push(element);
            const newNode = ((index + 1) % NUMBER_OF_COLUMNS) === 0;
            if (newNode) {
                const config = _getConfig(currentNode);
                colours = [...colours, ...config.colours];
                currentNode = [];
            }
        })
        return Array.from(new Set(colours)).sort();
    }

    this.getTowerScheduleComplete = _getTowerScheduleComplete;
    this.getLightColours = _getLightColours;
}

module.exports = Schedule;