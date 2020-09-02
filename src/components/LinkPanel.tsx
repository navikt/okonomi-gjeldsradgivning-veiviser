import Link from 'next/link';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Innholdstittel } from 'nav-frontend-typografi';
import MediaQuery from 'react-responsive';

import { SanityBlockContent } from './SanityBlockContent';
import { SanityLinkPanel } from '../sanityDocumentTypes';

export const LinkPanel = (props: { linkPanel: SanityLinkPanel }) => (
    <LenkepanelBase
        href={`/articles/${props.linkPanel.slug}`}
        linkCreator={(linkProps) => (
            <Link href="/articles/[slug]" as={linkProps.href}>
                <div className={`section-panel section-panel__noIcon lenkepanel`} style={{ cursor: 'pointer' }}>
                    {props.linkPanel.iconUrl && (
                        <MediaQuery minWidth={376}>
                            <div className="section-panel__image">
                                <img className="section-panel__icon" alt="" src={props.linkPanel.iconUrl} />
                            </div>
                        </MediaQuery>
                    )}

                    <div>
                        <Innholdstittel>{props.linkPanel.title}</Innholdstittel>
                        <SanityBlockContent blocks={props.linkPanel.description} />
                    </div>
                    <span className="lenkepanel__indikator" />
                </div>
            </Link>
        )}
    />
);
