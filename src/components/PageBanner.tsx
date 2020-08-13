import { Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import { HeaderIcon } from '../icons/HeaderIcon';

export const PageBanner = (props: { title: string; isFrontPage: boolean }) => {
    const bannerClassNames = `banner ${props.isFrontPage ? 'banner-frontpage' : 'banner-other'}`;
    return (
        <div className={bannerClassNames}>
            <div className="banner-content">
                {props.isFrontPage ? (
                    <Sidetittel>{props.title}</Sidetittel>
                ) : (
                    <Systemtittel>{props.title}</Systemtittel>
                )}
                {props.isFrontPage && <HeaderIcon className="banner-content-icon" />}
            </div>
        </div>
    );
};
