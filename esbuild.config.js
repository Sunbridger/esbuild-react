/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const esbuild = require('esbuild');
const serve = require('koa-static');
const Koa = require('koa');
const path = require('path');
const fse = require('fs-extra');

const app = new Koa();

// 启动编译好后自动刷新浏览器
const livereload = require('livereload');

const lrserver = livereload.createServer();
lrserver.watch(path.resolve(__dirname, 'dist'));

// 使用静态服务
app.use(serve((path.resolve(__dirname, 'dist'))));

esbuild.build({
  // 入口
  entryPoints: ['src/app.jsx'],
  // 启动sourcemap
  sourcemap: true,
  // 打包
  bundle: true,
  // 输出的目录
  outfile: 'dist/index.js',
  // 启动轮询的监听模式
  watch: {
    onRebuild(error) {
      if (error) {
        console.error('watch build failed:', error);
      } else {
        // 这里来自动打开浏览器并且更新浏览器
        console.log('\x1B[36m%s\x1B[39m', 'watch build succeeded');
      }
    },
  },
}).then(async () => {
  const fileName = path.resolve(__dirname, './dist/index.html');
  // 创建文件，如果文件不存在直接创建，存在不做任何事情
  await fse.ensureFile(fileName);
  // 把下面内容写入dist中的index.html文件中
  const templateHTML = await fse.readFileSync(path.resolve(__dirname, './index.html'));
  await fse.writeFileSync(fileName, templateHTML);
  // 启动一个koa静态资源服务
  app.listen(3000, () => {
    console.log('> Local:    http://localhost:3000/');
  });
});
