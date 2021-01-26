import './lastestriper.less';

export interface NavFrontendLastestriperProps {
    /**
     * Antall lastestriper. Default er 3.
     */
    linjer?: number;
    /**
     * Egendefinert klassenavn.
     */
    className?: string;
}

const lastestriper = (linjer: number): React.ReactNode[] => {
    let stripeIndeks = 0;
    const divs: React.ReactNode[] = [];
    for (let index = 0; index < linjer; index++) {
        if (stripeIndeks === 0) {
            divs.push(<div className="lastestripe" key={index} />);
        }
        if (stripeIndeks === 1) {
            divs.push(<div className="lastestripe lastestripe__kort_forsinkelse" key={index} />);
        }
        if (stripeIndeks === 2) {
            divs.push(<div className="lastestripe lastestripe__lang_forsinkelse lastestripe__smal" key={index} />);
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

    return <div className={`lastestriper ${props.className && props.className}`}>{lastestriper(linjer)}</div>;
};
