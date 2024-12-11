"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useAuth } from "@/context";
import { createMember, updateUser } from "@/utils/api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from "@/utils/firebase";


const ProfileFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  profilePicture: z.string().optional(), // Profile picture as a base64 string
  roleId: z.string(),
  userId: z.string(),
});

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

const ProfileForm = () => {
  const { userId, token, roleId,  } = useAuth();
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phone: "",
      profilePicture: "",
      roleId:"",
      userId: "",
    },
  });

  const handleProfilePictureChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try{
      const file = event.target.files?.[0];
       if (!file) return;

      const storageRef = ref(storage, `profilePictures/${file.name}`);
      // Upload the file to Firebase Storage
      const snapShot = await uploadBytes(storageRef, file);
      console.log("Uploaded a file", snapShot);
      // Get the download URL
      const downloadURL = await getDownloadURL(snapShot.ref);
    console.log("Image URL:", downloadURL);
    // Set the profilePicture field to the download URL
    setProfilePicture(downloadURL);
    // profileForm.setValue("profilePicture", downloadURL);
    }catch(error){
      console.log(error);
    }
    
  };

  const profileSubmit = async (values: ProfileFormValues) => {
    console.log("Profile updated successfully");
    setLoading(true);
    console.log(roleId);

    const data = {
      values: { ...values, profilePicture: profilePicture, userId: userId, roleId: roleId || "" },
      token: token,
    };
    try {
      await createMember(data);
      await updateUser({hasProfile: true});

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-gray-200">
      <div className="bg-white shadow-md rounded-lg w-96 p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Update Profile
        </h2>
        <Form {...profileForm}>
          <form onSubmit={profileForm.handleSubmit(profileSubmit)}>
            <FormField
              control={profileForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </FormControl>
            </FormItem>
            <Button type="submit" className="mt-4 w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;


