import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import Fuse from "fuse.js";

import { useComponentVisible } from "./useComponentVisible";

const SelectedItem = ({ item }) => (
  <div className="font-bold flex">
    <span className="mr-2 text-yellow-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </span>
    {item}
  </div>
);

export default function AutocompleteDropDown({
  listValues,
  label,
  displayProp,
  selected,
  setSelected,
}) {
  const { ref, isComponentVisible } = useComponentVisible(false);
  const handleChange = (item) => {
    const newValue = selected.includes(item)
      ? selected.filter((v) => v[displayProp] !== item[displayProp])
      : selected.concat(item);
    setSelected(newValue);
  };

  const [valuesToShow, setValuesToShow] = useState(listValues);

  const options = {
    keys: [displayProp],
  };
  const fuse = new Fuse(listValues, options);

  const handleInputChange = (e) => {
    if (
      e.target.value === "" ||
      e.target.value === null ||
      e.target.value === undefined
    )
      setValuesToShow(listValues);
    else {
      const result = fuse.search(e.target.value);
      setValuesToShow(result.map((l) => l.item));
    }
  };

  useEffect(() => {
    setValuesToShow(listValues);
  }, [listValues]);

  return (
    <div>
      <div ref={ref}>
        <Listbox value={selected} onChange={handleChange}>
          <div>
            <Listbox.Label> {label} </Listbox.Label>
            <div>
              <input
                type="search"
                placeholder="Search"
                className="p-3 border-2 rounded-lg w-full"
                onChange={handleInputChange}
              />
            </div>
            {isComponentVisible && (
              <Listbox.Options className="border-2 rounded-lg" static>
                {valuesToShow.map((value, idx) => (
                  <Listbox.Option
                    key={idx}
                    value={value}
                    className="p-2 hover:bg-gray-200"
                  >
                    {selected.includes(value) ? (
                      <SelectedItem item={value[displayProp]} />
                    ) : (
                      value[displayProp]
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </div>
        </Listbox>
      </div>
    </div>
  );
}
