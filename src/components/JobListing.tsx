import React from "react";

interface JobType {
    job: {
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
}

export default function JobListing({ job }:JobType) {

    const languagesAndTools = [];

    if (job.languages) {
        languagesAndTools.push(...job.languages);
    }

    if (job.tools) {
        languagesAndTools.push(...job.tools);
    }

  return (
    <div className="flex bg-white shadow-md m-4 p-6">
      <div>
        <img src={job.logo} alt={job.company} />
      </div>
      <div className="ml-2">
          <h3 className="font-bold text-teal-500">{job.company}</h3>
          <h2 className="font-bold text-xl">{job.position}</h2>
          <p className="text-gray-400">
              {job.postedAt} · {job.contract} · {job.location}
          </p>
      </div>
      <div className="flex items-center ml-auto">
        {languagesAndTools 
            ? languagesAndTools.map((langAndTool) => (
                <span className="text-teal-500 bg-teal-50 font-bold m-2 p-2 rounded">
                    {langAndTool}
                </span>
            )) : ''}
      </div>
    </div>
  );
}
