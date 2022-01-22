import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

const formatStr = (txt, maxLength) => {
  if (txt.length > maxLength) return txt.slice(0, maxLength) + "...";
  return txt;
};

export const Dropdown = ({
  listValues,
  label,
  dropdownId,
  openedDropdownId,
  setOpenedDropdownId,
  valueSetter,
  maxLength,
}) => {
  const [currSelectedValues, setCurrSelectedValues] = useState([]);
  const [isOpen, setIsOpen] = useState(dropdownId === openedDropdownId);

  function isSelected(value) {
    return currSelectedValues.find((el) => el === value) ? true : false;
  }

  function handleSelect(value) {
    if (!isSelected(value)) {
      const selectedValuesUpdated = [
        ...currSelectedValues,
        listValues.find((el) => el === value),
      ];
      setCurrSelectedValues(selectedValuesUpdated);
      valueSetter(selectedValuesUpdated);
    } else {
      handleDeselect(value);
    }
    setOpenedDropdownId(dropdownId);
  }

  function handleDeselect(value) {
    const selectedValuesUpdated = currSelectedValues.filter(
      (el) => el !== value
    );
    setCurrSelectedValues(selectedValuesUpdated);
    valueSetter(selectedValuesUpdated);
    setOpenedDropdownId(dropdownId);
  }

  return (
    <div>
      <Listbox
        as="div"
        className="space-y-1"
        value={currSelectedValues}
        onChange={(value) => handleSelect(value)}
        open={dropdownId === openedDropdownId}
      >
        {() => (
          <>
            <Listbox.Label className="block text-sm leading-5 font-bold">
              {label}
            </Listbox.Label>
            <div className="relative">
              <span className="inline-block w-full rounded-md shadow-sm">
                <button
                  className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={() => {
                    if (isOpen) {
                      setOpenedDropdownId(0);
                      setIsOpen(false);
                    } else {
                      setOpenedDropdownId(dropdownId);
                      setIsOpen(true);
                    }
                  }}
                  open={isOpen}
                >
                  <span className="block truncate">
                    {currSelectedValues.length < 1
                      ? `Select ${label}`
                      : `${formatStr(
                          currSelectedValues.join(", "),
                          maxLength
                        )}`}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </span>

              <Transition
                unmount={false}
                show={dropdownId === openedDropdownId}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10"
              >
                <Listbox.Options
                  static
                  className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                >
                  <div>
                    {listValues.map((person) => {
                      const selected = isSelected(person);
                      return (
                        <Listbox.Option key={person} value={person}>
                          {({ active }) => (
                            <div
                              className={`${
                                active
                                  ? "text-white bg-blue-600"
                                  : "text-gray-900"
                              } cursor-default select-none relative py-2 pl-8 pr-4`}
                            >
                              <span
                                className={`${
                                  selected ? "font-semibold" : "font-normal"
                                } block truncate`}
                              >
                                {person}
                              </span>
                              {selected && (
                                <span
                                  className={`${
                                    active ? "text-white" : "text-yellow-500"
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                >
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </div>
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
