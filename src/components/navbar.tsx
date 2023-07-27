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
  const dispatch = useDispatch();


  const { isAdmin } = useSelector((state: RootState) => state.apiLogin);
  const { produtos } = useSelector((state: RootState) => state.carrinho);

  function Logout() {
    dispatch(logout());
    navigate("/");
  }

  function quantidadeProduto() {
    let quant = 0;
    produtos.forEach(
      (item) => {
        quant += item.count;
      }
    )
    return quant;
  }

  return (
    <div>
      <Navbar className="navbar">
        <div onClick={() => navigate("/home")} className="navbar-brand">Loja Online</div>
        <div className="navbar-items">
          <NavItem onClick={() => navigate("/home")}>
            <NavLink className="nav-link">Produtos</NavLink>
          </NavItem>
          {/* SE USUARIO ISADMIN MOSTRA OPÇÃO DO CARRINHO */}
          {!isAdmin ? (
            <NavItem onClick={() => navigate("/cart")}>
              <NavLink className="nav-link">Carrinho ({quantidadeProduto()})</NavLink>
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
