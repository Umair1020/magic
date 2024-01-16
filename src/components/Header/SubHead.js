import React, { useRef, useState, useEffect } from "react";
import "./SubHead.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useLocation, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import logo from "../../assets/2.svg";

const SubHead = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const fileInputRef = useRef();
  const [modelVisible, setModelVisible] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(null);
  const userCookie = Cookies.get("user");
  const decodedToken = jwtDecode(userCookie);
  const user = userCookie ? decodedToken : null;
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const isMobile = window.innerWidth <= 767; // Directly check window width

  const Desktop = ({ children }) => {
    const isDesktop = window.innerWidth >= 777; // Directly check window width
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = window.innerWidth <= 767; // Directly check window width
    return isMobile ? children : null;
  };

  const customStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    appearance: "none",
    position: "relative",
    cursor: "pointer",
    textAlign: "center",
    lineHeight: "normal",
    whiteSpace: "nowrap",
    margin: "0px",
    padding: "10px 12px",
    color: "rgb(255, 255, 255)",
    background: "#754ddf",
    fontFamily: "var(--sans)",
    fontWeight: 500,
    fontStyle: "normal",
    marginLeft: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const location = useLocation();
  const currentPath = location.pathname;

  const shouldHideLink = currentPath === "/Document";

  const logout = () => {
    // Get all cookies
    const cookies = document.cookie.split(";");

    // Iterate through each cookie and remove it
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

      // Remove the cookie by setting its expiration date to the past
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    });

    // Remove the client-side cookie
    Cookies.remove("user");

    // Call the function to clear all cookies
    window.location.reload();
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const [uploadedPdf, setUploadedPdf] = useState(null);

  const openModel = () => {
    setModelVisible(true);
  };

  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    setPdfDoc(selectedFile);

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setUploadedPdf(url);
    }

    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select a valid PDF file");
      }
    } else {
      // console.log("Select your file");
    }
  };

  return (
    <>
      <Desktop>
        <div className="sc-67c87563-0 fQOOHf">
          <div className="sc-67c87563-1 bVtJuo">
            <div className="sc-67c87563-2 bsuEPg">
              <Link className="sc-67c87563-3 dQhaIx">
                <Link to="/">
                  <img src={logo} style={{ width: "150px" }} />
                </Link>
              </Link>
            </div>
            <div className="sc-67c87563-2 bsuEPg">
              <div style={{ display: "flex" }}>
                <div className="sc-67c87563-5 hRobpf">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept=".pdf"
                    onChange={handlePdfFileChange}
                  />
                </div>
                <Link to="/price">
                  <button style={customStyles}>✨ Upgrade</button>
                </Link>
                {!shouldHideLink && (
                  <Link to="/" className="font">
                    <img src="/icons8-home.svg" style={{ height: "20px" }} />
                  </Link>
                )}
                <Link to="/">{user?.Name}</Link>
                <div className="profile-pic" onClick={toggleDropdown}>
                  {user.Name.charAt(0)}
                </div>
                {isDropdownOpen && (
                  <div className="dropdown">
                    <button onClick={logout}>Logout</button>
                    <Link to="/price"></Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Desktop>
      <Mobile>
        <div className="sc-67c87563-0 fQOOHf">
          <div className="sc-67c87563-1 bVtJuo">
            <div className="sc-67c87563-2 bsuEPg">
              <Link className="sc-67c87563-3 dQhaIx">
                <Link to="/">
                  <img
                    src={shouldHideLink ? logo : "/icons8-home.svg"}
                    alt={shouldHideLink ? "Home Icon" : "Logo"}
                    style={{ height: "20px", paddingLeft: "10px" }}
                  />
                </Link>
              </Link>
            </div>
            <div className="sc-67c87563-2 bsuEPg">
              <div style={{ display: "flex" }}>
                <div className="sc-67c87563-5 hRobpf">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept=".pdf"
                    onChange={handlePdfFileChange}
                  />
                </div>

                {!shouldHideLink && (
                  <Link to="/" className="font">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>{" "}
                  </Link>
                )}
                <div className="profile-pic" onClick={toggleDropdown}>
                  {user.Name.charAt(0)}
                </div>
                {isDropdownOpen && (
                  <div className="dropdown">
                    <Link>{user?.Name}</Link>
                    <button onClick={logout}>Logout</button>
                    <Link to="/price">
                      <button style={customStyles}>✨ Upgrade</button>
                    </Link>
                  </div>
                )}
              </div>
             
            </div>
          </div>
        </div>
    
      </Mobile>
    </>
  );
};

export default SubHead;
