# ro-form

[![Build Status](https://travis-ci.org/TeamRounded/ro-form.svg?branch=master)](https://travis-ci.org/TeamRounded/ro-form)

**ro-form** is a minimalistic Form utility library for React that helps you build forms faster. It handles the data flow in forms and does not feature any UI. As examples below show, it is *extremely simple* to use. It can be used both with regular stateful `React` components and `redux`;

## Examples

```JSX
import React, { Component } from 'react';
import { Form, FormControl } from 'ro-form';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        password: ''
      }
    };
  }

  changeData = newData => this.setState({ data: newData });

  submit = () => {
    const { data } = this.state;

    console.log('Perform login with data:', data);
  }

  render() {
    const { data } = this.state;

    return (
      <Form value={data} onChange={this.changeData} onSubmit={this.submit}>
        <div>
          Username:
          <FormControl 
            control={TextInput}
            path={'username'}
          />
        </div>

        <div>
          Password:
          <FormControl 
            control={TextInput}
            controlProps={{ type: 'password' }}
            path={'password'}
          />
        </div>

        <button 
          type={'submit'} 
          disabled={data.password.length === 0 && data.username.length === 0}
        >
          Login
        </button>
      </Form>
    );
  }
}

const TextInput = ({ onChange, type, value }) => (
  <input type={type || 'text'} onChange={e => onChange(e.target.value)} value={value}>
);
```

### Want to keep your form state in Redux? No problem!

```JSX
import React, { Component } from 'react';
import { Form, FormControl } from 'ro-form';
import { connect } from 'react-redux';

const ReduxLoginScreen = ({ formData, changeFormData, onSubmit }) => (
  <Form value={data} onChange={changeFormData} onSubmit={onSubmit}>
    <div>
      Username:
      <FormControl 
        control={TextInput}
        path={'username'}
      />
    </div>

    <div>
      Password:
      <FormControl 
        control={TextInput}
        controlProps={{ type: 'password' }}
        path={'password'}
      />
    </div>

    <button 
      type={'submit'} 
      disabled={data.password.length === 0 && data.username.length === 0}
    >
      Login
    </button>
  </Form>
);

const TextInput = ({ onChange, type, value }) => (
  <input type={type || 'text'} onChange={e => onChange(e.target.value)} value={value}>
);

const mapStateToProps = state => {
  formData: state.myFormData,
};
const mapDispatchToProps = dispatch => {
  changeFormData: (newFormData) => dispatch(changeMyFormDataAction(newFormData)),
  onSubmit: () => dispatch(performLoginAction()),
};
ReduxLoginScreen = connect(mapStateToProps, mapDispatchToProps)(ReduxLoginScreen);
```

## API

**ro-form** is a really simple library that contains only two components: Form and FormControl.

### Form

**Form** component's purpose is to bind your component's data to underlying **FormControl**s.

Props:

* Required: `value`(Object): Object that contains data that needs to be provided to underlying **FormControl**s
* Required: `onChange(newValue)`(Function): Function that is called every time data in any of the **FormControl**s changes. It receives one argument, which is the new `value` object.
* Optional: `onSubmit`(Function): It is called once **Form** is submitted (eg. when user presses `Return` key on keyboard while one of form's inputs is focused). If you don't want to allow this behaviour, you do not have to provide this parameter.

### FormControl

**FormControl** handles updates of parts of the `value` object provided to parent **Form**.

Props:

* Required: `control`(Component): Any component that has `value`(Any) prop and `onChange`(Function) prop. Control's `onChange` should be passed one argument, which is the new `value`.
* Optional: `controlProps`(Object): Any additional props that should be provided to `control`.

Besides control, it requires either:

* `path`(String): Name of component's data part in the **Form**'s `value` object. FormControl will then automatically provide `value` and `onChange` to your input control.

Or:

* `value`(Any): Manually provide value to underlying input
* `onChange(newValue)`(Function): Manually handle input data changes

These two examples are identical:

```JSX
<Form value={data} onChange={this.changeData}>
  {/* This is the same */}
  <FormControl
    control={TextInput}
    path={'username'}
  />

  {/* as this */}
  <FormControl
    control={TextInput}
    value={data.username}
    onChange={newUsername => this.changeData({ data: { ...data, username: newUsername } })}
  />
</Form>
```

**Any component that receives `onChange` and `value` props can be used as `control` in `FormControl`**:

```JSX
const TextInput = ({ onChange, type, value }) => (
  <input type={type || 'text'} onChange={e => onChange(e.target.value)} value={value}>
);

<FormControl
  control={TextInput}
  path={'some_field'}
/>

const BabyNamePicker = ({ onChange, value, names }) => (
  <ul>
    {names.map(name => (
      <li 
        key={name} 
        onClick={() => onChange(name)}
        className={value === name ? 'active' : 'inactive'}
      >
        {name}
      </li>
    ))}
  </ul>
);

<FormControl
  control={BabyNamePicker}
  controlProps={{ names: ['Edwin', 'Stephanie', 'Angela', 'Robert'] }}
  path={'name'}
/>
```
