
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(process.env.AIRTABLE_BASE);

const Database = () => {

    function get(key, fnc) {
        base(process.env.AIRTABLE_TABLE).select({
            // Selecting the first 3 records in Grid view:
            //maxRecords: 3,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            const record = records.find(r => r.get('key') === key);
            if (record) {
                fnc(record.get('json'));
            } else {
                fnc();
            }

            //setCourses(items.sort((a, b) => a.order < b.order));
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            //fetchNextPage();

        }, function done(err) {
            if (err) {
                console.error(err);
                fnc();
                return;
            }
        });
    }

    function save(key, json){
        base('agenda').create([
            {
              "fields": {
                "key": key,
                "json": json
              }
            },
          ], function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
          });
    }

    return {
        get,
        save,
    }
}

module.exports = Database();