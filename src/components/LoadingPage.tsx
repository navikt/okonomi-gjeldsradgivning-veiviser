import { PageProps } from '../pageProps';
import { ArticlePanel } from './ArticlePanel';
import { Lastestriper } from './lastestriper/Lastestriper';
import { Layout } from './Layout';

export const LoadingPage = (props: { page?: PageProps }) => (
    <Layout title="" isFrontPage={false} breadcrumbs={props.page?.breadcrumbs}>
        <article>
            <ArticlePanel>
                <Lastestriper />
            </ArticlePanel>
        </article>
    </Layout>
);
