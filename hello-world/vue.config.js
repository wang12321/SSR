// 服务器渲染插件
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin"); // 生成服务端包
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin"); // 生成客户端包
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");

// 环境变量：决定入口是客户端还是服务端，WEBPACK_TARGET在启动项中设置的，见package.json文件
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";

module.exports = {
    css: { extract: false
    },
    outputDir: "./dist/" + target,
    configureWebpack: () => ({
        // 将 entry 指向应用程序的 server / client 文件
        entry: `./src/entry-${target}.js`,
        // 对 bundle renderer 提供 source map 支持
        devtool: "source-map",
        // 这允许 webpack 以 Node 适用方式处理动态导入(dynamic import)， // 并且还会在编译 Vue 组件时告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
        target: TARGET_NODE ? "node" : "web",
        node: TARGET_NODE ? undefined : false,
        output: {
            // 此处配置服务器端使用node的风格构建
            libraryTarget: TARGET_NODE ? "commonjs2" : undefined
        },
        // 外置化应用程序依赖模块。可以使服务器构建速度更快，并生成较小的 bundle 文件。
        externals: TARGET_NODE ? nodeExternals({
            // 不要外置化 webpack 需要处理的依赖模块。（以前whitelist，改成allowlist）
            allowlist: [/\.css$/]
        }) : undefined,
        optimization: { splitChunks: TARGET_NODE ? false : undefined}, // 这是将服务器的整个输出构建为单个 JSON 文件的插件。 // 服务端默认文件名为 `vue-ssr-server-bundle.json` // 客户端默认文件名为 `vue-ssr-client-manifest.json`
         plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
    }),
    chainWebpack: config => {
        config.module .rule("vue") .use("vue-loader") .tap(options => { merge(options, { optimizeSSR: false }); });
    }
};
