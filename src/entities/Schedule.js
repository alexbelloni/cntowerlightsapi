const Schedule = function () {
    function _getMonth(element) {
        return element.substr(0, element.indexOf(' '));
    }

    function _getColours(coloursString) {
        const str = coloursString.trim().replace(' and ', ' ').replace(new RegExp(',', 'g'), ' ').toLowerCase();
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

    function _getConfig(currentNode) {
        const colourCaption = currentNode[2];
        const colours = _getColours(colourCaption) || [];
        const occasion = currentNode[1];
        return { occasions: occasion, colourCaption: colourCaption, colours: colours };
    }

    /*{"day":1,"configs":[
        {"occasions":"ALS Awareness Month","colourCaption":"Purple","colours":["purple"]},
        {"occasions":"Unplug to Connect - Boys and Girls Clubs of Canada","colourCaption":"Green","colours":["green"]}]}
    */
    function _getTowerSchedule(linesArray) {
        if (!linesArray) {
            return [];
        }

        const length = linesArray.length;
        if (length < 9) {
            return [];
        }

        console.log(linesArray[3]);
        let month = _getMonth(linesArray[3]);
        if (!month) {
            return [];
        }

        const maxIndex = length - 3;
        let lines = linesArray.filter((value, index) => {
            return index > 2 && index < maxIndex;
        }, maxIndex);

        let dates = [];

        let currentNode = [];
        lines.forEach((element, index) => {
            currentNode.push(element);
            const newNode = index === 5 || ((index + 1) % 3) === 0;
            if (newNode) {
                const day = currentNode[0].replace(month, '').trim();
                const config = _getConfig(currentNode);

                const lastDate = dates[dates.length - 1];
                if (lastDate && lastDate.day === parseInt(day)) {
                    lastDate.configs.push(config);
                } else {
                    dates.push({ day: parseInt(day), configs: [config] });
                }

                currentNode = [];
            }
        });

        const ret = { month: month, dates: dates };
        //console.log(JSON.stringify(ret));
        return ret;
    }

    this.getTowerSchedule = _getTowerSchedule;
}

module.exports = Schedule;