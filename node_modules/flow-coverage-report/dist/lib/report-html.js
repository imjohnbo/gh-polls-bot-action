'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _promisified = require('./promisified');

var _htmlReportPage = require('./components/html-report-page');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line import/no-unresolved

var baseSemanticAssets = ['themes', 'default', 'assets'];
var assetsList = ['jquery-3.1.0.min.js', 'semantic.min.js', 'semantic.min.css', 'semantic-tablesort.js', 'index.js', 'codemirror.js', 'codemirror.css', 'codemirror-javascript-mode.js', 'codemirror-annotatescrollbar-addon.js', 'codemirror-simplescrollbars-addon.js', 'codemirror-simplescrollbars-addon.css', 'flow-highlight-source.js', 'flow-highlight-source.css', 'flow-coverage-report.css'].concat([['images', 'flags.png'], ['fonts', 'icons.eot'], ['fonts', 'icons.otf'], ['fonts', 'icons.svg'], ['fonts', 'icons.ttf'], ['fonts', 'icons.woff'], ['fonts', 'icons.woff2']].map(function (el) {
  return _path2.default.join.apply(null, baseSemanticAssets.concat(el));
}));

function copyAsset(outputDir, assetName) {
  var srcfileReady = (0, _promisified.readFile)(_path2.default.join(__dirname, '..', '..', 'assets', assetName));
  var createDestDir = (0, _promisified.mkdirp)(_path2.default.join(outputDir, 'assets', _path2.default.dirname(assetName)));

  function destFileWritten(data) {
    return (0, _promisified.writeFile)(_path2.default.join(outputDir, 'assets', assetName), data);
  }

  return Promise.all([srcfileReady, createDestDir]).then(function (res) {
    var srcFileData = res[0];

    return destFileWritten(srcFileData);
  });
}

function copyAssets(outputDir /* : string */) {
  return Promise.all(assetsList.map(copyAsset.bind(null, outputDir)));
}

function renderHTMLReport(opt /* : Object */) /* : Promise<*> */{
  if (opt.filename && opt.filename.indexOf('..') >= 0) {
    return Promise.reject(new Error('filename is not relative to the projectDir: ' + [opt.projectDir, opt.filename].join(' - ')));
  }

  function relativeToFilename(prefixDir, dest) {
    return _path2.default.relative(_path2.default.join(prefixDir, _path2.default.dirname(opt.filename || '')), dest);
  }

  function prefixAssets(filePath) {
    return _path2.default.join('assets', filePath);
  }

  function summaryReportContent() {
    return new Promise(function (resolve) {
      var toRelative = relativeToFilename.bind(null, '');

      var reportFilePath = _path2.default.join(opt.outputDir, 'index.html');
      var reportFileContent = '<!DOCTYPE html>\n' + _server2.default.renderToStaticMarkup(_react2.default.createElement(_htmlReportPage.HTMLReportSummaryPage, {
        htmlTemplateOptions: opt.htmlTemplateOptions,
        coverageGeneratedAt: opt.coverageGeneratedAt,
        coverageSummaryData: opt.coverageSummaryData,
        assets: {
          css: ['semantic.min.css', 'flow-coverage-report.css'].map(prefixAssets).map(toRelative),
          js: ['jquery-3.1.0.min.js', 'semantic.min.js', 'semantic-tablesort.js', 'index.js'].map(prefixAssets).map(toRelative)
        }
      }));

      resolve({
        reportFilePath: reportFilePath,
        reportFileContent: reportFileContent
      });
    });
  }

  function sourceReportContent() {
    return new Promise(function (resolve, reject) {
      var srcPath = _path2.default.join(opt.projectDir, opt.filename);
      var dirName = _path2.default.dirname(opt.filename);
      var toRelative = relativeToFilename.bind(null, 'sourcefiles');

      return (0, _promisified.mkdirp)(_path2.default.join(opt.outputDir, 'sourcefiles', dirName)).then(function () {
        return (0, _promisified.readFile)(srcPath).then(function (buff) {
          var reportFileContent = '<!DOCTYPE html>\n' + _server2.default.renderToStaticMarkup(_react2.default.createElement(_htmlReportPage.HTMLReportSourceFilePage, {
            htmlTemplateOptions: opt.htmlTemplateOptions,
            coverageGeneratedAt: opt.coverageGeneratedAt,
            coverageSummaryData: opt.coverageSummaryData,
            coverageData: opt.coverageData,
            fileName: opt.filename,
            fileContent: buff,
            summaryRelLink: toRelative('index.html'),
            threshold: opt.threshold,
            assets: {
              css: ['semantic.min.css', 'codemirror.css', 'flow-highlight-source.css', 'flow-coverage-report.css', 'codemirror-simplescrollbars-addon.css'].map(prefixAssets).map(toRelative),
              js: ['jquery-3.1.0.min.js', 'semantic.min.js', 'semantic-tablesort.js', 'codemirror.js', 'codemirror-javascript-mode.js', 'codemirror-annotatescrollbar-addon.js', 'codemirror-simplescrollbars-addon.js', 'flow-highlight-source.js', 'index.js'].map(prefixAssets).map(toRelative)
            }
          }));

          var reportFilePath = _path2.default.join(opt.outputDir, 'sourcefiles', opt.filename) + '.html';
          resolve({
            reportFilePath: reportFilePath,
            reportFileContent: reportFileContent
          });
        }, reject);
      }, reject);
    });
  }

  var waitForReportContent = void 0;

  switch (opt.type) {
    case 'summary':
      waitForReportContent = summaryReportContent();
      break;
    case 'sourcefile':
      waitForReportContent = sourceReportContent();
      break;
    default:
      return Promise.reject(new Error('Unknown report type: ' + opt.type));
  }

  return waitForReportContent.then(function (res) {
    var reportFilePath = res.reportFilePath;
    var reportFileContent = res.reportFileContent;

    return (0, _promisified.mkdirp)(_path2.default.dirname(reportFilePath)).then(function () {
      return (0, _promisified.writeFile)(reportFilePath, Buffer.from(reportFileContent));
    });
  });
}

function generateFlowCoverageReportHTML(coverageSummaryData, opts) {
  var projectDir = opts.projectDir;
  var outputDir = opts.outputDir;

  if (!outputDir) {
    throw new Error('Unexpected empty outputDir option');
  }

  var coverageGeneratedAt = coverageSummaryData.generatedAt;
  var generateSummary = renderHTMLReport({
    type: 'summary',
    filename: null,
    htmlTemplateOptions: opts.htmlTemplateOptions,
    coverageSummaryData: coverageSummaryData,
    coverageGeneratedAt: coverageGeneratedAt,
    projectDir: projectDir,
    outputDir: outputDir
  });

  var waitForCopyAssets = copyAssets(outputDir);
  var generateSourceFiles = Object.keys(coverageSummaryData.files).map(function (filename) {
    var coverageData = coverageSummaryData.files[filename];
    return renderHTMLReport({
      type: 'sourcefile',
      coverageGeneratedAt: coverageGeneratedAt,
      htmlTemplateOptions: opts.htmlTemplateOptions,
      coverageSummaryData: coverageSummaryData,
      projectDir: projectDir,
      filename: filename,
      coverageData: coverageData,
      outputDir: outputDir
    });
  });
  return Promise.all([waitForCopyAssets, generateSummary].concat(generateSourceFiles));
}

exports.default = {
  assetsList: assetsList,
  copyAssets: copyAssets,
  render: renderHTMLReport,
  generate: generateFlowCoverageReportHTML
};
//# sourceMappingURL=report-html.js.map