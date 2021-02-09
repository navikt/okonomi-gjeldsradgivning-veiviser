import Panel from 'nav-frontend-paneler';
import styled from 'styled-components';

const StyledSectionPanel = styled(Panel)`
    margin-bottom: 2rem;
    position: relative;
`;

export const SectionPanel = (props: { frontPage?: boolean; children }) => {
    return <StyledSectionPanel>{props.children}</StyledSectionPanel>;
};
