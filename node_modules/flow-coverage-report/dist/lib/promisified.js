'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exec = exec;
exports.mkdirp = mkdirp;
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.glob = glob;
exports.withTmpDir = withTmpDir;

var _child_process = require('child_process');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Automatically cleanup temp file on process.exit
_temp2.default.track(); // eslint-disable-line camelcase
function exec(command, options, extra) {
  return new Promise(function (resolve, reject) {
    (0, _child_process.exec)(command, options, function (err, stdout, stderr) {
      if (err) {
        if (extra && extra.dontReject) {
          resolve({ err: err, stdout: stdout, stderr: stderr });
        } else {
          reject(err);
        }
      } else {
        resolve({ stdout: stdout, stderr: stderr });
      }
    });
  });
}

function mkdirp(path) {
  return new Promise(function (resolve, reject) {
    (0, _mkdirp2.default)(path, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function readFile(path) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(path, function (err, buff) {
      if (err) {
        reject(err);
      } else {
        resolve(buff);
      }
    });
  });
}

function writeFile(path, data) {
  return new Promise(function (resolve, reject) {
    _fs2.default.writeFile(path, data, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function glob(pattern, options) {
  return new Promise(function (resolve, reject) {
    (0, _glob2.default)(pattern, options, function (err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

function withTmpDir(tempFileId) {
  return new Promise(function (resolve, reject) {
    _temp2.default.mkdir(tempFileId, function (err, dirPath) {
      if (err) {
        reject(err);
      } else {
        resolve(dirPath);
      }
    });
  });
}
//# sourceMappingURL=promisified.js.map