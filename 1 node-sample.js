/**
 *
 * This is a sample javascript nodejs snipet, which retrieves users from a dabatase
 *
 * Questions for you to answer:
 * - Is there a security problem with this code, if yes, what would be the correct solution?
 * - What other improvments would you do to the code, when used in production?
 *
*/
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mysql");

    // config for your database
    var config = {
        user: 'db-login',
        password: 'db-password',
        server: 'localhost', 
        database: 'ngft-crew' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from users where firstname='+req.query.firstname, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});


/**
security concerns:
 1) the db connections details are in clear in the code.
    Even if the code is server side and the client can't see it
    it will still be pushed to version control where it can leak.
    SOLUTION:   Add a .env file where we set those details as env variables and add it to .gitignore,
                Create a .env.default with the variables names and empty values for sensitive data to the git archive.

 2) the user input is not being sanitized. It could allow injections.
    SOLUTION: add a middleware to sanitize the req.query payload (escape etc)
 */
