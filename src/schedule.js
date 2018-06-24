function getMonth(element) {
    return element.substr(0, element.indexOf(' '));
}

function getSchedule(linesArray) {
    if (!linesArray) {
        return [];
    }

    const length = linesArray.length;
    if (length < 9) {
        return [];
    }

    let month = getMonth(linesArray[3]);
    if(!month){
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
            dates.push({ day: parseInt(day), occasion: currentNode[1], colour: currentNode[2] });

            currentNode = [];
        }
    });

    return {month: month, dates: dates};
}

module.exports = getSchedule;