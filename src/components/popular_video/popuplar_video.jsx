import "./Products.scss";
import VideoList from "./videoplayer";
// import BannerImg from "../../../assets/banner-img.png";
// import image from "../../assets/bg-home.jpg"

const Popularvideos = () => {
    return (
        <>
        <div className="products-container" style={{ margin: "10px"}}>
        <h1 style={{ margin: "30px"}}> Videos</h1>
        <div class="">
        <h2>Trending Videos</h2>
        <VideoList></VideoList>
        </div>
        </div>
        
        </>

       
    );
};

export default Popularvideos;
