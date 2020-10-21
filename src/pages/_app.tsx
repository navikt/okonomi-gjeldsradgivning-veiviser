import { AppProps, NextWebVitalsMetric } from 'next/app';
import '../index.less';

export function reportWebVitals(metric: NextWebVitalsMetric) {
    console.log(metric);
}

const CustomApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default CustomApp;
