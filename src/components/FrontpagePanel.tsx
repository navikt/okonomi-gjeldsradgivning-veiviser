import Panel from 'nav-frontend-paneler';
import styled from 'styled-components';

export const FrontpagePanel = styled(Panel)`
    max-width: 58.25rem;
    padding: 2rem 2rem 1rem 2rem !important;
    margin-bottom: 2rem;
    position: relative;

    h2 {
        margin: 1.75rem 0 0.6875rem;
    }

    .typo-normal {
        margin-block-start: 0.5rem;
        margin-block-end: 0.5rem;
    }

    .typo-ingress {
        margin-block-start: 1rem;
        margin-block-end: 1rem;
    }

    .typo-undertittel {
        margin-block-start: 1rem;
    }

    .typo-innholdstittel {
        margin-block-end: 1rem;
    }
`;
