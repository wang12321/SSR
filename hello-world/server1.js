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

console.log(template)
console.log(renderer)

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
