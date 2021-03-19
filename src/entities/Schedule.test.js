//jest ./src/entities/Schedule

const Schedule = require('./Schedule');
const schedule = new Schedule;

test('Empty schedule', () => {
    const sch = schedule.getTowerScheduleComplete();
    expect(sch.length).toBe(0);
});

test('Schedule without dates', () => {
    const json =
    {
        lines:
            [
                'Date',
                'Occasion* (Subject to Change)',
                'Colour',
                'CN Tower',
                'Canada Lands Company Société Immobilière du Canada',
                'Canada']
    };
    const sch = schedule.getTowerScheduleComplete(json.lines);
    expect(sch.length).toBe(0);
});

const completeJson =
{
    lines:
        ['Date',
            'Occasion* (Subject to Change)',
            'Colour',
            'May 29', 'National Scleroderma Awareness Month', 'White and royal blue',
            'May 30', 'Arthrogryposis Multiplex Congenital Awareness', 'Blue',
            'June 1',
            'ALS Awareness Month',
            'Purple',
            'June 1',
            'Unplug to Connect - Boys and Girls Clubs of Canada',
            'Green',
            'June 2',
            'World Eating Disorders Action Day',
            'Purple',
            'June 2',
            'Let’s Go Marlies! Our regularly scheduled top of the hour light show celebrates the Toronto Marlies in the 2018 Calder Cup Playoffs!',
            'Blue',
            'June 3',
            'Canadian Forces Day',
            'Red and white',
            'June 5',
            'World Environment Day / Canadian Environment Week',
            'Green',
            'June 9',
            'Ride to Conquer Cancer',
            'Blue and yellow',
            'June 12',
            'Let’s Go Marlies! Our lighting celebrates the Toronto Marlies in the 2018 Calder Cup Final!',
            'Blue',
            'June 13',
            'Brain Injury Awareness Month',
            'Blue and green',
            'June 14',
            'Hepatitis C Awareness',
            'Red and yellow',
            'June 15',
            'Tourette Awareness Month',
            'Teal',
            'June 15',
            'National Deafblind Awareness Month',
            'Blue',
            'June 16',
            'National Blood Donor Week',
            'Red and white',
            'June 17',
            'International CDKL5 Awareness Day',
            'Lime green',
            'June 17',
            'Father\'s Day and Prostate Cancer Awareness',
            'Dark blue and light blue',
            'June 18',
            'Pollinator Awareness Month',
            'Yellow and black',
            'June 19',
            'World Sickle Cell Awareness Day',
            'Red and white',
            'June 20',
            'United Nations World Refugee Day',
            'Blue',
            'June 21',
            'National Indigenous Peoples Day',
            'Yellow, dark blue, dark red and white',
            'June 23',
            'National Day of Remembrance for Victims of Terrorism',
            'Red and white',
            'June 23',
            'Global HHT Awareness Day',
            'Red and blue',
            'June 24',
            'Saint-Jean-Baptiste Day',
            'Red and white',
            'June 26',
            'CN Tower\'s Birthday. Today the CN Tower turns 42.',
            'Red and white',
            'June 27',
            'Canadian Milticulturalism Day',
            'Red and white',
            'June 29',
            'National Scleroderma Awareness Month',
            'White and royal blue',
            'June 30',
            'Arthrogryposis Multiplex Congenital Awareness',
            'Blue',
            'CN Tower',
            'Canada Lands Company Société Immobilière du Canada',
            'Canada']
};

test('Schedule has 21 days', () => {
    const monthSchedules = schedule.getTowerScheduleComplete(completeJson.lines);
    expect(monthSchedules[0].dates.length).toEqual(2);
    expect(monthSchedules[1].dates.length).toEqual(21);
});

test('One day with two configs', () => {
    const json =
    {
        lines:
            [
                'Date',
                'Occasion* (Subject to Change)',
                'Colour',
                'June 1',
                'ALS Awareness Month',
                'Purple',
                'June 1',
                'Unplug to Connect - Boys and Girls Clubs of Canada',
                'Green',
                'June 2',
                'World Eating Disorders Action Day',
                'Purple',
                'CN Tower',
                'Canada Lands Company Société Immobilière du Canada',
                'Canada']
    };
    const sch = schedule.getTowerScheduleComplete(json.lines);
    expect(sch[0].dates[0].configs.length).toEqual(2);
});

test('Schedule without a valid date should be undefined', () => {
    const json =
    {
        lines:
            [
                'Date',
                'Occasion* (Subject to Change)',
                'Colour',
                'June',
                'ALS Awareness Month',
                'Purple',
                '',
                'ALS Awareness Month',
                'Purple',
                'CN Tower',
                'Canada Lands Company Société Immobilière du Canada',
                'Canada']
    };
    const sch = schedule.getTowerScheduleComplete(json.lines);
    expect(sch[0]).toBeUndefined()
});

test('Multiple colours', () => {
    const json =
    {
        lines:
            [
                'Date',
                'Occasion* (Subject to Change)',
                'Colour',
                'June 3',
                'ALS Awareness Month',
                'Purple Yellow and Green',
                'June 8',
                'ALS Awareness Month',
                '',
                'CN Tower',
                'Canada Lands Company Société Immobilière du Canada',
                'Canada']
    };
    const sch = schedule.getTowerScheduleComplete(json.lines);
    expect(sch[0].dates[0].configs[0].colours.length).toEqual(3);
    expect(sch[0].dates[1].configs[0].colours.length).toEqual(0);
});

test('Long colour description', () => {
    const json =
    {
        lines:
            [
                'Date',
                'Occasion* (Subject to Change)',
                'Colour',
                'June 3',
                'ALS Awareness Month',
                'Lighting on this night will feature a Canada flag image and red & white red green purple blue teal yellow gold white orange royal pink black magenta',
                'CN Tower',
                'Canada Lands Company Société Immobilière du Canada',
                'Canada']
    };
    const sch = schedule.getTowerScheduleComplete(json.lines);
    expect(sch[0].dates[0].configs[0].colours.length).toEqual(11);
});

test('colours is an object', () => {
    const json =
    {
        lines:
            [
                'Date',
                'Occasion* (Subject to Change)',
                'Colour',
                'June 3',
                'ALS Awareness Month',
                { ___raw: '' },
                'CN Tower',
                'Canada Lands Company Société Immobilière du Canada',
                'Canada']
    };
    const sch = schedule.getTowerScheduleComplete(json.lines);
    expect(sch[0].dates[0].configs[0].colours.length).toEqual(0);
});

test('colours is an object and extract colors from the occasion descrption', () => {
    const json =
    {
        lines:
            [
                'Date',
                'Occasion* (Subject to Change)',
                'Colour',
                'June 3',
                "The CN Tower will be joining in tonight’s national vigil, lighting blue and white in memory of those who lost their lives in the shooting in Nova Scotia.  On the quarter-hour and half-hour, the CN Tower will be lit red, blue and gold to honour Royal Canadian Mounted Police (RCMP) Cst. Heidi Stevenson who was killed in the line of duty.",
                { ___raw: '' },
                'CN Tower',
                'Canada Lands Company Société Immobilière du Canada',
                'Canada']
    };
    const sch = schedule.getTowerScheduleComplete(json.lines);
    expect(sch[0].dates[0].configs[0].colours.length > 2).toEqual(true);
});

test('getTowerScheduleComplete returns array with months and dates', () => {
    const json =
    {
        lines:
            [
                'Date',
                'Occasion* (Subject to Change)',
                'Colour',
                'June 29',
                'ALS Awareness Month',
                'red',
                'June 30',
                'ALS 30 Awareness Month',
                'blue',
                'July 1',
                'ALS 1 Awareness Month',
                'green',
                'July 1',
                'ALS 2 Awareness Month',
                'purple',
                'CN Tower',
                'Canada Lands Company Société Immobilière du Canada',
                'Canada']
    };
    let sch = schedule.getTowerScheduleComplete(json.lines);
    expect(sch[0].dates.length === 2).toEqual(true);
    expect(sch[1].dates.length === 1).toEqual(true);
    
});

test('getLightColours returns array with months and dates', () => {
    const json =
    {
        lines:
            [
                'Date',
                'Occasion* (Subject to Change)',
                'Colour',
                'June 29',
                'ALS Awareness Month',
                'red',
                'June 30',
                'ALS 30 Awareness Month',
                'Blue',
                'July 1',
                'ALS 1 Awareness Month',
                'green and white',
                'July 1',
                'ALS 2 Awareness Month',
                'blue',
                'CN Tower',
                'Canada Lands Company Société Immobilière du Canada',
                'Canada']
    };
    let colours = schedule.getLightColours(json.lines);console.log(colours)
    expect(colours.length).toBe(4);
    
});
