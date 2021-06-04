import { Title } from '@navikt/ds-react';
import styled from 'styled-components';

interface BannerProps {
    height: string;
}

const Banner = styled.div<BannerProps>`
    background-color: #9bd0b0;
    border-bottom: 4px solid #38a161;
    width: 100%;
    padding: 0 1rem;
    display: flex;
    justify-content: center;
    min-height: ${(props) => props.height};
`;

interface BannerContentProps {
    isFrontpage: boolean;
}
const BannerContent = styled.div<BannerContentProps>`
    width: 100%;
    max-width: 1024px;
    margin-top: ${(props) => (props.isFrontpage ? '1rem' : '0')};
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const BannerIcon = styled.img`
    margin-top: 1rem;
    align-self: flex-end;
`;

export const PageBanner = (props: { isFrontPage: boolean; title: string; iconUrl: string }) => {
    return (
        <Banner height={props.isFrontPage ? '190px' : '70px'}>
            <BannerContent isFrontpage={props.isFrontPage}>
                {props.isFrontPage ? (
                    <Title level={1} size="xl">
                        {props.title}
                    </Title>
                ) : (
                    <Title level={1} size="l">
                        {props.title}
                    </Title>
                )}
                {props.isFrontPage && <BannerIcon alt="" src={props.iconUrl} />}
            </BannerContent>
        </Banner>
    );
};
