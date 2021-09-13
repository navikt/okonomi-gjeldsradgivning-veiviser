import sanityConfig from '../../../sanity/sanity.json';

export const config = {
    projectId: sanityConfig.api.projectId,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2021-08-30',
    useCdn: true,
    withCredentials: true,
};
