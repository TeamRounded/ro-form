import { createContext } from 'react';

const FormContext = createContext({
  formData: {},
  onFormDataChange: {},
});

export default FormContext;
