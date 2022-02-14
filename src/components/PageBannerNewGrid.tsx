import { Heading } from '@navikt/ds-react';
import styled from 'styled-components';

import { digisosColors } from '../utils/colors';

const Banner = styled.div`
    min-height: calc(200px - 1rem);
    background-color: ${digisosColors.digisosLysGronn};
    border-bottom: 4px solid ${digisosColors.digisosMorkGronn};
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    padding: 1rem 1rem 0 1rem;
`;

const BannerContent = styled.div`
    width: 100%;
    max-width: 1024px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;

    h1 {
        margin: 0.5rem 1rem;
    }
`;

const BannerIcon = styled.img`
    margin-top: 1rem;
    align-self: flex-end;
`;

export const PageBannerNewGrid = (props: { title: string; iconUrl: string }) => {
    return (
        <Banner>
            <BannerContent>
                <Heading level="1" size="xlarge">
                    {props.title}
                </Heading>
                <BannerIcon src={props.iconUrl} alt="" />
            </BannerContent>
        </Banner>
    );
};
