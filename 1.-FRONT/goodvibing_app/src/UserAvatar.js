import React from "react";
import { Avatar } from "@material-ui/core";

export default function UserAvatar({ src }) {
  return <Avatar src={`http://localhost:4000/images/${src}`} />;
}
