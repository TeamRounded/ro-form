import React from 'react';
import { Form, FormControl } from './index';
import { render, fireEvent, cleanup } from 'react-testing-library';

afterEach(cleanup);

class TextInput extends React.Component {
  render() {
    const { onChange, value } = this.props;

    return (
      <input
        data-testid={'textinput'}
        type={'email'}
        onChange={e => onChange(e.target.value)}
        value={value}
      />
    );
  }
}

test('Field value is passed to controls', () => {
  let formValue = { email: 'someguy@rounded.io' };

  const { getByTestId } = render(
    <Form value={formValue} onChange={() => {
    }}>
      <FormControl
        control={TextInput}
        path={'email'}
      />
    </Form>,
  );

  expect(getByTestId('textinput').value).toBe('someguy@rounded.io');
});

test('value prop passed to controls can be overriden', () => {
  let formValue = { email: 'someguy@rounded.io' };

  const { getByTestId } = render(
    <Form value={formValue} onChange={() => {
    }}>
      <FormControl
        control={TextInput}
        value={'overriden@rounded.io'}
        path={'email'}
      />
    </Form>,
  );

  expect(getByTestId('textinput').value).toBe('overriden@rounded.io');
});

test('onChange prop that updates Form value is provided to controls', () => {
  let formValue = { email: 'someguy@rounded.io' };
  const originalFormValue = formValue;
  const changeValue = newFormValue => formValue = newFormValue;

  const { getByTestId } = render(
    <Form value={formValue} onChange={changeValue}>
      <FormControl
        control={TextInput}
        path={'email'}
      />
    </Form>,
  );

  fireEvent.change(getByTestId('textinput'), {
    target: { value: 'updatedvalue@rounded.io' },
  });

  expect(formValue).toEqual({ email: 'updatedvalue@rounded.io' });

  // Assert that it doesn't mutate original value object
  expect(originalFormValue).toEqual({ email: 'someguy@rounded.io' });
});

test('onChange prop passed to controls can be overriden', () => {
  let formValue = { email: 'someguy@rounded.io' };

  const { getByTestId } = render(
    <Form value={formValue} onChange={() => {
    }}>
      <FormControl
        control={TextInput}
        onChange={newEmail => formValue = { ...formValue, otherEmail: newEmail }}
        path={'email'}
      />
    </Form>,
  );

  fireEvent.change(getByTestId('textinput'), {
    target: { value: 'another@rounded.io' },
  });

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

  const { getByTestId } = render(
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
    </Form>,
  );

  expect(getByTestId('textinput').value).toBe('Igor');

  fireEvent.change(getByTestId('textinput'), {
    target: { value: 'John' },
  });

  expect(parentFormValue).toEqual({ email: 'someguy@rounded.io' });
  expect(childFormValue).toEqual({ name: 'John' });
});

test('Form onFieldChange', () => {
  let formValue = { email: 'igor@rounded.io' };

  let fieldChanges = [];
  const handleFieldChange = (field, value) => {
    fieldChanges.push([field, value]);
  };

  const { getByTestId } = render(
    <Form value={formValue} onFieldChange={handleFieldChange}>
      <FormControl
        control={TextInput}
        path={'email'}
      />
    </Form>,
  );

  fireEvent.change(getByTestId('textinput'), {
    target: { value: 'aleksa@rounded.io' },
  });

  expect(fieldChanges.length).toEqual(1);
  expect(fieldChanges[0]).toEqual(['email', 'aleksa@rounded.io']);
});


test('form rerenders only when form value actually changes', () => {
  class RenderBlocker extends React.Component {
    shouldComponentUpdate() {
      return false;
    }

    render() {
      return this.props.children;
    }
  }

  let renderCount = 0;
  class TextInputWithRenderCount extends TextInput {
    render() {
      renderCount++;
      return super.render();
    }
  }

  class MyComponent extends React.Component {
    state = {
      formValue: { email: 'igor@rounded.io' }
    };

    _handleFieldChange = (field, value) => {
      this.setState(state => ({ formValue: { ...state.formValue, [field]: value } }));
    };

    render() {
      const { formValue } = this.state;

      return (
        <Form value={formValue} onFieldChange={this._handleFieldChange}>
          <RenderBlocker>
            <FormControl
              path={'email'}
              control={TextInputWithRenderCount}
            />
          </RenderBlocker>
        </Form>
      );
    }
  }

  const { rerender, getByTestId } = render(<MyComponent />);

  expect(renderCount).toEqual(1);

  fireEvent.change(getByTestId('textinput'), {
    target: { value: 'petar@rounded.io' },
  });

  expect(getByTestId('textinput').value).toBe('petar@rounded.io');

  expect(renderCount).toEqual(2);
});

const DivRenderedComponent = () => <Form value={{}} onChange={() => {}} className={'myClass'} />;
const FormRenderedComponent = () => <Form value={{}} onChange={() => {}} onSubmit={() => {}} className={'myClass'} />;
[DivRenderedComponent, FormRenderedComponent].forEach(Component => {
  test(`className prop on ${Component.name}`, () => {
    const { container } = render(<Component />);
    expect(container.firstChild.classList.contains('myClass')).toBe(true);
  });
});
