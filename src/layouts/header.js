import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { RiLogoutCircleRLine } from "react-icons/ri";
import Cookies from 'js-cookie';

const Header = () => {

  let icons = [
    { icon: RiLogoutCircleRLine, size: 25, color: "red", name: 'logout' }
  ];

  const handleLogout = () => {
    Cookies.remove('assessment_route');
    Cookies.remove('assessment_token');
    window.location.href = '/login'
  };

  return (
    <>
      <Navbar
        expand="lg"
        style={{
          height: "75px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0px 35px 0px 35px",
          backgroundColor: '#add8e65e'
        }}
      >
        {Cookies.get('assessment_token') &&
          <div>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                style={{
                  width: "500px",
                  display: "flex",
                  alignItems: "center",
                  gap: "2%",
                  justifyContent: "flex-end",
                }}
              >
                {icons.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.to}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      key={index}
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => {
                        if (item?.name === 'logout') {
                          handleLogout()
                        }
                      }}
                    >
                      {React.createElement(item.icon, {
                        size: item.size,
                        style: { color: item.color, backgroundColor: item.bgColor },
                      })}
                    </div>
                  </NavLink>
                ))}
              </Nav>
            </Navbar.Collapse>
          </div>
        }
      </Navbar>
    </>
  );
};

export default Header;
