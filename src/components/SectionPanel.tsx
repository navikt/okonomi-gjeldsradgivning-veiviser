import Panel from 'nav-frontend-paneler';
import styled from 'styled-components';

const StyledSectionPanel = styled(Panel)`
    margin-bottom: 2rem;
    position: relative;

    .typo-normal {
        margin-block-start: 0.5rem;
        margin-block-end: 0.5rem;
    }

    .typo-ingress {
        margin-block-start: 1rem;
        margin-block-end: 1rem;
    }

    .typo-innholdstittel {
        margin-block-end: 1rem;
    }

    .typo-undertittel {
        margin-block-start: 1rem;
    }
`;

export const SectionPanel = (props: { id?: string; className?: string; children }) => {
    return (
        <StyledSectionPanel id={props.id} className={props.className}>
            {props.children}
        </StyledSectionPanel>
    );
};
