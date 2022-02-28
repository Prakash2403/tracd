import AutocompleteDropDown from "./lib/components/dropdown";
import { useState, useEffect } from "react";

import { faker } from "@faker-js/faker";

const App = () => {
  const [selected_1, setSelected_1] = useState([]);
  const [selected_2, setSelected_2] = useState([]);
  const [people_1, setPeople_1] = useState([]);
  const [people_2, setPeople_2] = useState([]);

  useEffect(() => {
    let fakeP = [];
    for (let i = 0; i < 100000; i++) {
      fakeP.push({ key: faker.name.findName() });
    }
    setPeople_1(fakeP);
    setPeople_2(fakeP);
  }, []);

  return (
    <div className="max-w-md">
      <AutocompleteDropDown
        listValues={people_1}
        displayProp="key"
        label="People"
        selected={selected_1}
        setSelected={setSelected_1}
      />
      <AutocompleteDropDown
        listValues={people_2}
        displayProp="key"
        label="People"
        selected={selected_2}
        setSelected={setSelected_2}
      />
    </div>
  );
};
export default App;
