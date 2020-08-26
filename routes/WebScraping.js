const scrapeIt = require("scrape-it")

const WebScraping = () => {
    const CNTOWER_AGENDA_URL = "http://www.cntower.ca/en-ca/about-us/night-lighting.html";

    /**
     * Return a promise that when resolved it response the lines of the agenda or rejected with an error.
     */
    function execute() {
        return new Promise((resolve, reject)=>{
            scrapeIt(CNTOWER_AGENDA_URL, {
                lines: {
                    listItem: "td"
                }
            }, (err, { data }) => {
                if (data) {
                    try {
                        resolve(data.lines);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(err);
                }
            })
        });        
    }
    return {
        execute,
    }
}

module.exports = WebScraping();