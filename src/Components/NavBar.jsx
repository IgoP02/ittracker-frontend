import logo from "../assets/invecem_logo.png";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Image, Menu } from "semantic-ui-react";
import { LoginContext } from "../main";
import LogPopup from "./LogPopup";
import {
  deleteToken,
  getToken,
  removeLogged,
  removeName,
  removeUserName,
} from "./utils/manageLogin";
import axios from "axios";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(location.pathname.split("/")[1] || "home");
  useEffect(() => {
    console.log(loggedIn);
  }, []);

  function handleItemClick(e, { name }) {
    if (!loggedIn && name == "admin") {
      setActiveItem(location.pathname.split("/")[1] || "home");
      return;
    }
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
    setLoggedIn();
    removeUserName();
    removeName();
    removeLogged();
    deleteToken();
    setActiveItem("home");
    navigate("/", true);
  }
  function toggleModal() {
    setIsModalOpen(true);
  }
  const UserGreeting = () => {
    if (loggedIn) {
      const message =
        loggedIn.username != "admin" && loggedIn.name ? (
          <>
            Bienvenido/a, <span style={{ fontWeight: "bold" }}> {loggedIn.name} </span>
          </>
        ) : (
          <span style={{ opacity: "0.5" }}>Sesión de administrador</span>
        );
      return (
        <Menu.Item name="loggedUser">
          <p style={{ fontSize: "1.1em" }}>{message}</p>
        </Menu.Item>
      );
    }
  };
  return (
    <>
      <LogPopup isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <Menu fixed="top" size="small" color="grey" borderless>
        <Container>
          <Menu.Item header>
            <Image size="mini" src={logo} />
            <b>ITTracker</b>
          </Menu.Item>
          <Menu.Item
            name="home"
            to="/"
            active={activeItem === "home"}
            as={Link}
            onClick={handleItemClick}>
            Inicio
          </Menu.Item>
          <Menu.Item
            disabled={!loggedIn}
            name="admin"
            to={loggedIn && "admin"}
            active={activeItem === "admin"}
            as={Link}
            onClick={handleItemClick}>
            Administración
          </Menu.Item>
          <Menu.Item name="logItem" style={{ marginRight: "1em" }} position="right">
            <Button
              name="logItem"
              icon={loggedIn ? { name: "sign out", size: "large" } : null}
              content={loggedIn ? "Cerrar Sesión" : "Iniciar Sesión"}
              color={loggedIn ? "red" : "blue"}
              style={{ borderRadius: "2px" }}
              onClick={loggedIn ? handleLogOut : toggleModal}
            />
          </Menu.Item>
          {<UserGreeting />}
        </Container>
      </Menu>
    </>
  );
}

export default NavBar;
