import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import axios from "axios";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { AiOutlineHeart } from "react-icons/ai";
import "./Header.scss";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import {Link} from 'react-router-dom'

const checkSession = () => {
    const userData = localStorage.getItem('user');
    const isAuthenticated = !!userData; // Double negation to convert to boolean
    return isAuthenticated;
  };
const isAuthenticated = checkSession();
const logout = async evt => {
    const postData = {

      };
    try {
        // Make the Axios POST request
        // const response = await axios.post('/api/user/register', postData);
        const response = await axios.post('http://localhost:5000/api/user/logout', postData);
        // Handle the response as needed (e.g., show a success message)
        alert(response.data.message)
        if (response.data.success) {
          // Redirect to the other page upon successful login
          // eslint-disable-next-line no-restricted-globals
            localStorage.removeItem('user');
        //   history('/');
        window.location.reload();
        
        }
       
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('Error:', error);
        alert(error.response.data.message)
      }
}
const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const navigate = useNavigate();
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    const {setShowCart } = useContext(Context);

    return (
        <>
            <header
                className={`main-header ${scrolled ? "sticky-header" : ""}`}
            >
                <div className="header-content">
                    <ul className="left">
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/about")}>About</li>
                        <li>Categories</li>
                    </ul>
                    <div className="center" onClick={() => navigate("/")}>
                         Video Songs 
                    </div>
                    <div className="right">
                    <TbSearch onClick={() => setSearchModal(true)} />
                    {isAuthenticated? (<Link to="/" className="cl-w" onClick={logout}>LogOut</Link>):(<Link to="/login" className="cl-w">Login/Signup</Link>)
                    }
                        
                        
                        <span
                            className="cart-icon"
                            onClick={() => setShowCart(true)}
                        >
                        </span>
                        
                    </div>
                </div>
            </header>
            {searchModal && <Search setSearchModal={setSearchModal} />}
        </>
    );
};

export default Header;
