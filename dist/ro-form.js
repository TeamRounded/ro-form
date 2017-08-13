'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this._onFormDataChange = function (changes) {
      _this.props.onChange(_extends({}, _this.props.value, changes));
    }, _this._handleSubmit = function (e) {
      e.preventDefault();
      var onSubmit = _this.props.onSubmit;

      onSubmit();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Form, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _context = this.context,
          formData = _context.formData,
          onFormDataChange = _context.onFormDataChange;
      var name = this.props.name;

      formData = formData || {};
      onFormDataChange = onFormDataChange || {};
      return {
        formData: _extends({}, formData, _defineProperty({}, name, this.props.value)),
        onFormDataChange: _extends({}, onFormDataChange, _defineProperty({}, name, this._onFormDataChange))
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          onSubmit = _props.onSubmit;


      if (onSubmit) {
        return _react2.default.createElement(
          'form',
          { onSubmit: this._handleSubmit },
          children
        );
      } else {
        return _react2.default.createElement(
          'div',
          null,
          children
        );
      }
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  value: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func,
  name: _propTypes2.default.string
};
Form.defaultProps = {
  value: {},
  onChange: function onChange() {},
  name: '_RoForm'
};
Form.childContextTypes = {
  formData: _propTypes2.default.object.isRequired,
  onFormDataChange: _propTypes2.default.object.isRequired
};
Form.contextTypes = {
  formData: _propTypes2.default.object,
  onFormDataChange: _propTypes2.default.object
};
exports.default = Form;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.set');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.get');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormControl = function (_Component) {
  _inherits(FormControl, _Component);

  function FormControl() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormControl.__proto__ || Object.getPrototypeOf(FormControl)).call.apply(_ref, [this].concat(args))), _this), _this._onChange = function (value) {
      var _this$props = _this.props,
          path = _this$props.path,
          formName = _this$props.formName,
          onChange = _this$props.onChange;


      if (onChange) {
        onChange(value);
      } else {
        var changes = {};
        (0, _lodash2.default)(changes, path, value);

        _this.context.onFormDataChange[formName](changes);
      }
    }, _this._value = function () {
      var _this$props2 = _this.props,
          value = _this$props2.value,
          path = _this$props2.path,
          formName = _this$props2.formName;
      var formData = _this.context.formData;


      if (typeof value === 'undefined') {
        return (0, _lodash4.default)(formData[formName], path);
      } else {
        return value;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FormControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var formData = this.context.formData;

      if (!formData) {
        throw 'FormControl must be a child of Form component';
      }
      if (!formData[this.props.formName]) {
        throw 'FormControl is bound to "' + this.props.formName + '" name, but forms found are: ' + Object.keys(formData).join(', ');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var controlProps = this.props.controlProps;


      var ControlComponent = this.props.control;

      return _react2.default.createElement(ControlComponent, _extends({}, controlProps, { value: this._value(), onChange: this._onChange }));
    }
  }]);

  return FormControl;
}(_react.Component);

FormControl.propTypes = {
  control: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.instanceOf(_react.Component)]).isRequired,
  controlProps: _propTypes2.default.object,
  formName: _propTypes2.default.string,

  // Either provide path prop or onChange+value props, not both.
  path: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),

  // Handle onChange manually
  onChange: _propTypes2.default.func,
  // Pass value manually
  value: _propTypes2.default.any
};
FormControl.defaultProps = {
  controlProps: {},
  formName: '_RoForm',
  onChange: null,
  value: undefined
};
FormControl.contextTypes = {
  formData: _propTypes2.default.object.isRequired,
  onFormDataChange: _propTypes2.default.object.isRequired
};
exports.default = FormControl;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormControl = exports.Form = undefined;

var _Form = require('./components/Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormControl = require('./components/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Form = _Form2.default;
exports.FormControl = _FormControl2.default;

//# sourceMappingURL=ro-form.js.map