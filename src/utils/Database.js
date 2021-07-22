
const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyyivMcgnia52h0U' }).base('appvTKHuVkHKALTDT');

const Database = () => {

    function get(monthName, fnc) {
        base('agenda').select({
            // Selecting the first 3 records in Grid view:
            //maxRecords: 3,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            const record = records.find(r => r.get('month') === monthName);
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

    function save(monthName, json){
        base('agenda').create([
            {
              "fields": {
                "month": monthName,
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