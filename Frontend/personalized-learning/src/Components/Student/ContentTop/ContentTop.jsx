import { iconsImgs } from "../../../utils/images";
import "./ContentTop.css";
import { useContext } from "react";
import { SidebarContext } from "../../../context/sidebarContext";

const ContentTop = () => {
  const { toggleSidebar } = useContext(SidebarContext);

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear auth tokens, redirect to login page)
    console.log("Logging out...");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="main-content-top">
        <div className="content-top-left">
            <button type="button" className="sidebar-toggler" onClick={() => toggleSidebar() }>
                <img src={ iconsImgs.menu } alt="" />
            </button>
            </div>
        <button className="logout-button" onClick={handleLogout}>Logout </button>

    </div>
  )
}

export default ContentTop
