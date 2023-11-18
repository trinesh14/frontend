import React from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Popularvideos from "../popular_video/popuplar_video";
const Home = () => {
    return (
        <div>
            <>
                <Banner />
                <Popularvideos/>
            </>
        </div>
    );
};

export default Home;
