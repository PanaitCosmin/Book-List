import React from "react";
import AddButton from "./AddButton";

const Header = ({className}) => {
  return (
    <div className={className}>
      <h1 className="text-3xl my-8">Book List</h1>

      <AddButton />
    </div>
  );
};

export default Header;
