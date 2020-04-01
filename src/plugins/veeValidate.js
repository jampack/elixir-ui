import Vue from 'vue';
import { ValidationProvider, ValidationObserver, setInteractionMode } from 'vee-validate';
import '@/lib/validation/rules';

setInteractionMode('eager');

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
