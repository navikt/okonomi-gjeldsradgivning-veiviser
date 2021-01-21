// Hindrer crash ved server-side kjøring (amplitude.js fungerer kun i browser)
const amplitude = typeof window !== 'undefined' ? require('amplitude-js') : () => null;

export const initAmplitude = () => {
    if (amplitude) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
        });
    }
};

export function logAmplitudeEvent(eventName: string, eventData?: any): void {
    console.log(eventName, eventData);
    setTimeout(() => {
        try {
            if (amplitude) {
                amplitude.getInstance().logEvent(eventName, eventData);
            }
        } catch (error) {
            console.error(error);
        }
    });
}
