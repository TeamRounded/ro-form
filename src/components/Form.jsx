import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from './_memoize';
import FormContext from './_FormContext';

class Form extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    name: PropTypes.string,
    onFieldChange: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    value: {},
    onChange: () => {},
    onFieldChange: () => {},
    name: '_RoForm',
  };

  _memoizedContext = memoize(
    [
      ({ formData }) => formData,
      ({ onFormDataChange }) => onFormDataChange,
      (_parentContext, value) => value,
      (_parentContext, _value, name) => name
    ],
    (formData, onFormDataChange, value, name) => ({
      formData: { ...formData, [name]: value },
      onFormDataChange: { ...onFormDataChange, [name]: this._onFormDataChange },
    })
  );

  _getContext = (parentContext) => {
    const { name, value } = this.props;

    return this._memoizedContext(parentContext, value, name);
  };

  _onFormDataChange = (changes) => {
    this.props.onChange({ ...this.props.value, ...changes });
    Object.keys(changes).forEach(field => this.props.onFieldChange(field, changes[field]));
  };

  _handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit();
  };

  render() {
    const { children, onSubmit, className } = this.props;

    let content;
    if (onSubmit) {
      content = (
        <form onSubmit={this._handleSubmit} className={className}>
          {children}
        </form>
      );
    } else {
      content = (
        <div className={className}>{children}</div>
      );
    }

    return (
      <FormContext.Consumer>
        {parentContext => (
          <FormContext.Provider value={this._getContext(parentContext)}>
            {content}
          </FormContext.Provider>
        )}
      </FormContext.Consumer>
    );
  }
}

export default Form;
