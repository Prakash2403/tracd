import { useState } from "react";
import { Dropdown } from "../dropdown";

export const DropdownGroup = (props) => {
  const [openedDropdownId, setOpenedDropdownId] = useState(0);

  return (
    <>
      {props.dropdownValues.map((item) => (
        <Dropdown
          {...item}
          openedDropdownId={openedDropdownId}
          setOpenedDropdownId={setOpenedDropdownId}
        ></Dropdown>
      ))}
    </>
  );
};
