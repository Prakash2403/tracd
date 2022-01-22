import { DropdownGroup } from "./components/dropdown-group";
export default function App() {
  const dropdownValues = [
    {
      listValues: ["A", "B"],
      label: "dropdown",
      dropdownId: 1,
      valueSetter: () => 1,
    },
    {
      listValues: ["C", "D"],
      label: "dropdown",
      dropdownId: 2,
      valueSetter: () => 1,
    },
    {
      listValues: ["E", "F"],
      label: "dropdown",
      dropdownId: 3,
      valueSetter: () => 1,
    },
  ];
  return (
    <>
      <DropdownGroup dropdownValues={dropdownValues} />
    </>
  );
}
