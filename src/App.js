import AutocompleteDropDown from "./lib/components/dropdown";
import { useState } from "react";

const people = [
  { count: 1, key: "Durward Reynolds" },
  { count: 2, key: "Kenton Towne" },
  { count: 3, key: "Therese Wunsch" },
  { count: 4, key: "Benedict Kessler" },
  { count: 5, key: "Katelyn Rohan" },
  { count: 10, key: "Durward Reynolds" },
  { count: 20, key: "Kenton Towne" },
  { count: 30, key: "Therese Wunsch" },
  { count: 40, key: "Benedict Kessler" },
  { count: 50, key: "Katelyn Rohan" },
  { count: 100, key: "Durward Reynolds" },
  { count: 200, key: "Kenton Towne" },
  { count: 300, key: "Therese Wunsch" },
  { count: 400, key: "Benedict Kessler" },
  { count: 500, key: "Katelyn Rohan" },
  { count: 1000, key: "Durward Reynolds" },
  { count: 2000, key: "Kenton Towne" },
  { count: 3000, key: "Therese Wunsch" },
  { count: 4000, key: "Benedict Kessler" },
  { count: 5000, key: "Katelyn Rohan" },
];

const App = () => {
  const [selected_1, setSelected_1] = useState([]);
  const [selected_2, setSelected_2] = useState([]);

  return (
    <div className="max-w-md">
      <AutocompleteDropDown
        listValues={people}
        displayProp="key"
        label="People"
        selected={selected_1}
        setSelected={setSelected_1}
      />
      <AutocompleteDropDown
        listValues={people}
        displayProp="key"
        label="People"
        selected={selected_2}
        setSelected={setSelected_2}
      />
    </div>
  );
};
export default App;
