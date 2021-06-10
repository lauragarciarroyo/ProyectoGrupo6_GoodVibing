import { useState } from "react";
import { NavLink } from "react-router-dom";
//import Profile from "./Profile";
//import Stories from "./Stories";
//import Messages from "./Message";
//import "./Menu.css";

function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>☰</button>
      {open && (
        <div className="modal-bg">
          <div className="modal-fg">
            <li>
              <NavLink to="/profile" activeClassName="active" exact>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/stories" activeClassName="active" exact>
                Stories
              </NavLink>
            </li>
            <li>
              <NavLink to="/message" activeClassName="active" exact>
                Message
              </NavLink>
            </li>

            <li> Cerrar sesión</li>
            <button onClick={() => setOpen(false)}>X</button>
          </div>
        </div>
      )}
      <div>
        <li>
          <NavLink to="/home" activeClassName="active" exact>
            Home
          </NavLink>
        </li>
      </div>
    </>
  );
}

export default Menu;
