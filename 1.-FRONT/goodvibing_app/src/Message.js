import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function Message() {
  const user = useSelector((state) => state.user);

  if (!user) return <Redirect to="/" />;

  return (
    <div className="message">
      <h1>Tus mensajes</h1>
    </div>
  );
}
export default Message;
