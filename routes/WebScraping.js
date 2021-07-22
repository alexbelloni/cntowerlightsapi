const scrapeIt = require("scrape-it")

const WebScraping = () => {
    /**
     * Return a promise that when resolved it response the lines of the agenda or rejected with an error.
     */
    function execute() {
        return new Promise((resolve, reject)=>{
            scrapeIt(process.env.AGENDA_URL, {
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