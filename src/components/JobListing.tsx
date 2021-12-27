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
  };
  handleTagClick: any;
}

export default function JobListing({ job, handleTagClick }: JobType) {
  const jobTags = [job.role, job.level];

  if (job.languages) {
    jobTags.push(...job.languages);
  }

  if (job.tools) {
    jobTags.push(...job.tools);
  }

  return (
    <div
      className={`flex flex-col bg-white shadow-md my-16 mx-10 p-6 rounded ${
        job.featured && "border-l-4 border-teal-500 border-solid"
      } lg:flex-row lg:my-4`}
    >
      <div>
        <img
          className="-mt-16 mb-4 w-20 h-20 lg:my-0 lg:h-24 lg:w-24"
          src={job.logo}
          alt={job.company}
        />
      </div>
      <div className="flex flex-col justify-between ml-4">
        <h3 className="font-bold text-teal-500">
          {job.company}
          {job.new && (
            <span className="bg-teal-500 text-white text-sm font-semibold m-2 py-1 px-2 rounded-full uppercase">
              New!
            </span>
          )}
          {job.featured && (
            <span className="bg-gray-800 text-white text-sm font-semibold py-1 px-2 rounded-full uppercase">
              Featured
            </span>
          )}
        </h3>
        <h2 className="font-bold text-xl my-2">{job.position}</h2>
        <p className="text-gray-400">
          {job.postedAt} · {job.contract} · {job.location}
        </p>
      </div>
      <div className="flex flex-wrap items-center mt-4 mx-4 pt-4 border-t border-gray-500 border-solid lg:ml-auto lg:border-0 lg:mt-0 lg:pt-0">
        {jobTags
          ? jobTags.map((jobTag) => (
              <span className="text-teal-500 bg-teal-50 font-bold mr-4 mb-4 p-2 rounded cursor-pointer lg:mb-0" onClick={() => handleTagClick(jobTag)}>
                {jobTag}
              </span>
            ))
          : ""}
      </div>
    </div>
  );
}
