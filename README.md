# Node-DB

## Description:
Database storage service for PostgreSQL on NodeJS, using promises. Use this to ensure that you aren't littering pg.connect calls all over your other code. This way, if you ever want to swap out to another database, you can switch out this module with minimal-to-no changes in the rest of your app.

Can also be used with ExpressJS.

## Dependencies:
* NodeJS 0.10.x
* PG 2.11.x
* Q 1.0.x

## Notes:
* You must set up a configuration variable in a file in your root directory. This variable should be a POJO with a property named "dbLoc", which should contain the full connection/auth string for your Postgres DB instance.
* Auto-releases connections back to pool for maximum efficiency.
* Supports query parametrization to help prevent SQL injection attacks.
* Errors are output to the console and then returned when a promise is rejected. You should handle these in your app.

## Sample Usage:
```
var db = require("./node-db");

db.query("SELECT * FROM sample_table WHERE value1 = $1 LIMIT 1", [testValue]).then(
    function (results) {
        // Do something with results.
    }, function (err) {
        // Do something with error.
    })
.done();
```