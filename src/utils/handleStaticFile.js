const server = require('../index')

// 封装设置静态文件路由的函数
const addStaticRoute = (routePath, directoryPath) => {
    server.route({
        method: 'GET',
        path: `${routePath}/{param*}`,
        handler: {
            directory: {
                path: Path.join(__dirname, directoryPath),
                index: ['index.html']
            }
        }
    });
};

module.exports = addStaticRoute