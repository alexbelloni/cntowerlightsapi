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
 * @swagger
 * /scheduleComplete:
 *  get:
 *    summary: returns months and dates
 *    description: Returns the months and date details of the current agenda
 *    tags: [Months]
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 data:
 *                   type: array
 *      '500':
 *        description: A failed response 
 */
router.get('/scheduleComplete', (req, res) => {
    webScrapingExecute(res, "getTowerScheduleComplete");
});

/**
 * @swagger
 * /scheduleColours:
 *  get:       
 *    summary: returns colours
 *    description: Returns a array with the colours of the current agenda
 *    tags: [Colours]
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *           application/json:
 *             schema:
 *              type: "string"
 *      '500':
 *        description: A failed response
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