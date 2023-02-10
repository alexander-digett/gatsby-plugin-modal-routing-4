"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _ModalRoutingContext = _interopRequireDefault(require("./ModalRoutingContext"));

var ModalRoutingLink = function ModalRoutingLink(_ref) {
  var to = _ref.to,
      asModal = _ref.asModal,
      state = _ref.state,
      rest = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["to", "asModal", "state"]);
  return /*#__PURE__*/_react.default.createElement(_ModalRoutingContext.default.Consumer, null, function (_ref2) {
    var modal = _ref2.modal,
        closeTo = _ref2.closeTo;
    return /*#__PURE__*/_react.default.createElement(_gatsby.Link, (0, _extends2.default)({
      to: to,
      state: (0, _extends2.default)({}, state, {
        modal: asModal,
        noScroll: to === closeTo
      })
    }, rest));
  });
};

var _default = ModalRoutingLink;
exports.default = _default;