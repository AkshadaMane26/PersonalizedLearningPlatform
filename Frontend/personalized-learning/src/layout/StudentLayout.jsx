import React, { useContext, useEffect, useState } from "react";
import ContentTop from "../Components/Student/ContentTop/ContentTop";
import Sidebar from "../layout/Sidebar/Sidebar";
import { SidebarProvider, SidebarContext } from "../context/sidebarContext";
import './layout.css';

const StudentLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
};

const LayoutContent = ({ children }) => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const [sidebarWidth, setSidebarWidth] = useState(260);

  

  // Function to update sidebar width based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setSidebarWidth(0); // Below 400px, sidebar should not take space
      } else if (window.innerWidth < 1200) {
        setSidebarWidth(30); // Between 400px and 1200px, sidebar is 30px
      } else {
        setSidebarWidth(260); // Above 1200px, sidebar is 260px
      }
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="student-layout">
      <ContentTop />
      <div className="main-content">
        <Sidebar />
        <div 
          className="content-area"
          style={{ marginLeft: isSidebarOpen ? "0" : `${sidebarWidth}px` }} 
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
