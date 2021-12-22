import React from "react";
import data from "./API/data.json";
import JobListing from "./components/JobListing";

// "id": 8,
// "company": "Insure",
// "logo": "./images/insure.svg",
// "new": false,
// "featured": false,
// "position": "Junior Frontend Developer",
// "role": "Frontend",
// "level": "Junior",
// "postedAt": "2w ago",
// "contract": "Full Time",
// "location": "USA Only",
// "languages": ["JavaScript"],
// "tools": ["Vue", "Sass"]

function App() {
  return (
    <div className="App bg-teal-50">
      <header className="bg-teal-700 mb-12">
        <img src="/images/bg-header-desktop.svg" alt="bg-header" />
      </header>
      {data.length === 0 ? (
        <p>Jobs are fetching...</p>
      ) : (
        data.map((job) => <JobListing job={job} key={job.id} />)
      )}
    </div>
  );
}

export default App;
