import React from "react";

function Avatar(props) {
  const { name } = props;
  const letter = name ? name.charAt(0) : "";
  return (
    <div className="avatar">
      <span>{letter}</span>
    </div>
  );
}

export default Avatar;
