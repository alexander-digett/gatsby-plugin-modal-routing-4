"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.defaultValue = void 0;

var _react = _interopRequireDefault(require("react"));

var defaultValue = {
  isModal: false,
  closeTo: null
};
exports.defaultValue = defaultValue;

var ModalRoutingContext = /*#__PURE__*/_react.default.createContext(defaultValue);

var _default = ModalRoutingContext;
exports.default = _default;