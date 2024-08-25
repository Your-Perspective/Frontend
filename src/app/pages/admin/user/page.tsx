"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import DashBoardLayout from "@/components/layout/layout";
import { DataTable } from "@/components/DashBoard/Table";
import { CreateUser, ListUser } from "@/types/Types";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Logo from "@/assets/logo.jpg";
import { Button } from "@/components/ui/button";
import DialogAdmin from "@/components/DashBoard/Dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DialogConfirm from "@/components/Confirm/confirm";
import { IoAddCircleOutline, IoEye, IoEyeOff } from "react-icons/io5";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/lib/api/services/AdminUser";
import { Textarea } from "@/components/ui/textarea";

const User = () => {
  const { data: ListUser, refetch: refetchUser } = useGetUserQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfirm, setDialogConfirm] = useState(false);
  const [titleUser, setTitleUser] = useState(false);
  const [storeId, setStoreId] = useState<number | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<CreateUser>({
    id: 0,
    profileImage: "",
    email: "",
    userName: "",
    bio: "",
    about: "",
    isVerified: "true",
    verifiedByAdmin: "true",
    password: "",
    isDeleted: "true",
  });

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  const columns: ColumnDef<ListUser, any>[] = [
    {
      accessorKey: "profileImage",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original?.profileImage || Logo}
          alt="profileImage"
          width={50}
          height={50}
          className="w-[50px] h-[50px] rounded-[10px] object-cover"
        />
      ),
    },
    {
      accessorKey: "userName",
      header: "Name",
    },
    {
      accessorKey: "verifiedByAdmin",
      header: "Verified By Admin",
    },
    {
      accessorKey: "top3Count",
      header: "Top Count",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-1">
          <button onClick={() => handleActionClick("edit", row.original)}>
            <CiEdit className="text-[#2AB7A0] border p-1.5 size-7 text-xl rounded-md border-[#2AB7A0]" />
          </button>
          <button onClick={() => handleActionClick("delete", row.original)}>
            <MdDeleteForever className="text-[#FB6666] border p-1.5 size-7 text-xl rounded-md border-[#FB6666]" />
          </button>
        </div>
      ),
    },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | string
  ) => {
    if (typeof e === "string") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        blogContent: e,
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const deleteData = async (Id: number) => {
    setDialogConfirm(false);
    try {
      await deleteUser(Id).unwrap();
      refetchUser();
    } catch (error) {
      console.error("Failed to delete the user:", error);
    }
  };

  const handleActionClick = (type: string, rowData: ListUser) => {
    if (type === "edit") {
      setTitleUser(false);
      setDialogOpen(true);
      setFormData({
        id: rowData?.id || 0,
        profileImage: rowData?.profileImage || "",
        email: rowData?.email || "",
        userName: rowData?.userName || "",
        bio: rowData?.bio || "",
        about: rowData?.about || "",
        isVerified: rowData.isVerified ? "true" : "false",
        verifiedByAdmin: rowData.verifiedByAdmin ? "true" : "false",
        password: "",
        isDeleted: rowData.isDeleted ? "true" : "false",
      });
    } else if (type === "delete") {
      setDialogConfirm(true);
      setStoreId(rowData?.id);
    }
  };

  const handleSave = async () => {
    if (titleUser) {
      try {
        await createUser(formData).unwrap();
        refetchUser();
        setDialogOpen(false);
      } catch (err) {
        console.error("Failed to create user:", err);
      }
    } else {
      try {
        const { password, ...allData } = formData;
        await updateUser(allData).unwrap();
        refetchUser();
        setDialogOpen(false);
      } catch (err) {
        console.error("Failed to update user:", err);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const localUrl = URL.createObjectURL(selectedFile);

      setFormData((prevData) => ({
        ...prevData,
        profileImage: localUrl,
      }));

      setTimeout(() => URL.revokeObjectURL(localUrl), 60000);
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      profileImage: "",
      email: "",
      userName: "",
      bio: "",
      about: "",
      isVerified: "false",
      verifiedByAdmin: "false",
      password: "",
      isDeleted: "false",
    });
  };

  return (
    <DashBoardLayout>
      <div className="justify-end flex">
        <Button
          className="gap-1 flex"
          variant="outline"
          onClick={() => {
            setDialogOpen(true);
            setTitleUser(true);
            resetForm();
          }}
        >
          <IoAddCircleOutline />
          Create
        </Button>
        <DialogAdmin
          title={titleUser ? "Create User" : "Edit User"}
          onSave={handleSave}
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
        >
          <form>
            <div>
              <div className="flex justify-center">
                {formData.profileImage && (
                  <Image
                    src={formData.profileImage}
                    alt="Selected"
                    className="mt-2 w-24 h-24 rounded-full"
                    width={60}
                    height={60}
                  />
                )}
              </div>

              <Label>Profile Image</Label>
              <Input
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label>Verified</Label>
                <RadioGroup
                  value={formData.isVerified}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, isVerified: value }))
                  }
                >
                  <div className="flex gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="r1" />
                      <Label htmlFor="r1">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="r2" />
                      <Label htmlFor="r2">No</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>Verified By Admin</Label>
                <RadioGroup
                  value={formData.verifiedByAdmin}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      verifiedByAdmin: value,
                    }))
                  }
                >
                  <div className="flex gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="r1" />
                      <Label htmlFor="r1">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="r2" />
                      <Label htmlFor="r2">No</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label>Email</Label>
                <Input
                  placeholder="example@gmail.com"
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label>User Name</Label>
                <Input
                  placeholder="Please enter"
                  type="text"
                  value={formData.userName}
                  name="userName"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2"
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label>Bio</Label>
                <Textarea
                  placeholder="Please enter"
                  className="h-40"
                  value={formData.bio}
                  name="bio"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label>About</Label>
                <Textarea
                  placeholder="Please enter"
                  className="h-40"
                  value={formData.about}
                  name="about"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </DialogAdmin>
      </div>
      <DataTable
        totalItems={ListUser?.length || 0}
        onActionClick={handleActionClick}
        columns={columns}
        data={ListUser || []}
      />
      <DialogConfirm
        title="Confirm"
        Content="Are you sure you want to delete?"
        isOpen={dialogConfirm}
        onCancel={() => setDialogConfirm(false)}
        onConfirm={() => storeId && deleteData(storeId)}
      />
    </DashBoardLayout>
  );
};

export default User;
