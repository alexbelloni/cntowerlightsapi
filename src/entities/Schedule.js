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
        if(colours.length === 0) colours = _getColours(currentNode[1]);
        if(!colourCaption){
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

    function _getMonthObject(month, items){
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
     * @param {string|Array} linesArray 
     * Each columns of the table
     * @returns {object}
     * {"month":"January","dates":[{"day":25,"configs":[{"occasions":"Chinese New Year - Year of the Rat","colourCaption":"Red","colours":["red"]}]}]}
     */
    function _getTowerSchedule(linesArray) {
        const items = _getValidLines(linesArray);
        if (!items || items.length < NUMBER_OF_COLUMNS) {
            return [];
        }

        const month = _getMonth(items[items.length - NUMBER_OF_COLUMNS]);
        if (!month) {
            return [];
        }

        return _getMonthObject(month, items);
    }

    function _getTowerScheduleComplete(linesArray) {
        //TEST
        // return[{"month":"June","dates":[{"day":1,"configs":[{"occasions":"National Deafblind Awareness Month","colourCaption":"Blue","colours":["blue"]}]},{"day":3,"configs":
        // [{"occasions":"National AccessAbility Week","colourCaption":"Green, magenta and blue","colours":["green","magenta","blue"]}]},{"day":5,"configs":
        // [{"occasions":"World Environment Day / Canadian Environment Week","colourCaption":"Green (dusk to 4:00 am)","colours":["green"]},
        // {"occasions":"Solace Sunrise Walk for Mental Health and Suicide Awareness","colourCaption":"Yellow (4:00 am to sunrise)","colours":["yellow"]}]},
        // {"day":7,"configs":[{"occasions":"Canadian Forces Day","colourCaption":"Red and white","colours":["red","white"]}]},{"day":8,"configs":
        // [{"occasions":"Tonight major Toronto landmarks, venues and hotels will turn purple in support of the hospitality workers affected by job loss due to COVID-19. Toronto joins other cities across North America in going purple, as part of the #HospitalityStrong campaign","colourCaption":"Purple",
        // "colours":["purple"]}]},{"day":9,"configs":[{"occasions":"Spinal CSF Leak Awareness Week","colourCaption":"Purple","colours":["purple"]}]},{"day":10,"configs":
        // [{"occasions":"Brain Injury Awareness Month","colourCaption":"Blue and green","colours":["blue","green"]}]},
        // {"day":14,"configs":[{"occasions":"National Blood Donor Week","colourCaption":"Red and white","colours":["red","white"]}]},
        // {"day":15,"configs":[{"occasions":"World Elder Abuse Awareness Day","colourCaption":"Purple","colours":["purple"]}]},{"day":17,"configs":
        // [{"occasions":"International CDKL5 Awareness Day","colourCaption":"Lime green","colours":["lime","green"]}]},{"day":19,"configs":[{"occasions":"World Sickle Cell Awareness Day","colourCaption":"Red and white","colours":
        // ["red","white"]}]},{"day":20,"configs":[{"occasions":"United Nations World Refugee Day","colourCaption":"Blue","colours":["blue"]}]},{"day":21,"configs":[{"occasions":"Indigenous Peoples Day","colourCaption":"Yellow, dark blue, dark red and white","colours":["yellow","blue","red","white"]},{"occasions":"At the bottom of every hour our lights will shine blue for Father’s Day and Prostate Cancer Awareness","colourCaption":"Dark blue/Light blue","colours":["blue"]}]},{"day":22,"configs":[{"occasions":"International Pollinator Week","colourCaption":"Yellow and orange","colours":["yellow","orange"]}]},{"day":23,"configs":[{"occasions":"National Day of Remembrance for Victims of Terrorism","colourCaption":"Red and white","colours":["red","white"]}]},{"day":24,"configs":[{"occasions":"Saint-Jean-Baptiste Day","colourCaption":"Blue and white","colours":["blue","white"]}]},{"day":25,"configs":[{"occasions":"ALS Awareness Month","colourCaption":"Purple","colours":["purple"]}]},{"day":26,"configs":[{"occasions":"CN Tower's Birthday - Today the CN Tower turns 44","colourCaption":"Red and white","colours":["red","white"]}]},{"day":27,"configs":[{"occasions":"Canadian Multiculturalism Day","colourCaption":"Red and white","colours":["red","white"]}]},{"day":28,"configs":[{"occasions":"Toronto Virtual Pride Parade","colourCaption":"Rainbow","colours":[]}]},{"day":29,"configs":[{"occasions":"World Scleroderma Day","colourCaption":"Blue and white","colours":["blue","white"]}]},{"day":30,"configs":[{"occasions":"Arthrogryposis Multiplex Congenita Awareness Day","colourCaption":"Blue","colours":["blue"]}]}]}
        // ,{"month":"July","dates":[{"day":1,"configs":[{"occasions":"JULY National Deafblind Awareness Month","colourCaption":"Yellow","colours":["yellow"]}]}]}
        // ]

        const items = _getValidLines(linesArray);
        if (!items || items.length < NUMBER_OF_COLUMNS) {
            return [];
        }
    
        const months = [];
        let month = _getMonth(items[0]);
        months.push(_getMonthObject(month, items));
        month = _getMonth(items[items.length - NUMBER_OF_COLUMNS]);
        if(months[0].month !== month){
            months.push(_getMonthObject(month, items));
        }      

        return months;
    }

    this.getTowerSchedule = _getTowerSchedule;
    this.getTowerScheduleComplete = _getTowerScheduleComplete;
}

module.exports = Schedule;