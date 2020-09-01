export const PanelIcon = (props: { imageUrl?: string }) => (
    <>
        {props.imageUrl && (
            <div className="panel-icon">
                <div className="panel-icon__image">
                    <img src={props.imageUrl} alt="" />
                </div>
            </div>
        )}
    </>
);
