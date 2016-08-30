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

gulp.task('clean_server', null, shell.task([
  'rm -rf ./server/build && rm -rf ./web/public/static'
]))

gulp.task('build_server', ['clean_server'], shell.task([
  'cd ./server/ && source env.sh && GOOS=linux GOARCH=amd64 CGO_ENABLED=0 make'
]))

gulp.task('upload_server', ['build_server'], shell.task([
  'scp ./server/build/bin/chainstory   root@123.56.101.63:/var/www/chainstory/server'
]))

gulp.task('build_web', ['upload_server'], shell.task([
  'cd ./web/ && npm run-script build'
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
  'scp ./web/production/index.html root@123.56.101.63:/var/www/chainstory/web'
]))

// upload file to OSS
gulp.task('update_assets', [ 'build_web' ], function () {
  // options is optional
  glob('web/public/static/*.*', function (er, files) {
    files.forEach(function (file) {
      let filename = file.split('/')[3]
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
