import Panel from 'nav-frontend-paneler';
import styled from 'styled-components';

const StyledSectionPanel = styled(Panel)`
    margin-bottom: 2rem;
    position: relative;

    .typo-normal,
    p {
        margin-bottom: 0.875rem;
    }

    .typo-ingress {
        margin-block-start: 1rem;
        margin-block-end: 1rem;
    }

    h1,
    .typo-innholdstittel {
        margin: 0.5rem 0 1rem;
    }

    h2,
    h3,
    h4,
    .typo-undertittel {
        margin: 1.75rem 0 0.6875rem;
    }
`;

export const SectionPanel = (props: { id?: string; className?: string; children }) => {
    return (
        <StyledSectionPanel id={props.id} className={props.className}>
            {props.children}
        </StyledSectionPanel>
    );
};
