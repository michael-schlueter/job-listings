import React, { useState } from "react";
import data from "./API/data.json";
import JobListing from "./components/JobListing";

interface JobType {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

function App() {
  const [filters, setFilters] = useState([]);

  const filterFunction = ({ role, level, tools, languages }: JobType) => {
    if (filters.length === 0) {
      return true;
    }

    const tags = [role, level];

    if (tools) {
      tags.push(...tools);
    }

    if (languages) {
      tags.push(...languages);
    }

    return tags.some((tag) => filters.includes(tag));
  };

  const handleTagClick = (tag) => {
    if (filters.includes(tag)) return;

    setFilters([...filters, tag]);
  };

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !== passedFilter));
  };

  const clearFilters = () => {
    setFilters([]);
  }

  const filteredJobs = data.filter(filterFunction);

  return (
    <div className="App bg-teal-50">
      <header className="bg-teal-700 mb-12">
        <img className="w-full" src="/images/bg-header-desktop.svg" alt="bg-header" />
      </header>
      <div className="container m-auto">
      {filters.length !== 0 && (
        <div className="flex bg-white shadow-md my-16 mx-10 p-6 rounded">
          {filters.map((filter) => (
            <span
              onClick={() => handleFilterClick(filter)}
              className="text-teal-500 bg-teal-50 font-bold mr-4 mb-4 p-2 rounded cursor-pointer lg:mb-0"
            >
             ✕ {filter}
            </span>
          ))}
          <button onClick={clearFilters} className="font-bold text-gray-700 ml-auto">Clear</button>
        </div>
      )}
      {data.length === 0 ? (
        <p>Jobs are fetching...</p>
      ) : (
        filteredJobs.map((job) => (
          <JobListing job={job} key={job.id} handleTagClick={handleTagClick} />
        ))
      )}
      </div>
    </div>
  );
}

export default App;
