import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Innholdstittel } from 'nav-frontend-typografi';
import Link from 'next/link';

import { SanityLinkPanel } from '../sanityDocumentTypes';
import { SanityBlockContent } from './SanityBlockContent';

export const LinkPanel = (props: { linkPanel: SanityLinkPanel }) => (
    <LenkepanelBase
        href={`/artikkel/${props.linkPanel.slug}`}
        linkCreator={(linkProps) => (
            <Link href="/artikkel/[slug]" as={linkProps.href}>
                <a className="lenkepanel section-panel section-panel__frontpage" style={{ cursor: 'pointer' }}>
                    {props.linkPanel.iconUrl && (
                        <div className="section-panel__image">
                            <img className="section-panel__icon" alt="" src={props.linkPanel.iconUrl} />
                        </div>
                    )}

                    <div>
                        <Innholdstittel className="lenkepanel__heading">{props.linkPanel.title}</Innholdstittel>
                        <SanityBlockContent blocks={props.linkPanel.description} />
                    </div>
                    <span className="lenkepanel__indikator" />
                </a>
            </Link>
        )}
    >
        <></>
    </LenkepanelBase>
);
