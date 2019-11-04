'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FlowCoverageFileTableHead;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FlowCoverageFileTableHead() {
  return _react2.default.createElement(
    'thead',
    null,
    _react2.default.createElement(
      'tr',
      null,
      _react2.default.createElement(
        'th',
        { key: 'filename', className: 'sorted ascending' },
        'Filename'
      ),
      _react2.default.createElement(
        'th',
        { key: 'annotation' },
        'Annotation'
      ),
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
  );
}
//# sourceMappingURL=coverage-file-table-head.js.map