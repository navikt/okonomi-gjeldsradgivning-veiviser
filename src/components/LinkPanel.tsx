import Link from 'next/link';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Innholdstittel } from 'nav-frontend-typografi';

import { SanityBlockContent } from './SanityBlockContent';
import { SanityLinkPanel } from '../sanityDocumentTypes';

export const LinkPanel = (props: { linkPanel: SanityLinkPanel }) => (
    <LenkepanelBase
        href={`/articles/${props.linkPanel.slug}`}
        linkCreator={(linkProps) => (
            <Link href="/articles/[slug]" as={linkProps.href}>
                <a
                    className="lenkepanel lenkepanel-border section-panel section-panel__noIcon"
                    style={{ cursor: 'pointer' }}
                >
                    {props.linkPanel.iconUrl && (
                        <div className="section-panel__image">
                            <img className="section-panel__icon" alt="" src={props.linkPanel.iconUrl} />
                        </div>
                    )}

                    <div>
                        <Innholdstittel>{props.linkPanel.title}</Innholdstittel>
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
