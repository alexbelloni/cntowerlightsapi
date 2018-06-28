const express = require('express');
const router = express.Router();
const scrapeIt = require("scrape-it")
const Schedule = require('../src/entities/Schedule');

router.get('/', (req, res) => {
    res.send('Tower Lights API\n');
});

router.get('/schedule', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    // Promise interface
    scrapeIt("http://www.cntower.ca/en-ca/about-us/night-lighting.html", {
        lines: {
            listItem: "td"
        }
    }, (err, { data }) => {
        if (data) {
            const schedule = new Schedule;
            try {
                const sch = schedule.getTowerSchedule(data.lines)
                res.send(sch);
            } catch (e) {
                res.send(e);
            }
        } else {
            res.send({});
        }
    })
});

module.exports = router;