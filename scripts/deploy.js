/* eslint-env node no-alert */
"use strict";
const path = require('path');
const fs = require('fs');
const ncp = require('ncp').ncp;
const nrc = require('node-run-cmd');
const shell = require('shelljs');
const bluebird = require('bluebird');
const ncpPromise = bluebird.promisify(ncp);

const SOURCE = path.join(__dirname, '..', 'dist');
const DESTINATION = path.join(__dirname, '..', 'temp');

ncp.limit = 16;

if(require.main == module) {
    console.log("Deployment Started");
    shell.exec("rm -rf dist && rm -rf temp");
    shell.exec("npm run production");
    shell.exec("mkdir temp");
    shell.cp("-Rf", SOURCE + '/*', DESTINATION);
    shell.cp(".htaccess", "./temp/.htaccess");
    shell.cd("temp");
    shell.cp("index.html", "index.php");
    shell.cd("temp");
    shell.exec("git init");
    shell.exec("git add .");
    shell.exec("git commit -m \"Deploying\"");
    shell.exec("heroku git:remote -a text-tools");
    shell.exec("git push -f heroku master");
    console.log("Successfully Deployed");
    process.exit(1);
}
