/**
 * IMPORT MODULES
 */
// Config
import CONFIG from '../config';

// Node.js
import pkg from '../package.json';

// Gulp
import gulp from 'gulp';

let copyText = [
  `/* `,
  ` * ${ pkg.name } ${ pkg.version }`,
  ` * ${ pkg.description }`,
  ` * ${ pkg.license } Licensed`,
  ` * `,
  ` * Copyright (C) 2017 ${ pkg.author }`,
  ` */`,
].join('\n');
