'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

//获取静态文件路路径
const folders = require('./utils/getStaticFolderList')

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'assets')
        }
    }
});

//设置静态文件路径
const { serveStaticFiles } = require('./utils/handleStaticFile')
console.log(serveStaticFiles)

const init = async () => {
    try {
        await server.register(require('@hapi/inert'));
        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return h.file('index.html');

            }
        });

        //静态文件加载
        folders.forEach(fileName=> server.route( serveStaticFiles(fileName) )) 

        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
        
    } catch (error) {
        console.log(error)
    }

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

module.exports = server
