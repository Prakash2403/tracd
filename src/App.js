import AutocompleteDropDown from "./components/dropdown";
import { useState } from "react";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
  { id: 10, name: "Durward Reynolds" },
  { id: 20, name: "Kenton Towne" },
  { id: 30, name: "Therese Wunsch" },
  { id: 40, name: "Benedict Kessler" },
  { id: 50, name: "Katelyn Rohan" },
  { id: 100, name: "Durward Reynolds" },
  { id: 200, name: "Kenton Towne" },
  { id: 300, name: "Therese Wunsch" },
  { id: 400, name: "Benedict Kessler" },
  { id: 500, name: "Katelyn Rohan" },
  { id: 1000, name: "Durward Reynolds" },
  { id: 2000, name: "Kenton Towne" },
  { id: 3000, name: "Therese Wunsch" },
  { id: 4000, name: "Benedict Kessler" },
  { id: 5000, name: "Katelyn Rohan" },
];

const App = () => {
  const [selected_1, setSelected_1] = useState([]);
  const [selected_2, setSelected_2] = useState([]);

  return (
    <div className="max-w-md">
      <AutocompleteDropDown
        listValues={people}
        displayProp="name"
        label="People"
        selected={selected_1}
        setSelected={setSelected_1}
      />
      <AutocompleteDropDown
        listValues={people}
        displayProp="name"
        label="People"
        selected={selected_2}
        setSelected={setSelected_2}
      />
    </div>
  );
};
export default App;
