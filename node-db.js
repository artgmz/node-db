// Database store service.
"use strict";

// Third-party modules.
var pg = require("pg"), // Postgres database library.
    q = require("q");   // Promises library.

var config = require("../config.js"); // App-specific module for env config.

module.exports = {
    // Run a query against the database, returning results or error.
    // TEXT: Parametrized query string.
    // VALS: [] containing values to put into query, in order.
    query: function (text, vals) {
        var deferred = q.defer();

        pg.connect(config.dbLoc, function (err, client, done) {
            if (err) {
                console.log("Error connecting to database store: " + err);
                deferred.reject(err);
            } else {
                client.query(text, vals, function (err, results) {
                    done(); // Release client back to connection pool.

                    if (err) {
                        console.log("Error retriving data from database store: " + err);
                        deferred.reject(err);
                    } else {
                        deferred.resolve(results);
                    }
                });
            }
        });

        return deferred.promise;
    }
};