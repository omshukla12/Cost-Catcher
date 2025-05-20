import React from "react";

const NewAvatar = ({ name, size, round, color }) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center text-white ${
        round ? "rounded-full" : ""
      }`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color || "#6B46C1",
      }}
    >
      <span className="text-sm font-medium">{initials}</span>
    </div>
  );
};

export default NewAvatar;
