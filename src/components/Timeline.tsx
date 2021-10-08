import { BodyShort, Label } from '@navikt/ds-react';
import styled from 'styled-components';

import { digisosColors } from '../utils/colors';
import { SanityBlockContent } from './SanityBlockContent';

const TimelineList = styled.ol`
    list-style-type: none;
    margin: 0;
    padding: 0;
    padding-bottom: 0.5rem;
`;

const TimelineItem = styled.li`
    position: relative;
    padding-left: 2rem;
    padding-bottom: 0.5rem;

    :last-child {
        padding-bottom: 0;
    }

    :before {
        content: '';
        position: absolute;
        height: 1.3rem;
        width: 1.3rem;
        left: 0px;
        border: 0.21rem solid ${digisosColors.digisosLysGronn};
        border-radius: 50%;
    }

    :after {
        content: '';
        position: absolute;
        height: calc(100% - 1.3rem);
        top: 1.3rem;
        left: 0.56rem;
        border-left: 0.21rem solid ${digisosColors.digisosLysGronn};
    }
`;

export const Timeline = (props: { elements: { title: string; body: Record<string, unknown>[] }[] }) => {
    return (
        <TimelineList>
            {props.elements.map((element) => {
                return (
                    <TimelineItem key={element.title}>
                        <Label spacing>{element.title}</Label>
                        <SanityBlockContent blocks={element.body} />
                    </TimelineItem>
                );
            })}
        </TimelineList>
    );
};
