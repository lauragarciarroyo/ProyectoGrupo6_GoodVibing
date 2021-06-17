import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Menu() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);

  const closeSession = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      {user && (
        <>
          <button onClick={() => setOpen(true)}>☰</button>
          {open && (
            <div className="modal-bg">
              <div className="modal-fg">
                <li>
                  <NavLink to="/profile" activeClassName="active" exact>
                    Mis datos
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mystories" activeClassName="active" exact>
                    Mis historias
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/message" activeClassName="active" exact>
                    Message
                  </NavLink>
                </li>
                <li onClick={() => closeSession()}>Cerrar sesión</li>
                <button onClick={() => setOpen(false)}>X</button>
              </div>
            </div>
          )}
        </>
      )}
      <ul>
        <li></li>
      </ul>
    </>
  );
}

export default Menu;
