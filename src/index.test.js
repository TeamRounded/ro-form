import React from 'react';
import { Form, FormControl } from './index';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

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

test('Form onFieldChange', () => {
  let formValue = { email: 'igor@rounded.io' };

  let fieldChanges = [];
  const handleFieldChange = (field, value) => {
    fieldChanges.push([field, value]);
  };

  const form = mount(
    <Form value={formValue} onFieldChange={handleFieldChange}>
      <FormControl
        control={TextInput}
        path={'email'}
      />
    </Form>
  );

  const input = form.find('TextInput');
  input.props().onChange('aleksa@rounded.io');

  expect(fieldChanges.length).toEqual(1);
  expect(fieldChanges[0]).toEqual(['email', 'aleksa@rounded.io']);
});


test('form does not rerender if context value does not change', () => {{
  let formValue = { email: 'igor@rounded.io' };

  class RenderBlocker extends React.Component {
    shouldComponentUpdate() {
      return false;
    }

    render() {
      return this.props.children;
    }
  }

  let renderCount = 0;
  class FormControlWithRenderCount extends FormControl {
    render() {
      renderCount++;
      return super.render();
    }
  }

  const MyComponent = () => (
    <Form value={formValue}>
      <RenderBlocker>
        <FormControlWithRenderCount
          path={'email'}
          control={TextInput}
        />
      </RenderBlocker>
    </Form>
  );

  const rendered = mount(<MyComponent />);
  rendered.update();
  rendered.setProps({ a: 5 });
  rendered.update();

  expect(renderCount).toEqual(1);
}});
