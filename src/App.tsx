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
  const [filters, setFilters] = useState<string[]>([]);

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

    return filters.every(filter => tags.includes(filter));
  };

  const handleTagClick = (tag: string) => {
    if (filters.includes(tag)) return;

    setFilters([...filters, tag]);
  };

  const handleFilterClick = (passedFilter: string) => {
    setFilters(filters.filter((f) => f !== passedFilter));
  };

  const clearFilters = () => {
    setFilters([]);
  }

  const filteredJobs = data.filter(filterFunction);

  return (
    <div className="App">
      <header className="bg-teal-700 bg-opacity-70 mb-12">
        <img className="w-full" src="/images/bg-header-desktop.svg" alt="bg-header" />
      </header>
      <div className="container m-auto">
      {filters.length !== 0 && (
        <div className="flex bg-white shadow-md -my-[88px] mb-16 mx-10 p-6 rounded relative z-10">
          {filters.map((filter, index) => (
            // <span
            //   onClick={() => handleFilterClick(filter)}
            //   className="text-desaturated-dark-cyan bg-teal-50 font-bold mr-4 mb-4 p-2 rounded cursor-pointer lg:mb-0"
            // >
            //  ✕ {filter}
            // </span>
            <h3 key={index} className="flex justify-center items-center border-0 rounded-md pt-0 pr-0 pb-0 pl-2 mr-4 text-desaturated-dark-cyan bg-teal-50 font-bold ">{filter}
                                <button onClick={() => {handleFilterClick(filter)}} className="pointer flex justify-center items-center border-0 w-8 h-8 ml-2 bg-desaturated-dark-cyan rounded-tr-sm rounded-br-sm hover:bg-very-dark-grayish-cyan">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><title>remove filter</title><path fill="#FFF" fillRule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>
                                </button>
                            </h3> 
          ))}
          <button onClick={clearFilters} className="font-bold text-gray-400 ml-auto mr-10 hover:text-desaturated-dark-cyan hover:underline">Clear</button>
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
