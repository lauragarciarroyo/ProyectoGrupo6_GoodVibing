import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";

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
                <Button
                  href="/changepassword"
                  color="secondary"
                  activeClassName="active"
                >
                  Mis datos
                </Button>{" "}
                <p />
                <Button
                  href="/mystories"
                  activeClassName="active"
                  color="secondary"
                >
                  Mis historias
                </Button>
                <p />
                <Button
                  href="/message"
                  activeClassName="active"
                  color="secondary"
                >
                  Mis mensajes
                </Button>
                <p />
                <Button onClick={() => closeSession()}>Cerrar sesión</Button>
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
