import { PageBanner } from './PageBanner';
import { DecoratorHeader } from './decorator/DecoratorHeader';
import { DecoratorFooter } from './decorator/DecoratorFooter';
import Head from 'next/head';
import { DecoratorParts } from '../utils/dekorator';
import { DecoratorEnv } from './decorator/DecoratorEnv';

export const Layout = (props: {
    title: string;
    isFrontPage: boolean;
    bannerIconUrl?: string;
    decoratorParts?: DecoratorParts;
    children: React.ReactChild;
}) => {
    return (
        <>
            <Head>
                {props.decoratorParts?.linkTags.map((attrs, index) => {
                    attrs.key = 'props.linkTags' + index;
                    return <link key={index} {...attrs} />;
                })}
            </Head>
            <DecoratorHeader html={props.decoratorParts?.decoratorHeader} />
            <div id="app" className="app">
                <PageBanner isFrontPage={props.isFrontPage} title={props.title} iconUrl={props.bannerIconUrl} />
                <div className="content">{props.children}</div>
            </div>
            <DecoratorFooter html={props.decoratorParts?.decoratorFooter} />
            <DecoratorEnv env={props.decoratorParts?.decoratorEnv} />
        </>
    );
};
