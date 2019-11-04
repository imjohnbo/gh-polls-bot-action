'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FlowCoverageSummaryTable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line import/no-unresolved

function FlowCoverageSummaryTable(props) {
  if (!props.coverageSummaryData) {
    throw new Error('Missing coverageSummaryData in props');
  }
  var summary = props.coverageSummaryData;
  var percent = summary.percent;
  var className = percent >= summary.threshold ? 'positive' : 'negative';

  return _react2.default.createElement(
    'table',
    { className: 'ui small celled table' },
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          { key: 'percent' },
          'Percent'
        ),
        _react2.default.createElement(
          'th',
          { key: 'total' },
          'Total'
        ),
        _react2.default.createElement(
          'th',
          { key: 'covered' },
          'Covered'
        ),
        _react2.default.createElement(
          'th',
          { key: 'uncovered' },
          'Uncovered'
        )
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      _react2.default.createElement(
        'tr',
        { className: className },
        _react2.default.createElement(
          'td',
          { key: 'percent' },
          percent,
          ' %'
        ),
        _react2.default.createElement(
          'td',
          { key: 'total' },
          summary.covered_count + summary.uncovered_count
        ),
        _react2.default.createElement(
          'td',
          { key: 'covered' },
          summary.covered_count
        ),
        _react2.default.createElement(
          'td',
          { key: 'uncovered' },
          summary.uncovered_count
        )
      )
    )
  );
}
//# sourceMappingURL=coverage-summary-table.js.map