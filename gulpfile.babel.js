
import gulp from 'gulp';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import nodemon from 'nodemon';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

import configs from './webpack.config';
const [ frontendConfig, backendConfig ] = configs;

const DB_DATA = path.join(__dirname, 'data');

gulp.task('dev', () => {
  new WebpackDevServer(webpack(frontendConfig), {
    contentBase: path.join(__dirname, 'build', 'public'),
    hot: true,
    historyApiFallback: true,
    proxy: {
      '*': 'http://localhost:8080'
    }
  }).listen(3000, 'localhost', (err, result) => {
    if (err)
      return console.log(err);
    console.log('webpack-dev-server listening on localhost:3000');
  });
});

gulp.task('backend-watch', () => {
  webpack(backendConfig).watch(100, (err, stats) => {
    if (err)
      return console.log(err);
    nodemon.restart();
  });
});

gulp.task('init-db', ['start-db'], (done) => {
  exec(`rm -rf ${DB_DATA}`, (err) => {
    if (err)
      return done(err);

    fs.mkdir(DB_DATA, (err) => {
      if (err)
        return done(err);

      exec('node utils/importdb.js', done);
    });
  });
});

// DB will be quit when ctrl+C is given to gulp
gulp.task('start-db', () => {
  exec(`mongod --dbpath ${DB_DATA}`);
});

gulp.task('server', ['start-db', 'backend-watch'], () => {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'build', 'server.js'),
    // do not watch any directory/files to refresh
    // all refreshes should be manual
    watch: ['foo/'],
    ext: 'noop',
    ignore: ['*']
  }).on('restart', () => {
    console.log('nodemon: restart');
  });
});

gulp.task('default', ['dev', 'server']);