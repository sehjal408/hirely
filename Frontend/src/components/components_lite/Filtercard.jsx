import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useJobs } from "@/context/JobContext";

const filterData = [
  {
    filterType: "Location",
    array: ["Vancouver", "Surrey", "Burnaby", "Victoria", "Whistler", "Kelowna"],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "frontend",
      "backend",
      "mobile",
      "desktop",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const { setSearchQuery } = useJobs(); // ⬅ using JobContext NOT Redux

  const handleFilterChange = (value) => {
    setSearchQuery(value);
  };

  return (
    <div className="w-full bg-white rounded-md p-3">
      <h1 className="font-bold text-lg mb-3">Filter Jobs</h1>
      <hr className="mb-4" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-5">
          <h2 className="font-bold text-md mb-2">{data.filterType}</h2>

          <RadioGroup onValueChange={handleFilterChange}>
            {data.array.map((item, indx) => {
              const itemId = `Id${index}-${indx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <label htmlFor={itemId}>{item}</label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default Filter;
