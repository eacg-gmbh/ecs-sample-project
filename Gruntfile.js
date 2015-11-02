/*
 * Copyright (c) 2015. Enterprise Architecture Group, EACG
 *
 * SPDX-License-Identifier:	MIT
 */

'use strict';
var credentials = require((process.env.USERPROFILE || process.env.HOME) + '/.ecsrc.json');

module.exports = function (grunt) {

    grunt.initConfig({

        'ecs-scan': {
            options: {
                npm: {
                    project: 'SampleNPM'
                },
                bower:{
                    project: 'SampleBower'
                },
                user: credentials.userName,
                apiKey: credentials.apiKey,
                simulate: false,
                baseUrl: 'http://localhost:3000',
                clientOptions: {
                    user: credentials.basicAuth.user,
                    password: credentials.basicAuth.password
                },
                verbose: false
            }
        },

        exec: {
            maven: 'mvn ecs-mvn:dependency-scan'
        }
    });

    grunt.loadNpmTasks("ecs-grunt-plugin");
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('scan', ['ecs-scan']);
    grunt.registerTask('default', ['scan', 'exec']);
};