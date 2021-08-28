const express = require('express');
const router = express.Router();

const WebScraping = require('./WebScraping');
const Schedule = require('../src/entities/Schedule');
const Database = require('../src/utils/Database');

/**
 * Shows API live message
 */
router.get('/', (req, res) => {
    res.send('Hello, I am the CNTower Lights API by Alex\n');
});

/**
 * @swagger
 * definitions:
*   Config:
 *     properties:
 *       occasions:
 *         type: string
 *       colourCaption:
 *         type: string 
 *       colours: 
 *         type: "array"
 *         items:
 *           type: "string"
 *   Date:
 *     properties:
 *       day:
 *         type: integer
 *       configs:
 *         type: "array"
 *         items:
 *           $ref: '#/definitions/Config'
 *   Month:
 *     properties:
 *       month:
 *         type: string
 *       dates:
 *         type: "array"
 *         items:
 *           $ref: '#/definitions/Date'
 *   Agenda:
 *      type: "array"
 *      items:
 *        $ref: '#/definitions/Month'
 *   Colours:
 *      type: "array"
 *      items:
 *        type: "string"
 */

/**
 * @swagger
 * /scheduleComplete:
 *  get:
 *    summary: returns months and dates
 *    description: Returns the months and date details of the current agenda
 *    produces:
 *       - application/json 
 *    tags: 
 *      - Agenda 
 *    responses:
 *      '200':
 *        description: As a successful response of Agenda
 *        schema:
 *           $ref: '#/definitions/Agenda'
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
 *    tags: 
 *      - Colours
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

    if (scheduleMethodname === "getLightColours") {
        WebScraping.execute(scheduleMethodname).then(lines => {
            const sch = (new Schedule)[scheduleMethodname](lines);
            res.statusCode = 200;
            res.send(sch);
        }).catch(err => {
            res.statusCode = 500;
            res.send(err);
        });
    } else {
        //key from today
        const key = Database.getKeyFromDate();

        Database.get(key, json => {
            if (json) {
                //console.log(`${key} found`);
                res.statusCode = 200;
                res.send(json);
            } else {
                //console.log(`${key} not found`);
                WebScraping.execute(scheduleMethodname).then(lines => {
                    (new Schedule)[scheduleMethodname](lines).then(sch => {
                        Database.save(key, JSON.stringify(sch))
                        res.statusCode = 200;
                        res.send(sch);
                    })

                }).catch(err => {
                    res.statusCode = 500;
                    res.send(err);
                });
            }
        })
    }


}

module.exports = router;