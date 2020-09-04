import { PageBanner } from './PageBanner';

export const Layout = (props: {
    title: string;
    isFrontPage: boolean;
    bannerIconUrl?: string;
    children: React.ReactChild;
}) => (
    <div id="app" className="app">
        <PageBanner isFrontPage={props.isFrontPage} title={props.title} iconUrl={props.bannerIconUrl} />
        <div className="content">{props.children}</div>
    </div>
);
