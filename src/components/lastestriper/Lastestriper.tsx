import styled from 'styled-components';

const lasterstriperMork = '#ddd9d6';
const lasterstriperLys = '#e9e7e7';

const StyledLastestriper = styled.div`
    display: block;
    width: 100%;
`;

const Lastestripe = styled.div`
    display: block;
    height: 18px;
    border-radius: 2px;
    margin-bottom: 8px;
    background-color: ${lasterstriperMork};
    animation-name: animasjon;
    animation-duration: 1200ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;

    @keyframes animasjon {
        0%,
        100% {
            background-color: ${lasterstriperMork};
        }
        50% {
            background-color: ${lasterstriperLys};
        }
    }
`;

const LastestripeKortForsinelse = styled(Lastestripe)`
    animation-delay: 300ms;
`;

const LastestripeLangForsinkelse = styled(Lastestripe)`
    animation-delay: 600ms;
    width: 55%;
`;

export interface NavFrontendLastestriperProps {
    /**
     * Antall lastestriper. Default er 3.
     */
    linjer?: number;
}

const lastestriper = (linjer: number): React.ReactNode[] => {
    let stripeIndeks = 0;
    const divs: React.ReactNode[] = [];
    for (let index = 0; index < linjer; index++) {
        if (stripeIndeks === 0) {
            divs.push(<Lastestripe key={index} />);
        }
        if (stripeIndeks === 1) {
            divs.push(<LastestripeKortForsinelse key={index} />);
        }
        if (stripeIndeks === 2) {
            divs.push(<LastestripeLangForsinkelse key={index} />);
        }
        stripeIndeks++;
        if (stripeIndeks === 3) {
            stripeIndeks = 0;
        }
    }
    return divs;
};

export const Lastestriper = (props: NavFrontendLastestriperProps) => {
    const { linjer = 3 } = props;

    return <StyledLastestriper>{lastestriper(linjer)}</StyledLastestriper>;
};
