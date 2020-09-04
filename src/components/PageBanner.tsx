import { Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import { HeaderIcon } from '../icons/HeaderIcon';

export const PageBanner = (props: { isFrontPage: boolean; title: string; iconUrl: string }) => {
    const bannerClassNames = `banner ${props.isFrontPage ? 'banner__frontpage' : 'banner__article'}`;
    return (
        <div className={bannerClassNames}>
            <div className="banner-content">
                {props.isFrontPage ? (
                    <Sidetittel tag="h1">{props.title}</Sidetittel>
                ) : (
                    <Systemtittel tag="h1">{props.title}</Systemtittel>
                )}
                {props.isFrontPage && <img alt="" src={props.iconUrl} className="banner-content-icon" />}
            </div>
        </div>
    );
};
