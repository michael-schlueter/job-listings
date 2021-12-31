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

    // create a joint array for tags consisting of role, level, tools and languages
    const tags = [role, level];

    // if tools / languages exist, add them to the joint array
    if (tools) {
      tags.push(...tools);
    }

    if (languages) {
      tags.push(...languages);
    }

    // compare active filters to the tags
    return filters.every((filter) => tags.includes(filter));
  };

  // add tag as an active filter
  const handleTagClick = (tag: string) => {
    if (filters.includes(tag)) return;

    setFilters([...filters, tag]);
  };

  // activate a filter
  const handleFilterClick = (passedFilter: string) => {
    setFilters(filters.filter((f) => f !== passedFilter));
  };

  // remove all filters
  const clearFilters = () => {
    setFilters([]);
  };

  // only display jobs where the active filters and tags are overlapping
  const filteredJobs = data.filter(filterFunction);

  return (
    <div className="App">
      <header className="bg-teal-700 bg-opacity-70 mb-12">
        <img
          className="w-full"
          src="/images/bg-header-desktop.svg"
          alt="bg-header"
        />
      </header>
      <div className="container m-auto">
        {/* display only when filters are active */}
        {filters.length !== 0 && (
          <div className="flex bg-white -my-[92px] mb-16 mx-10 p-6 rounded shadow-md relative z-10">
            <div className="flex flex-wrap">
              {filters.map((filter, index) => (
                <h3
                  key={index}
                  className="flex justify-center items-center text-desaturated-dark-cyan bg-light-grayish-cyan-filter-tablets font-bold pt-0 pr-0 pb-0 pl-2 mr-4 my-1 border-0 rounded-md"
                >
                  {filter}
                  <button
                    onClick={() => {
                      handleFilterClick(filter);
                    }}
                    className="cursor-pointer flex justify-center items-center bg-desaturated-dark-cyan hover:bg-very-dark-grayish-cyan w-8 h-8 ml-2 border-0 rounded-tr-sm rounded-br-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                    >
                      <title>remove filter</title>
                      <path
                        fill="#FFF"
                        fillRule="evenodd"
                        d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"
                      />
                    </svg>
                  </button>
                </h3>
              ))}
            </div>
            <button
              onClick={clearFilters}
              className="text-gray-400 font-bold ml-auto mr-10 hover:text-desaturated-dark-cyan hover:underline"
            >
              Clear
            </button>
          </div>
        )}
        {data.length === 0 ? (
          <p>Jobs are fetching...</p>
        ) : (
          filteredJobs.map((job) => (
            <JobListing
              job={job}
              key={job.id}
              handleTagClick={handleTagClick}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
