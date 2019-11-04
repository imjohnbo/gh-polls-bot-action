'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTMLReportSummaryPage = HTMLReportSummaryPage;
exports.HTMLReportSourceFilePage = HTMLReportSourceFilePage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _head = require('./head');

var _head2 = _interopRequireDefault(_head);

var _bodyCoverageSummary = require('./body-coverage-summary');

var _bodyCoverageSummary2 = _interopRequireDefault(_bodyCoverageSummary);

var _bodyCoverageSourcefile = require('./body-coverage-sourcefile');

var _bodyCoverageSourcefile2 = _interopRequireDefault(_bodyCoverageSourcefile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable */

function HTMLReportSummaryPage(props) {
  return _react2.default.createElement(
    'html',
    null,
    _react2.default.createElement(_head2.default, props),
    _react2.default.createElement(_bodyCoverageSummary2.default, {
      assets: props.assets,
      coverageGeneratedAt: props.coverageGeneratedAt,
      htmlTemplateOptions: props.htmlTemplateOptions,
      coverageSummaryData: props.coverageSummaryData
    })
  );
}

/* eslint-disable import/no-unresolved */
function HTMLReportSourceFilePage(props) {
  return _react2.default.createElement(
    'html',
    null,
    _react2.default.createElement(_head2.default, props),
    _react2.default.createElement(_bodyCoverageSourcefile2.default, {
      assets: props.assets,
      coverageGeneratedAt: props.coverageGeneratedAt,
      htmlTemplateOptions: props.htmlTemplateOptions,
      coverageSummaryData: props.coverageSummaryData,
      coverageData: props.coverageData,
      fileName: props.fileName,
      fileContent: props.fileContent,
      summaryRelLink: props.summaryRelLink
    })
  );
}
//# sourceMappingURL=html-report-page.js.map