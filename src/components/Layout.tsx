import styled from 'styled-components';

import { Breadcrumb } from '../types';
import { useDecorator } from '../utils/useDecorator';
import { PageBanner } from './PageBanner';

const StyledLayout = styled.div`
    background-color: var(--navds-color-gray-10);

    .decorator-utils-container {
        background-color: var(--navds-color-white);
    }

    .navds-link {
        img + span:not(.sr-only),
        span:not(.sr-only) + img {
            margin-left: 0.25em;
        }
    }
`;

const App = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    box-sizing: border-box;
    margin: 4rem 1rem 6rem 1rem;
`;

export const Layout = (props: {
    title: string;
    isFrontPage: boolean;
    bannerIconUrl?: string;
    breadcrumbs?: Breadcrumb;
    locales?: string[];
    children: React.ReactChild;
}) => {
    useDecorator(props.breadcrumbs, props.locales);

    return (
        <StyledLayout>
            <App className="app" id="app">
                <PageBanner isFrontPage={props.isFrontPage} title={props.title} iconUrl={props.bannerIconUrl} />
                <Content>{props.children}</Content>
            </App>
        </StyledLayout>
    );
};
