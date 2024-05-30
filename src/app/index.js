'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});