import { Heading } from '@navikt/ds-react';
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
                    <Heading level="1" size="large">
                        {props.title}
                    </Heading>
                ) : (
                    <Heading level="1" size="medium">
                        {props.title}
                    </Heading>
                )}
                {props.isFrontPage && <BannerIcon alt="" src={props.iconUrl} />}
            </BannerContent>
        </Banner>
    );
};
