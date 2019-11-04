'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FlowCoverageMeterBar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FlowCoverageMeterBar(props) {
  var threshold = props.threshold;
  var color = props.percent >= threshold ? 'green' : 'red';
  var style = {
    padding: 0, height: 12
  };
  return _react2.default.createElement('div', { className: 'row ' + color, style: style });
}
//# sourceMappingURL=coverage-meter-bar.js.map