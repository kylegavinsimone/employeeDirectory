import React, { useState, useEffect } from "react";
import API from "./utils/API";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";

function App() {
  // Setting this.state.employees to the employees json array
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    API.getUsers().then(function (employeeData) {
      console.log(employeeData);
      setEmployees(employeeData.data.results);
    });
  }, []);

  const removeEmployee = (employee) => {
    let fullName = (employee.name.first + " " + employee.name.last).toLowerCase();
    return fullName.includes(search.toLowerCase());
  };
const sortEmployee = () => {
  const newEmployees = employees.map (a => a);
  newEmployees.sort((b,a) => a.dob.age - b.dob.age)
  setEmployees(newEmployees)
}
  // Map over this.state.employees and render a employeeCard component for each employee object
  return (
    <>
      <Title>Employee List</Title>
      <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
      <button onClick = {sortEmployee}>Sort by age</button>
      <Wrapper>
        {employees
          .filter((emp) => removeEmployee(emp))
          .map((employee) => (
            <div>
              <img
                src={employee.picture.large}
                alt={employee.picture.large}
              ></img>
              <h1>
                {employee.name.first} {employee.name.last}
              </h1>
              <h1>{employee.dob.age}</h1>
              <h1>{employee.email}</h1>
              <h1>{employee.phone}</h1>
              {/* <employeeCard
            removeemployee={removeemployee}
            id={employee.id}
            key={employee.id}
            name={employee.name}
            image={employee.image}
            occupation={employee.occupation}
            location={employee.location}
          /> */}
            </div>
          ))}
      </Wrapper>
    </>
  );
}

export default App;
