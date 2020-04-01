import Vue from 'vue';
import VueApollo from 'vue-apollo';
import mainClient from '@/lib/apollo/clients/MainClient';
import authClient from '@/lib/apollo/clients/AuthClient';
import uploadClient from '@/lib/apollo/clients/UploadClient';

Vue.use(VueApollo);

export default new VueApollo({
  clients: {
    mainClient,
    authClient,
    uploadClient,
  },
  defaultClient: authClient,
});
