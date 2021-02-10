import { Sidetittel, Systemtittel } from 'nav-frontend-typografi';
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

const BannerContent = styled.div`
    width: 100%;
    max-width: 1024px;
    margin-top: 1rem;
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
            <BannerContent>
                {props.isFrontPage ? (
                    <Sidetittel tag="h1">{props.title}</Sidetittel>
                ) : (
                    <Systemtittel tag="h1">{props.title}</Systemtittel>
                )}
                {props.isFrontPage && <BannerIcon alt="" src={props.iconUrl} />}
            </BannerContent>
        </Banner>
    );
};
