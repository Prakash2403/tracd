import AutocompleteDropDown from "./lib/components/dropdown";
import { useState } from "react";

import { faker } from "@faker-js/faker";

const people = [];

for (let i = 0; i < 10000; i++) {
  people.push({ key: faker.name.findName() });
}
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
