// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import article from './article';
import articleGroup from './articleGroup';
import articlePanel from './articlePanel';
import blockContent from './blockContent';
import category from './category';
import externalLink from './externalLink';
import fileUpload from './fileUpload';
import frontpage from './frontpage';
import linkPanel from './linkPanel';
import vimeo from './vimeo';
import expandedPanel from './expandedPanel';
import localeString from './locale/localeString';
import localeBlockContent from './locale/localeBlockContent';

export default createSchema({
    name: 'default',
    types: schemaTypes.concat([
        article,
        articleGroup,
        articlePanel,
        expandedPanel,
        blockContent,
        category,
        externalLink,
        fileUpload,
        frontpage,
        linkPanel,
        vimeo,
        localeString,
        localeBlockContent,
    ]),
});
