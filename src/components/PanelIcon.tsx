import styled from 'styled-components';

const StyledPanelIcon = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    transform: translateY(-70%);
    margin-bottom: -2rem;

    img {
        width: 3rem;
        height: 3rem;
    }
`;

const IconImage = styled.div`
    display: flex;
    flex: 1;
    background-color: #9bd0b0;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    height: 5rem;
    max-width: 5rem;
    min-width: 5rem;
`;

export const PanelIcon = (props: { imageUrl?: string }) => (
    <>
        {props.imageUrl && (
            <StyledPanelIcon>
                <IconImage>
                    <img src={props.imageUrl} alt="" />
                </IconImage>
            </StyledPanelIcon>
        )}
    </>
);
