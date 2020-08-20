import { PageBanner } from './PageBanner';

export const Layout = (props: { title: string; isFrontPage: boolean; children: React.ReactChild }) => (
    <div id="app" className="app">
        <PageBanner isFrontPage={props.isFrontPage} />
        <div className="content">{props.children}</div>
    </div>
);
