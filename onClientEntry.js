"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _reactModal = _interopRequireDefault(require("react-modal"));

var onClientEntry = function onClientEntry(_args, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var _opts = opts,
      _opts$appElement = _opts.appElement,
      appElement = _opts$appElement === void 0 ? "#___gatsby" : _opts$appElement;

  _reactModal.default.setAppElement(appElement);
};

var _default = onClientEntry;
exports.default = _default;