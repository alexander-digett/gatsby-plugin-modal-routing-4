"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _gatsby = require("gatsby");

var _react = _interopRequireDefault(require("react"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _ModalRoutingContext = _interopRequireDefault(require("./ModalRoutingContext"));

var withoutPrefix = function withoutPrefix(path) {
  var prefix = typeof __BASE_PATH__ !== "undefined" ? __BASE_PATH__ : __PATH_PREFIX__;
  return path.slice(prefix ? prefix.length : 0);
};

var ReplaceComponentRenderer = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(ReplaceComponentRenderer, _React$Component);

  function ReplaceComponentRenderer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      prevProps: null,
      lastModalProps: null,
      props: null,
      pathname: null
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "modalContentRef", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleRequestClose", function () {
      (0, _gatsby.navigate)(withoutPrefix(_this.state.prevProps.location.pathname), {
        state: {
          noScroll: true
        }
      });
    });
    return _this;
  }

  ReplaceComponentRenderer.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    // TODO: handle history changes
    if (props.location.pathname !== state.pathname) {
      return (0, _extends2["default"])({
        pathname: props.location.pathname,
        props: props
      }, (0, _get2["default"])(state, 'props.location.state.modal') ? {
        // old page was a modal, keep track so we can render the contents while closing
        lastModalProps: state.props
      } : {
        // old page was not a modal, keep track so we can render the contents under modals
        prevProps: state.props
      });
    }

    return null;
  };

  var _proto = ReplaceComponentRenderer.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if ((0, _get2["default"])(prevProps, 'location.pathname') !== (0, _get2["default"])(this.props, 'location.pathname') && (0, _get2["default"])(this.props, 'location.state.modal') && this.modalContentRef) {
      this.modalContentRef.scrollTop = 0;
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    // render modal if props location has modal
    var _this$props = this.props,
        pageResources = _this$props.pageResources,
        location = _this$props.location,
        modalProps = _this$props.modalProps;
    var _this$state = this.state,
        prevProps = _this$state.prevProps,
        lastModalProps = _this$state.lastModalProps;
    var isModal = prevProps && (0, _get2["default"])(location, 'state.modal');
    var resources = isModal ? prevProps.pageResources : pageResources; // the page is the previous path if this is a modal, otherwise it's the current path

    var pageElement = isModal ? /*#__PURE__*/_react["default"].createElement(prevProps.pageResources.component, (0, _extends2["default"])({}, prevProps, {
      key: prevProps.pageResources.page.path
    })) : /*#__PURE__*/_react["default"].createElement(pageResources.component, (0, _extends2["default"])({}, this.props, {
      key: pageResources.page.path
    }));
    var modalElement = null;

    if (isModal) {
      // Rendering the current page as a modal, so create an element with the page contents
      modalElement = /*#__PURE__*/_react["default"].createElement(pageResources.component, (0, _extends2["default"])({}, this.props, {
        key: pageResources.page.path
      }));
    } else if (lastModalProps) {
      // Not rendering the current page as a modal, but we may be in the process of animating
      // the old modal content to close, so render the last modal content we have cached
      modalElement = /*#__PURE__*/_react["default"].createElement((0, _get2["default"])(lastModalProps, 'pageResources.component'), (0, _extends2["default"])({}, lastModalProps, {
        key: (0, _get2["default"])(lastModalProps, 'pageResources.page.path')
      }));
    }

    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, pageElement, /*#__PURE__*/_react["default"].createElement(_reactModal["default"], (0, _extends2["default"])({
      onRequestClose: this.handleRequestClose,
      contentRef: function contentRef(node) {
        return _this2.modalContentRef = node;
      }
    }, modalProps, {
      isOpen: !!isModal
    }), modalElement ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: this.props.location.key
    }, /*#__PURE__*/_react["default"].createElement(_ModalRoutingContext["default"].Provider, {
      value: {
        modal: true,
        closeTo: prevProps ? withoutPrefix(prevProps.location.pathname) : '/'
      }
    }, modalElement)) : null));
  };

  return ReplaceComponentRenderer;
}(_react["default"].Component);

var replaceComponentRenderer = function replaceComponentRenderer(_ref, opts) {
  var props = _ref.props;
  var modalProps = opts.modalProps;
  return /*#__PURE__*/_react["default"].createElement(ReplaceComponentRenderer, (0, _extends2["default"])({}, props, {
    modalProps: modalProps
  }));
};

var _default = replaceComponentRenderer;
exports["default"] = _default;