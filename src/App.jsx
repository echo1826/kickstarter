import "./App.css";
import NavBar from "./components/navBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CampaignForm from "./pages/campaignForm";
import CampaignList from "./pages/campaignList";
import CampaignDetails from "./pages/campaignDetails";
import RequestForm from "./pages/requestForm";
import RequestList from "./pages/requestList";

function App() {
    return (
        <>
            <NavBar />
            <Router>
                <Routes>
                    <Route path="/" element={<CampaignList />} />
                    <Route path="/campaigns/new" element={<CampaignForm />} />
                    <Route
                        path="/campaigns/:campaignAddress"
                        element={<CampaignDetails />}
                    />
                    <Route
                        path="/campaigns/:campaignAddress/requests"
                        element={<RequestList />}
                    />
                    <Route
                        path="/campaigns/:campaignAddress/requests/new"
                        element={<RequestForm />}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
