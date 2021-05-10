import { Sidetittel } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';

import { digisosColors } from '../utils/colors';

const Banner = styled.div`
    height: calc(200px - 1rem);
    background-color: ${digisosColors.digisosLysGronn};
    border-bottom: 4px solid ${digisosColors.digisosMorkGronn};
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    padding: 1rem 1rem 0 1rem;
`;

const BannerContent = styled.div`
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

export const PageBannerNewGrid = (props: { title: string; iconUrl: string }) => {
    return (
        <Banner>
            <BannerContent>
                <Sidetittel>{props.title}</Sidetittel>
                <BannerIcon src={props.iconUrl} alt="" />
            </BannerContent>
        </Banner>
    );
};
