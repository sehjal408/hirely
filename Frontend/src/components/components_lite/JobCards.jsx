import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import stripHtml from "@/utils/stripHtml";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border cursor-pointer"
    >
      <h1 className="text-lg font-medium">{job.name}</h1>
      <h2 className="font-bold text-lg my-2">{job.title}</h2>

      <p className="text-sm text-gray-600">
        {stripHtml(job.description).slice(0, 120)}...
      </p>

      <div className="flex gap-2 items-center mt-4">
        <Badge variant="ghost">{job.position} Openings</Badge>
        <Badge variant="ghost">{job.salary} LPA</Badge>
        <Badge variant="ghost">{job.location}</Badge>
        <Badge variant="ghost">{job.jobType}</Badge>
      </div>
    </div>
  );
};

export default JobCards;
