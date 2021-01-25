import '../index.less';

import { AppProps, NextWebVitalsMetric } from 'next/app';
import { useEffect } from 'react';

import { initAmplitude } from '../utils/amplitude';

export function reportWebVitals(metric: NextWebVitalsMetric) {
    console.log(metric);
}

const CustomApp = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        initAmplitude();
    }, []);

    return <Component {...pageProps} />;
};

export default CustomApp;
