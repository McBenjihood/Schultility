const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    filenameHashing: false,
    publicPath: '',
    configureWebpack: {
        devtool: 'cheap-module-source-map',
    }
})