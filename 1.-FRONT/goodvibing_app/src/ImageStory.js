import React from "react";

export default function ImageStory({ src }) {
  return <image src={`http://localhost:4000/images/${src}`} />;
}
