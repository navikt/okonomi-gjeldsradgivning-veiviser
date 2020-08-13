import { PageBanner } from './PageBanner';
import { Breadcrumbs } from './Breadcrumbs';

export const Layout = (props: { title: string; isFrontPage: boolean; children: React.ReactChildren }) => (
    <>
        <PageBanner title={props.title} isFrontPage={props.isFrontPage} />

        <div id="app" className="app">
            <div className="content">
                {!props.isFrontPage && <Breadcrumbs title={props.title} />}
                {props.children}
            </div>
        </div>
    </>
);
