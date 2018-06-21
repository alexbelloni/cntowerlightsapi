const getSchedule = require('./schedule');

console.log('Test getchedule()');
console.log('line is null: ', getSchedule());
console.log('line is empty: ', getSchedule([]));
console.log('line has length 3: ', getSchedule(['Date', 'Occasion* (Subject to Change)', 'Colour']));
console.log('line has length 6: ', getSchedule(['Date', 'Occasion* (Subject to Change)', 'Colour', 'June 1', 'ALS Awareness Month', 'Purple',]));
console.log('line has length 9: ', getSchedule(['Date', 'Occasion* (Subject to Change)', 'Colour', 'June 1', 'ALS Awareness Month', 'Purple',
    'CN Tower', 'Canada Lands Company Société Immobilière du Canada', 'Canada',]));
console.log('line has not a month: ', getSchedule(['Date', 'Occasion* (Subject to Change)', 'Colour', '', 'ALS Awareness Month', 'Purple',
    'CN Tower', 'Canada Lands Company Société Immobilière du Canada', 'Canada',]));
console.log('line is ok: ', getSchedule(['Date', 'Occasion* (Subject to Change)', 'Colour', 'June 1', 'ALS Awareness Month', 'Purple',
    'June 12',
    'Let’s Go Marlies! Our lighting celebrates the Toronto Marlies in the 2018 Calder Cup Final!',
    'Blue','CN Tower', 'Canada Lands Company Société Immobilière du Canada', 'Canada',])); 