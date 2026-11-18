import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const EditProfileModal = ({ open, setOpen }) => {
  const { user, setUser } = useAuth();   // ⬅ using Auth Context
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    resume: user?.profile?.resume || "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        fullname: input.fullname,
        email: input.email,
        phoneNumber: input.phoneNumber,
        bio: input.bio,
        skills: input.skills.split(",").map((s) => s.trim()),
        resume: input.resume, // fake URL or text value
      };

      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(res.data.user); // update context
        toast.success("Profile updated successfully");
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={saveProfile}>
          <div className="grid gap-4 py-4">

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>
              <input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeHandler}
                className="col-span-3 border p-2 rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeHandler}
                className="col-span-3 border p-2 rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Phone</Label>
              <input
                type="tel"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeHandler}
                className="col-span-3 border p-2 rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Bio</Label>
              <input
                type="text"
                name="bio"
                value={input.bio}
                onChange={changeHandler}
                className="col-span-3 border p-2 rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Skills</Label>
              <input
                type="text"
                name="skills"
                value={input.skills}
                onChange={changeHandler}
                placeholder="React, Node, SQL"
                className="col-span-3 border p-2 rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Resume URL</Label>
              <input
                type="text"
                name="resume"
                value={input.resume}
                onChange={changeHandler}
                placeholder="https://example.com/resume.pdf"
                className="col-span-3 border p-2 rounded-md"
              />
            </div>
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Save
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
