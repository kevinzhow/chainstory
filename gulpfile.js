'use strict'

const gulp = require('gulp'),
  shell = require('gulp-shell'),
  glob = require('glob'),
  co = require('co'),
  OSS = require('ali-oss')

const client = new OSS({
  endpoint: 'http://oss-cn-beijing.aliyuncs.com',
  accessKeyId: 'wdKl1RvTonoeG5D1',
  accessKeySecret: 'oDX8Guefe1oB9j6dB4qoBi40uzJ1bL',
  bucket: 'zi-edit'
})

gulp.task('production', [ 'clean' ], shell.task([
  './web/npm build'
]))

gulp.task('list-bucket', ()=> {
  co(function* () {
    let result = yield client.listBuckets()
    console.log(result)
  }).catch(function (err) {
    console.log(err)
  })
})

gulp.task('deploy', [ 'update_assets' ], shell.task([
  'scp web/index.html root@123.56.101.63:/var/www/chainstory'
]))

// upload file to OSS
gulp.task('update_assets', [ 'production' ], function () {
  // options is optional
  glob('web/public/static/*.*', function (er, files) {
    files.forEach(function (file) {
      let filename = file.split('/')[2]
      co(function* () {
        // about function* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

        let result = yield client.put(filename, file)
        console.log(`${result.name} ${result.res.status}`)

        // about yield http://www.html-js.com/article/Understanding-the-Yield-principle
      }).catch(function* (err) {
        console.log(err)
        let result = yield client.put(filename, file)
        console.log(`Retry ${result.name} ${result.res.status}`)
      })
    })
  })
})
gulp.task('update_sounds',function () {
  glob('source/sounds/*.mp3',function (er,files) {
    files.forEach(function (file) {
      let filename = file.split('/')[2]
      co(function* () {
        let result = yield client.put(filename,file)
        console.log(result)
      }).catch(function (err) {
        console.log(err)
      })
    })
  })
})
