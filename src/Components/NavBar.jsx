import logo from "../assets/invecem_logo.png";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Image, Menu } from "semantic-ui-react";
import { LoginContext } from "../main";
import LogPopup from "./LogPopup";
import { deleteToken, getToken, removeLogged, removeUserName } from "./utils/manageLogin";
import axios from "axios";

function NavBar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  function handleItemClick(e, { name }) {
    setActiveItem(name);
    console.log(name);
  }

  function handleLogOut() {
    axios.get("http://api.ittracker.test/api/logout", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: "Application/json",
      },
    });
    setLoggedIn(false);
    removeUserName();
    removeLogged();
    deleteToken();
    navigate("/", true);
  }
  function toggleModal() {
    setIsModalOpen(true);
  }

  return (
    <>
      <LogPopup isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <Menu fixed="top" size="small" color="grey" borderless>
        <Container>
          <Menu.Item header>
            <Image size="mini" src={logo} />
            ITTracker
          </Menu.Item>
          <Menu.Item
            name="home"
            to="/"
            active={activeItem === "home"}
            as={Link}
            onClick={handleItemClick}>
            Home
          </Menu.Item>
          <Menu.Item
            name="Admin"
            to="admin"
            active={activeItem === "Admin"}
            as={Link}
            onClick={handleItemClick}>
            Admin
          </Menu.Item>
          <Menu.Item name="logItem" style={{ marginRight: "10px" }} position="right">
            <Button
              name="logItem"
              content={loggedIn ? "Log Out" : "Log In"}
              color={loggedIn ? "red" : "blue"}
              style={{ borderRadius: "1px" }}
              S
              onClick={loggedIn ? handleLogOut : toggleModal}
            />
          </Menu.Item>
        </Container>
      </Menu>
    </>
  );
}

export default NavBar;
