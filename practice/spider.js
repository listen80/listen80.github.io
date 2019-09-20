'use strict';

// 引入模块
const http = require('http');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const url = require("url");

const all_spider_path = new Set();

const father = {
  hostname: 'localhost',
  path: '/',
  port: 80
};

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname) || dirname === '.') {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true;
    }
  }
}

function writeFile(host, dir_path, file_path, data, root = 'web') {
  mkdirsSync(path.join(root, host, dir_path));
  fs.writeFileSync(path.join(root, host, file_path), data, { encoding: 'binary' });
}


function get(father, json = {}) {
  if (!father.hostname || !father.path) {
    console.log(father)
    throw father
  }

  if (!all_spider_path.has(father.hostname + father.path)) {
    all_spider_path.add(father.hostname + father.path);
  } else {
    console.log(father)
    console.log('重复' + father.hostname + father.path)
    return
  }
  json.url = father.hostname + father.path
  json.children = [];
  http.get(father, function (res) {
    let html = '';
    // res.setEncoding('utf-8');
    res.setEncoding('binary');
    // 抓取页面内容
    res.on('data', function (chunk) {
      html += chunk;
    });

    res.on('end', function () {
      const $ = cheerio.load(html);
      let dir_path = father.path;
      let file_path = dir_path;
      if (father.path.match(/\.\w+$/)) {
        dir_path = path.dirname(dir_path);
      } else if (res.headers['content-type'].includes('text/html')) {
        if (father.path.endsWith('/')) {
          file_path = path.join(file_path, 'index.html');
        } else {
          file_path = path.join(file_path, '.html');
        }
      } else {
        throw 'eeeee'
      }

      writeFile(father.hostname, dir_path, file_path, html);

      if (!res.headers['content-type'].includes('text/html')) {
        return
      }
      $('a[href], link[href], script[src]').each(function (index, el) {
        if (index) {
          // return
        }
        let href = $(el).attr('href') || $(el).attr('src')
        let obj = { target: href };
        json.children.push(obj);
        fs.writeFileSync('web.txt', JSON.stringify(json, null, '  '))
        if (href.startsWith('//')) {
          href = `http:${href}`;
          const parsed_url = url.parse(href, true);
          const child = {
            hostname: parsed_url.hostname,
            path: parsed_url.path
          }
          // console.log(path.join(father.path, href).replace(/\\/g, '/'))
          get(child, obj);
        } else if (href.startsWith('/')) {
          const child = {
            hostname: father.hostname,
            path: href
          }
          // console.log(path.join(father.path, href).replace(/\\/g, '/'))
          get(child, obj);
        } else if (href.startsWith('./')) {
          const child = {
            hostname: father.hostname,
            path: path.join(dir_path, href).replace(/\\/g, '/')
          }
          // console.log(path.join(father.path, href).replace(/\\/g, '/'))
          get(child, obj);
        } else if (href.match(/^\w/) && !href.match(/:/)) {
          // throw href
          const child = {
            hostname: father.hostname,
            path: path.join(dir_path, href).replace(/\\/g, '/')
          }
          get(child, obj);
        }
      })
    });
  }).on('error', function (err) {
    console.log(err);
  });
}

get(father);

/**
 * 下载图片
 *
 * @param {string} imgDir 存放图片的文件夹
 * @param {string} url 图片的 URL 地址
 */

function downloadImg(imgDir, url) {
  https.get(url, function (res) {
    var data = '';

    res.setEncoding('binary');

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      // 调用 fs.writeFile 方法保存图片到本地
      fs.writeFile(imgDir + path.basename(url), data, 'binary', function (err) {
        if (err) {
          return console.log(err);
        }
        console.log('Image downloaded:', path.basename(url));
      });
    });
  }).on('error', function (err) {
    console.log(err);
  });
}