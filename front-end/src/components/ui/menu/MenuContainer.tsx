import { useState } from "react";
import DropDownButton from "./DropDownButton";
import DropDownList from "./DropDownList";

type Props = {
  className?: string;
};

export default function MenuContainer({ className }: Props) {
  const [showDropDown, setShowDropDown] = useState(false);

  function toggleDropdown() {
    setShowDropDown(!showDropDown);
  }

  return (
    <div className={`relative w-40  ${className}`}>
      <DropDownButton
        toggleDropdown={toggleDropdown}
        isDropdownOpen={showDropDown}
      />
      <DropDownList
        isDropDownOpen={showDropDown}
        toggleDropdown={toggleDropdown}
      />
    </div>
  );
}
