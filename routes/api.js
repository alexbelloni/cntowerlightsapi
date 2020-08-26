const express = require('express');
const router = express.Router();

const WebScraping = require('./WebScraping');
const Schedule = require('../src/entities/Schedule');

/**
 * Shows API live message
 */
router.get('/', (req, res) => {
    res.send('CNTower Lights API\n');
});

/**
 * Returns the complete json of the current agenda
 */
router.get('/scheduleComplete', (req, res) => {
    webScrapingExecute(res, "getTowerScheduleComplete");
});

/**
 * Returns a array with the colours of the current agenda
 */
router.get('/scheduleColours', (req, res) => {
    webScrapingExecute(res, "getLightColours");
});

/**
 * Scraping the official CN Tower webpage
 * @param {*} res response
 * @param {*} scheduleMethodname method name of the Schedule object
 */
function webScrapingExecute(res, scheduleMethodname) {
    res.setHeader('Content-Type', 'application/json');

    WebScraping.execute(scheduleMethodname).then(lines => {
        const sch = (new Schedule)[scheduleMethodname](lines)
        res.statusCode = 200;
        res.send(sch);
    }).catch(err => {
        res.statusCode = 500;
        res.send(err);
    });
}

module.exports = router;