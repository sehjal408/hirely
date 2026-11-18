import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";

import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  useGetAppliedJobs(); // loads applied jobs

  const [open, setOpen] = useState(false);

  // ⬇️ FIX — Now using context, NOT Redux
  const { user } = useAuth();

  if (!user) return <div>Please login first.</div>;

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow">
        <div className="flex justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>

            <div>
              <h1 className=" font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio || "No bio added"}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        {/* Contact */}
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>
              <a href={`mailto:${user?.email}`}>{user?.email}</a>
            </span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>
              <a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</a>
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-5">
          <h1 className="font-bold">Skills</h1>
          <div className="flex items-center gap-1 flex-wrap">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>No skills added</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="my-5">
          <h1 className="font-bold">Resume</h1>
          {user?.profile?.resume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Download {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>No Resume Uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>
        <AppliedJob />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
