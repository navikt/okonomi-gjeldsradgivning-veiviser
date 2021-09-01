import sanityClient from 'part:@sanity/base/client';

const client = sanityClient.withConfig({ apiVersion: '2021-09-01', dataset: 'migrations' });

const patchArticles = async () => {
    const articles = await client.fetch(`*[_type == 'article' && !defined(migrationComplete)][0...100] 
    {
        _id, 
        _rev, 
        title, 
        description,
        metaDescription,
        body,
        migrationComplete
    }`);
    if (articles.length === 0) return;
    articles.forEach((article) =>
        client
            .patch(article._id)
            .ifRevisionId(article._rev)
            .set({
                title: { nb: article.title },
                description: { nb: article.description },
                metaDescription: { nb: article.metaDescription },
                body: { nb: article.body },
                migrationComplete: true,
            })
            .commit()
    );
};

const patchFrontpage = async () => {
    const frontpage = await client.fetch(
        `*[_type == "frontpage" && !defined(title.nb)][0]{_id,_rev,title,metaDescription}`
    );
    if (!frontpage) return;
    await client
        .patch(frontpage._id)
        .ifRevisionId(frontpage._rev)
        .set({ title: { nb: frontpage.title }, metaDescription: { nb: frontpage.metaDescription } })
        .commit();
};

const patchArticleGroups = async () => {
    const articleGroups = await client.fetch(`*[_type == 'articleGroup' && !defined(title.nb)][0...100] 
    {
        _id, 
        _rev, 
        title, 
    }`);
    if (articleGroups.length === 0) return;
    articleGroups.forEach((article) =>
        client
            .patch(article._id)
            .ifRevisionId(article._rev)
            .set({
                title: { nb: article.title },
            })
            .commit()
    );
};

const patchArticlePanel = async () => {
    const articlePanel = await client.fetch(`*[_type == 'articlePanel' && !defined(title.nb)][0...100] 
    {
        _id, 
        _rev, 
        title,
        description,
    }`);
    if (articlePanel.length === 0) return;
    articlePanel.forEach((article) =>
        client
            .patch(article._id)
            .ifRevisionId(article._rev)
            .set({
                title: { nb: article.title },
                description: { nb: article.description },
            })
            .commit()
    );
};

const patchLinkPanel = async () => {
    const linkPanel = await client.fetch(`*[_type == 'linkPanel' && !defined(title.nb)][0...100] 
    {
        _id, 
        _rev, 
        title,
        description,
        buttonText,
    }`);
    if (linkPanel.length === 0) return;
    linkPanel.forEach((article) =>
        client
            .patch(article._id)
            .ifRevisionId(article._rev)
            .set({
                title: { nb: article.title },
                description: { nb: article.description },
                buttonText: { nb: article.buttonText },
            })
            .commit()
    );
};

const migrateDocuments = async () => {
    await patchArticles();
    await patchArticleGroups();
    await patchArticlePanel();
    await patchLinkPanel();
    await patchFrontpage();
};

migrateDocuments().catch((err) => {
    console.error(err);
    process.exit(1);
});
