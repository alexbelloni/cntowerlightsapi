const express = require('express');
const router = express.Router();
const scrapeIt = require("scrape-it")
const Schedule = require('../src/entities/Schedule');

router.get('/', (req, res) => {
    res.send('CNTower Lights API\n');
});

router.get('/schedule', (req, res) => {
    
    res.setHeader('Content-Type', 'application/json');

    // Promise interface
    scrapeIt("http://www.cntower.ca/en-ca/about-us/night-lighting.html", {
        lines: {
            listItem: "td"
        }
    }, (err, { data }) => {
        if (data) {
            try {
                const sch = (new Schedule).getTowerSchedule(data.lines)
                res.statusCode = 200;
                res.send(sch);
            } catch (e) {
                res.statusCode = 500;
                res.send(e);
            }   
        } else {
            res.statusCode = 500;
            res.send(err);
        }
    })
});

module.exports = router;