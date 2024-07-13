import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
// import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({});

backend.addOutput({
  auth: {
    aws_region: process.env.REGION,
    user_pool_id: process.env.USER_POOL_ID,
    user_pool_client_id: process.env.USER_POOL_CLIENT_ID,
  }
})
