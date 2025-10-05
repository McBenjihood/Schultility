const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    filenameHashing: false,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].inject = 'body';
                args[0].scripts = args[0].scripts || [];
                args[0].scripts.push({
                    tagName: 'script',
                    attributes: {
                        src: 'js/injector.js'
                    }
                });
                return args;
            });
    }
})