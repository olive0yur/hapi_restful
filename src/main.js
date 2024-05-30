'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});


const init = async () => {
    await server.register(require('@hapi/inert'));


    // 提供 css 目录中的静态文件
    server.route({
        method: 'GET',
        path: '/css/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'css')
            }
        }
    });



    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.file('./src/index.html');
        }
    });
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

module.exports = server
