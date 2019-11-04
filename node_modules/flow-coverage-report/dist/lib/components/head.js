'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HTMLReportHead;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line import/no-unresolved

var AUTO_HEIGHT_SOURCE = '\n.ui .CodeMirror {\n  border: 1px solid rgba(34,36,38,.15);\n  height: auto;\n}\n';function HTMLReportHead(props) {
  var links = !props.assets || !props.assets.css ? [] : props.assets.css.map(function (css) {
    return _react2.default.createElement('link', { key: css, rel: 'stylesheet', href: css });
  });
  var scripts = !props.assets || !props.assets.js ? [] : props.assets.js.map(function (js) {
    return _react2.default.createElement('script', { key: js, src: js });
  });

  var customStyle = void 0;

  if (props.htmlTemplateOptions && props.htmlTemplateOptions.autoHeightSource) {
    customStyle = _react2.default.createElement(
      'style',
      { key: 'custom-style' },
      AUTO_HEIGHT_SOURCE
    );
  }

  var charset = _react2.default.createElement('meta', { key: 'charset', charSet: 'utf-8' });
  return _react2.default.createElement(
    'head',
    null,
    [charset].concat(links, scripts, customStyle)
  );
}
//# sourceMappingURL=head.js.map