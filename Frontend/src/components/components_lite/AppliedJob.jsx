import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useApplications } from "@/context/ApplicationContext";
import { useJobs } from "@/context/JobContext";
import { useAuth } from "@/context/AuthContext";

const AppliedJob = () => {
  const { applicants } = useApplications();   // from ApplicationContext
  const { allJobs } = useJobs();              // real + fake jobs
  const { user } = useAuth();                 // logged-in user

  if (!user) return <p>Please login.</p>;

  // 🔎 Filter jobs that this user applied to
  const appliedJobs = allJobs.filter((job) =>
    job.applications?.some(
      (application) => application.applicant === user._id
    )
  );

  return (
    <div>
      <Table>
        <TableCaption>Recent Applied Jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appliedJobs.length === 0 ? (
            <TableRow>
              <TableCell>No Jobs Applied Yet.</TableCell>
            </TableRow>
          ) : (
            appliedJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company?.name}</TableCell>

                <TableCell className="text-right">
                  <Badge className="bg-blue-600 text-white">
                    Applied
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJob;
