import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    name: PropTypes.string,
  };

  static defaultProps = {
    value: {},
    onChange: () => {},
    name: '_RoForm',
  };

  static childContextTypes = {
    formData: PropTypes.object.isRequired,
    onFormDataChange: PropTypes.object.isRequired,
  };

  static contextTypes = {
    formData: PropTypes.object,
    onFormDataChange: PropTypes.object,
  };

  getChildContext() {
    let { formData, onFormDataChange } = this.context;
    const { name } = this.props;
    formData = formData || {};
    onFormDataChange = onFormDataChange || {};
    return {
      formData: { ...formData, [name]: this.props.value },
      onFormDataChange: { ...onFormDataChange, [name]: this._onFormDataChange },
    };
  }

  _onFormDataChange = (changes) => {
    this.props.onChange({ ...this.props.value, ...changes });
  };

  _handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit();
  };

  render() {
    const { children, onSubmit } = this.props;

    if (onSubmit) {
      return (
        <form onSubmit={this._handleSubmit}>
          {children}
        </form>
      );
    } else {
      return (
        <div>{children}</div>
      );
    }
  }
}

export default Form;