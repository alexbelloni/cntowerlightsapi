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
        } catch{
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

    const NUMBER_OF_COLUMNS = 3

    /**
     * @param {string|Array} arr 
     * Each columns of the table 
     * @returns {string|Array}
     * Valid columns
     */
    function _getValidLines(arr) {
        return arr && arr.slice(NUMBER_OF_COLUMNS, arr.length - NUMBER_OF_COLUMNS)
    }

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
     * @param {*} linesArray agenda as an array of the strings
     */
    function _getTowerScheduleComplete(linesArray) {
        const items = _getValidLines(linesArray);
        if (!items || items.length < NUMBER_OF_COLUMNS) {
            return [];
        }

        const months = [];
        let month = _getMonth(items[0]);
        months.push(_getMonthObject(month, items));
        month = _getMonth(items[items.length - NUMBER_OF_COLUMNS]);
        if (months[0].month !== month) {
            months.push(_getMonthObject(month, items));
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