const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    filenameHashing: false,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].inject = 'body';
                args[0].scriptLoading = 'blocking';
                args[0].scripts = [
                    ...(args[0].scripts || []),
                    {
                        src: 'path/to/your/injector-script.js',
                    }
                ];
                return args;
            });
    }
})