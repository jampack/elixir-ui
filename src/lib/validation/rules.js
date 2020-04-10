/* eslint-disable */
import { extend } from 'vee-validate';
import { required, email, max, min_value, numeric } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '{_field_} is required',
});

extend('email', {
  ...email,
  message: 'Email is invalid',
});

extend('max', max);

extend('min_value', min_value);

extend('numeric', numeric);

/* eslint-enable */
