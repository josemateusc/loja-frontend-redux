import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, NavbarBrand } from "reactstrap";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/api.slice.login";
import { NavItem, NavLink } from "react-bootstrap";
import "./styles/navbar.css";

export default function NavBarCustom() {
  const navigate = useNavigate();

  const { isAdmin } = useSelector((state: RootState) => state.apiLogin);
  const dispatch = useDispatch();

  function Logout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div>
      <Navbar className="navbar">
        <div className="navbar-brand">Loja Online</div>
        <div className="navbar-items">
          <NavItem onClick={() => navigate("/home")}>
            <NavLink className="nav-link">Produtos</NavLink>
          </NavItem>
          {/* SE USUARIO ISADMIN MOSTRA OPÇÃO DO CARRINHO */}
          {!isAdmin ? (
            <NavItem onClick={() => navigate("/cart")}>
              <NavLink className="nav-link">Carrinho</NavLink>
            </NavItem>
          ) : null}
          <NavItem onClick={() => Logout()}>
            <NavLink className="nav-link">Logout</NavLink>
          </NavItem>
        </div>
      </Navbar>
    </div>
  );
}
