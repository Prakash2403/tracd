import { useState, useEffect, useMemo } from "react";
import { Listbox } from "@headlessui/react";
import { Index } from "flexsearch";

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
  numHitsToShow = 20,
}) {
  const { ref, isComponentVisible } = useComponentVisible(false);
  const handleChange = (item) => {
    const newValue = selected.includes(item)
      ? selected.filter((v) => v[displayProp] !== item[displayProp])
      : selected.concat(item);
    setSelected(newValue);
  };

  const [valuesToShow, setValuesToShow] = useState(listValues);

  const index = useMemo(() => {
    const options = {
      tokenize: "forward",
      cache: 1000,
    };
    let idx = new Index(options);
    listValues.forEach((v, i) => {
      idx.add(i, v[displayProp]);
    });
    return idx;
  }, [listValues, displayProp]);

  const handleInputChange = (e) => {
    if (
      e.target.value === "" ||
      e.target.value === null ||
      e.target.value === undefined
    )
      setValuesToShow(
        [...selected, ...listValues.filter((l) => !selected.includes(l))].slice(
          0,
          numHitsToShow
        )
      );
    else {
      const result = index.search(e.target.value);
      console.log(result);
      setValuesToShow(
        [
          ...selected,
          ...result
            .map((l) => listValues[l])
            .filter((l) => !selected.includes(l)),
        ].slice(0, numHitsToShow)
      );
    }
  };

  useEffect(() => {
    setValuesToShow(listValues.slice(0, numHitsToShow));
  }, [listValues, numHitsToShow]);

  return (
    <div>
      <div ref={ref}>
        <Listbox value={selected} onChange={handleChange}>
          <div>
            <Listbox.Label> {label} </Listbox.Label>
            <div>
              <input
                type="search"
                placeholder={
                  selected.map((s) => s[displayProp]).join(", ") || "Search"
                }
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
