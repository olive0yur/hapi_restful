
// 封装设置静态文件路由的函数
const serveStaticFiles  = (folderName) => {
    return{
        method: 'GET',
        path: `/${folderName}/{param*}`,
        handler: {
            directory: {
                path: folderName,
                index: false
            }
        }
    };
};

module.exports = {serveStaticFiles}