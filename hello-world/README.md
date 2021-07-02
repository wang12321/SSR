## 1、SSR（服务端渲染）是什么?

# 传统的vue项目浏览器渲染模式

![浏览器渲染模式](https://upload-images.jianshu.io/upload_images/26056473-0ec4e42337bf69b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

缺点：1、SEO问题
2、首屏速度问题
3、消耗性能的问题

# ssr服务器渲染模式

![SSR](https://upload-images.jianshu.io/upload_images/26056473-81c4d9e22949498c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

优点：
1、更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面
2、首屏渲染速度快

SSR 简单来说就是将页面在服务端渲染完成后在客户端直接展示。

## 2、SSR原理
# 简单示例
index.template.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
    {{{ metas }}}
</head>
<body>
<!--vue-ssr-outlet-->
</body>
</html>

```
server.js
```
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Vue = require('vue');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const server = require('express')();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const template = require('fs').readFileSync('./index.template.html', 'utf-8');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const renderer = require('vue-server-renderer').createRenderer({
    template,
});
const context = {
    title: 'vue ssr',
    metas: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
};

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`,
    });

    renderer
        .renderToString(app, context, (err, html) => {
            console.log(html);
            console.log(err)
            if (err) {
                res.status(500).end('Internal Server Error')
                return;
            }
            res.end(html);
        });
})
server.listen(8081);

```

# 构建步骤
这张图是vue官网提供的介绍图片
![SSR构建图](https://upload-images.jianshu.io/upload_images/26056473-5d6aa9ce108b2e59.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

需要通过Webpack打包生成两份bundle文件：
Client Bundle，给浏览器用。和纯Vue前端项目Bundle类似
Server Bundle，供服务端SSR使用，一个json文件

不管项目先前是什么样子，是否是使用vue-cli生成的。都会有这个构建改造过程。在构建改造这里会用到 vue-server-renderer 库，这里要注意的是 vue-server-renderer 版本要与Vue版本一样。

打包之后目录结构
![SSR打包目录](https://upload-images.jianshu.io/upload_images/26056473-d811a9d22f7adc02.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





## 3、vue项目改造SSR
# 1、安装依赖包
```
npm install vue-server-renderer lodash.merge  webpack-node-externals cross-env
```

# 2、修改router

```
// 原来的写法
// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })
//
// export default router

// 修改后的写法
export default function createRouter() {
  return new VueRouter({
    mode: "history",  // 一定要history 
    base: process.env.BASE_URL,
    routes,
  });
}
```

# 3、修改main.ts
```
// 原来的写法
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

// 修改后的写法
export function createApp() {
  // 创建 router 
  const router = createRouter();
  const app = new Vue({
    router,
    render: (h) => h(App),
  });
  return { app, router };
}
```

# 4、创建entry-client.js
```
import { createApp }  from './main'

const { app } = createApp()

app.$mount('#app')

```

# 5、创建entry-server.js
```
import {createApp} from "./main.ts";
// context实际上就是server/index.js里面传参，后面会说到server/index.js
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default context => {
    return new Promise((resolve, reject) => {
        const {app, router} = createApp();
        router.push(context.url) ;
        router.onReady(()=>{
            // 是否匹配到我们要用的组件
            const matchs = router.getMatchedComponents();
            if(!matchs) {
                return reject({code: 404})
            }
            resolve(app);
        }, reject);
    })
}
```
# 6、修改webpack打包文件
vue.config.js
```
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

```

# 7、创建SSR html 模板
index.template.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}测试ssr</title>
</head>
<body>
<!--vue-ssr-outlet-->
</body>
</html>

```

# 8、nodejs服务器
```

// nodejs服务器
const express = require("express");
const fs = require("fs");
// 创建express实例和vue实例
const app = express();

// 创建渲染器 获得一个createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");
const serverBundle = require("../dist/server/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/client/vue-ssr-client-manifest.json");
const template = fs.readFileSync("../src/index.template.html", "utf-8"); // ssr模板文件
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest,
});

// 中间件处理静态文件请求
app.use(express.static("../dist/client", { index: false })); // 为false是不让它渲染成dist/client/index.html
// app.use(express.static('../dist/client'))  //如果换成这行代码，那么需要把dist/client/index.html 删除 ，不然会优先渲染该目录下的index.html文件

// 前端请求返回数据
app.get("*", async (req, res) => {
    try {
        const context = { url: req.url, title: "ssr",};
    // nodejs流数据，文件太大，用renderToString会卡
        const stream = renderer.renderToStream(context);
        let buffer = [];
        stream.on("data", (chunk) => {
            buffer.push(chunk);
        });
        stream.on("end", () => {
            res.end(Buffer.concat(buffer));
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("服务器内部错误");
    }
});

/*服务启动*/
const port = 8091;
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});

```


# 9、修改 package.json
```
"build:client": "vue-cli-service build",
"build:server": "cross-env WEBPACK_TARGET=node vue-cli-service build --mode server",
 "build": "npm run build:server && npm run build:client",
 "service": "cd server && node index.js"
```

# 10、启动服务
打包成客户端和服务器端
```
npm run build
```

启动node服务
```
npm run service
```
