import { Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import { HeaderIcon } from '../icons/HeaderIcon';

export const PageBanner = (props: { isFrontPage: boolean }) => {
    const bannerClassNames = `banner ${props.isFrontPage ? 'banner-frontpage' : 'banner-other'}`;
    const bannerTitle = 'Økonomi- og gjeldsrådgivning';
    return (
        <div className={bannerClassNames}>
            <div className="banner-content">
                {props.isFrontPage ? (
                    <Sidetittel>{bannerTitle}</Sidetittel>
                ) : (
                    <Systemtittel>{bannerTitle}</Systemtittel>
                )}
                {props.isFrontPage && <HeaderIcon className="banner-content-icon" />}
            </div>
        </div>
    );
};
