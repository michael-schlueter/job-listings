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

    const jobTags = [job.role, job.level];

    if (job.languages) {
        jobTags.push(...job.languages);
    }

    if (job.tools) {
        jobTags.push(...job.tools);
    }

  return (
    <div className="flex bg-white shadow-md m-4 p-6 rounded">
      <div>
        <img src={job.logo} alt={job.company} />
      </div>
      <div className="flex flex-col justify-between ml-4">
          <h3 className="font-bold text-teal-500">{job.company}
            {job.new && (
                <span className="bg-teal-500 text-white m-2 py-1 px-2 rounded-full uppercase">New!</span>
            )}
            {job.featured && (
                <span className="bg-gray-800 text-white m-2 py-1 px-2 rounded-full uppercase">Featured</span>
            )}
          </h3>
          <h2 className="font-bold text-xl">{job.position}</h2>
          <p className="text-gray-400">
              {job.postedAt} · {job.contract} · {job.location}
          </p>
      </div>
      <div className="flex items-center ml-auto">
        {jobTags 
            ? jobTags.map((jobTag) => (
                <span className="text-teal-500 bg-teal-50 font-bold m-2 p-2 rounded">
                    {jobTag}
                </span>
            )) : ''}
      </div>
    </div>
  );
}
