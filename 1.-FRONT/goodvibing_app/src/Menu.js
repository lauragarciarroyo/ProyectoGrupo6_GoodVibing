import { useState } from "react";

function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>☰</button>
      {open && (
        <div className="modal-bg">
          <div className="modal-fg">
            <li> Tus datos</li>
            <li> Tus historias</li>
            <li> Tus mensajes</li>
            <li> Cerrar sesión</li>
            <button onClick={() => setOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
