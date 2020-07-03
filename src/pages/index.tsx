import {Sidetittel} from "nav-frontend-typografi";
import Panel from "nav-frontend-paneler";

const Home = (props) => {
    return (
        <>
            <Panel className="seksjon-panel">
                <Sidetittel>Økonomi- og gjeldsrådgivning</Sidetittel>
            </Panel>
            <p>Her er det noe innhold</p>
        </>
    );
};

export default Home;
