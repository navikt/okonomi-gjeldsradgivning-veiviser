import Panel from 'nav-frontend-paneler';
import { PageProps } from '../pageProps';
import { Lastestriper } from './lastestriper/Lastestriper';
import { Layout } from './Layout';

export const LoadingPage = (props: { page?: PageProps }) => (
    <Layout title="" isFrontPage={false} decoratorParts={props.page?.decorator}>
        <article>
            <Panel className={`section-panel section-panel__article section-panel__noIcon section-panel__loading`}>
                <Lastestriper />
            </Panel>
        </article>
    </Layout>
);
