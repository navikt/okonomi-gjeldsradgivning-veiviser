import sanityClient from '@sanity/client';
import { createPreviewSubscriptionHook } from 'next-sanity';

import sanityConfig from '../../sanity/sanity.json';

const config = {
    projectId: sanityConfig.api.projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2021-08-30',
    useCdn: true,
};

export default sanityClient(config);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);
