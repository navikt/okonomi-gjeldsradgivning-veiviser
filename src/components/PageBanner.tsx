import { Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import { HeaderIcon } from '../icons/HeaderIcon';

export const PageBanner = (props: { isFrontPage: boolean }) => {
    const bannerClassNames = `banner ${props.isFrontPage ? 'banner__frontpage' : 'banner__article'}`;
    const bannerTitle = 'Økonomi- og gjeldsrådgivning';
    return (
        <div className={bannerClassNames}>
            <div className="banner-content">
                {props.isFrontPage ? (
                    <Sidetittel tag="h1">{bannerTitle}</Sidetittel>
                ) : (
                    <Systemtittel tag="h1">{bannerTitle}</Systemtittel>
                )}
                {props.isFrontPage && <HeaderIcon className="banner-content-icon" />}
            </div>
        </div>
    );
};
