'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//获取静态文件路路径
const folders = require('./utils/getStaticFolderList')

const server = Hapi.server({
    port: 3000,
    host: '192.168.1.143',
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'assets')
        }
    }
});


//设置静态文件路径
const { serveStaticFiles } = require('./utils/handleStaticFile')

const init = async () => {
    try {
        await server.register(require('@hapi/inert'));
        // server.route({
        //     method: 'GET',
        //     path: '/',
        //     handler: (request, h) => {
        //         return h.file('index.html');

        //     }
        // });

        server.route({
            method: 'GET',
            path: '/add',
            handler: (request, h) => {
                return {
                    msg:'ok'
                }

            }
        });

        //静态文件加载
        folders.forEach(fileName=> server.route( serveStaticFiles(fileName) )) 

        server.route({
            method:'POST',
            path:"/user",
            handler:async(res,h)=>{

                console.log(res.payload)
                return


                const {token,origin} = res.payload
                console.log(token,origin)
                return
                const user = prisma.user.create({
                    data:{
                        token,
                        origin
                    }
                })

                return user
            }

        })

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
