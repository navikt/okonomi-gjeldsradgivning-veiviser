import sanityClient from '@sanity/client';
import sanityConfig from '../../sanity/sanity.json';

export default sanityClient({
    projectId: sanityConfig.api.projectId,
    dataset: process.env.SANITY_DATASET,
    useCdn: true,
});
