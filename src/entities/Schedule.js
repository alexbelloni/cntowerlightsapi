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

    /**
     * @param {string} colours
     * Simple or multiple names e.g. "Blue and Red" or "Yellow Purple"
     * @returns {string|Array}
     * Colour names
     */
    function _getColours(colours) {
        const str = colours.trim().replace(' and ', ' ').replace(new RegExp(',', 'g'), ' ').toLowerCase();
        const arr = str.split(" ");
        const arrCopy = [];
        arr.forEach((element) => {
            const e = element.trim();
            if (e && arrCopy.indexOf(e) === -1) {
                arrCopy.push(e.trim());
            }
        });
        return arrCopy;
    }

    /**
     * @param {string|Array} currentNode 
     * 3 elements from a table line e.g. 'June 3', 'ALS Awareness Month', 'Purple Yellow and Green'
     * @returns {object}
     * { occasions, colourCaption, colours }
     */
    function _getConfig(currentNode) {
        const colourCaption = currentNode[2];
        const colours = _getColours(colourCaption) || [];
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

    /**
     * @param {string|Array} linesArray 
     * Each columns of the table
     * @returns {object}
     * {"month":"January","dates":[{"day":25,"configs":[{"occasions":"Chinese New Year - Year of the Rat","colourCaption":"Red","colours":["red"]}]}]}
     */
    function _getTowerSchedule(linesArray) {
        const items = _getValidLines(linesArray)

        if (!items || items.length < NUMBER_OF_COLUMNS) {
            return [];
        }

        let month = _getMonth(items[items.length - NUMBER_OF_COLUMNS]);
        if (!month) {
            return [];
        }

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

    this.getTowerSchedule = _getTowerSchedule;
}

module.exports = Schedule;