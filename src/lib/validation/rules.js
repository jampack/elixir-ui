import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '{_field_} is required',
});

extend('email', {
  ...email,
  message: 'Email is invalid',
});
