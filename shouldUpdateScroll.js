"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _get2 = _interopRequireDefault(require("lodash/get"));

var shouldUpdateScroll = function shouldUpdateScroll(_ref) {
  var location = _ref.routerProps.location;
  var isModal = (0, _get2.default)(location, 'state.modal');
  var preventUpdateScroll = (0, _get2.default)(location, 'state.noScroll');
  return !isModal && !preventUpdateScroll;
};

var _default = shouldUpdateScroll;
exports.default = _default;