import React from "react";
import { Menu, Button } from "semantic-ui-react";
import logo from "../../../../public/assets/images/logo/logo.webp"; // adjust path as needed

const Header = ({ promptEvent, isAppInstalled, installApp }) => {
  return (
    <Menu
      stackable
      style={{
        backgroundColor: "#174267",
        color: "white",
        height: "80px",
        padding: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Logo Section */}
      <Menu.Item header style={{ padding: 0}}>
        <a href="https://ft.education/" target="_blank" rel="noopener noreferrer">
          <img
            src={logo}
            alt="App Logo"
            style={{
              height: "100%",
              objectFit: "contain",
            }}
          />
        </a>
      </Menu.Item>

      {/* Install App Button */}
      {promptEvent && !isAppInstalled && (
        <Menu.Item position="right">
          <Button
            color="teal"
            icon="download"
            labelPosition="left"
            content="Install App"
            onClick={installApp}
          />
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
