import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormContext from './_FormContext';

class FormControl extends Component {
  static propTypes = {
    control: PropTypes.any.isRequired,
    controlProps: PropTypes.object,
    formName: PropTypes.string,
    path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

    // Handle onChange manually
    onChange: PropTypes.func,
    // Pass value manually
    value: PropTypes.any,
  };

  static defaultProps = {
    controlProps: {},
    formName: '_RoForm',
    onChange: null,
    value: undefined,
  };

  static contextType = FormContext;

  _onChange = (value) => {
    const { path, formName, onChange } = this.props;

    if (onChange) {
      onChange(value);
    } else {
      this.context.onFormDataChange[formName]({ [path]: value });
    }
  };

  _value = () => {
    const { value, path, formName } = this.props;
    const { formData } = this.context;

    if (typeof value === 'undefined') {
      return formData[formName][path];
    } else {
      return value;
    }
  };

  componentWillMount() {
    const { formData } = this.context;
    if (!formData) {
      throw 'FormControl must be a child of Form component';
    }
    if (!formData[this.props.formName]) {
      throw `FormControl is bound to "${this.props.formName}" name, but forms found are: ${Object.keys(formData).join(', ')}`;
    }
  }

  render() {
    const { controlProps } = this.props;

    const ControlComponent = this.props.control;

    return <ControlComponent {...controlProps} value={this._value()} onChange={this._onChange} />;
  }
}

export default FormControl;
