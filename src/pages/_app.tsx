import '@navikt/ds-css';

import { AppProps, NextWebVitalsMetric } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { initAmplitude, logAmplitudeEvent } from '../utils/amplitude';

export function reportWebVitals(metric: NextWebVitalsMetric) {
    console.log(metric);
}

const CustomApp = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const kommerFra = router.query['kommerFra'];

    useEffect(() => {
        initAmplitude();
    }, []);

    useEffect(() => {
        if (kommerFra) {
            logAmplitudeEvent('sidevisning', { kommerFra });
        }
    }, [kommerFra]);

    return <Component {...pageProps} />;
};

export default CustomApp;
