import { NavdsColorGray10, NavdsColorWhite } from '@navikt/ds-tokens/dist/tokens';
import { Breadcrumb } from '@navikt/nav-dekoratoren-moduler';
import styled from 'styled-components';

import { useDecorator } from '../utils/useDecorator';
import { PageBanner } from './PageBanner';

const StyledLayout = styled.div`
    background-color: ${NavdsColorGray10};

    .decorator-utils-container {
        background-color: ${NavdsColorWhite};
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
    children: React.ReactChild;
}) => {
    useDecorator(props.breadcrumbs);

    return (
        <StyledLayout>
            <App className="app" id="app">
                <PageBanner isFrontPage={props.isFrontPage} title={props.title} iconUrl={props.bannerIconUrl} />
                <Content>{props.children}</Content>
            </App>
        </StyledLayout>
    );
};
