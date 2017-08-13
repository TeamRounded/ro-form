import React from 'react';
import { Form, FormControl } from './index';
import { mount } from 'enzyme';

const TextInput = ({ onChange, value }) => (
  <input 
    type={'email'} 
    onChange={e => onChange(e.target.value)} 
    value={value}
  />
);

test('Field value is passed to controls', () => {
  let formValue = { email: 'someguy@rounded.io' };

  const form = mount(
    <Form value={formValue} onChange={() => {}}>
      <FormControl
        control={TextInput}
        path={'email'}
      />
    </Form>
  );

  expect(form.find('TextInput').props().value).toBe('someguy@rounded.io');
});

test('value prop passed to controls can be overriden', () => {
  let formValue = { email: 'someguy@rounded.io' };

  const form = mount(
    <Form value={formValue} onChange={() => {}}>
      <FormControl
        control={TextInput}
        value={'overriden@rounded.io'}
        path={'email'}
      />
    </Form>
  );

  expect(form.find('TextInput').props().value).toBe('overriden@rounded.io');
});

test('onChange prop that updates Form value is provided to controls', () => {
  let formValue = { email: 'someguy@rounded.io' };
  const originalFormValue = formValue;
  const changeValue = newFormValue => formValue = newFormValue;

  const form = mount(
    <Form value={formValue} onChange={changeValue}>
      <FormControl
        control={TextInput}
        path={'email'}
      />
    </Form>
  );

  form.find('TextInput').props().onChange('updatedvalue@rounded.io')

  expect(formValue).toEqual({ email: 'updatedvalue@rounded.io' });

  // Assert that it doesn't mutate original value object
  expect(originalFormValue).toEqual({ email: 'someguy@rounded.io' });
});

test('onChange prop passed to controls can be overriden', () => {
  let formValue = { email: 'someguy@rounded.io' };

  const form = mount(
    <Form value={formValue} onChange={() => {}}>
      <FormControl
        control={TextInput}
        onChange={newEmail => formValue = { ...formValue, otherEmail: newEmail }}
        path={'email'}
      />
    </Form>
  );

  form.find('TextInput').props().onChange('another@rounded.io');

  expect(formValue).toEqual({
    email: 'someguy@rounded.io',
    otherEmail: 'another@rounded.io',
  });
});

test('Forms can be nested', () => {
  let parentFormValue = { email: 'someguy@rounded.io' };
  const changeParentFormValue = newFormValue => parentFormValue = newFormValue;

  let childFormValue = { name: 'Igor' };
  const changeChildFormValue = newFormValue => childFormValue = newFormValue;

  const form = mount(
    <Form value={parentFormValue} onChange={changeParentFormValue}>
      <Form 
        name={'contactInfo'} 
        value={childFormValue} 
        onChange={changeChildFormValue}
      >
        <FormControl
          control={TextInput}
          path={'name'}
          formName={'contactInfo'}
        />
      </Form>
    </Form>
  );

  const input = form.find('TextInput');
  expect(input.props().value).toBe('Igor');
  
  input.props().onChange('John');
  expect(parentFormValue).toEqual({ email: 'someguy@rounded.io' });
  expect(childFormValue).toEqual({ name: 'John' });
});
