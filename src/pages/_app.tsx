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
    const video = router.query['video'];

    useEffect(() => {
        initAmplitude();
    }, []);

    useEffect(() => {
        if (kommerFra && video) {
            logAmplitudeEvent('sidevisning', { kommerFra, video });
        }
    }, [kommerFra, video]);

    return <Component {...pageProps} />;
};

export default CustomApp;
