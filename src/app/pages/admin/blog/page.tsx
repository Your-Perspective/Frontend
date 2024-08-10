"use client";
import { useState, ChangeEvent, useEffect } from "react";
import DashBoardLayout from "@/components/layout/layout";
import { DataTable } from "@/components/DashBoard/Table";
import { ColumnDef } from "@tanstack/react-table";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import DialogBlog from "@/components/DashBoard/Dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DialogConfirm from "@/components/Confirm/confirm";
import { CreateBlog } from "@/types/Types";
import ModifySelect from "@/components/DashBoard/singleSelect";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import MultiSelect from "@/components/DashBoard/multi_select";
import { ListBlog } from "@/types/Types";
import Image from "next/image";
import {
  useGetListCategoryQuery,
  useGetListThumbnailQuery,
  useGetListTagQuery,
  useGetListBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/lib/api/services/Blog";
import { IoAddCircleOutline } from "react-icons/io5";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Blog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CreateBlog>({
    id: 0,
    blogTitle: "",
    slug: "",
    categoryIds: [],
    thumbnail: "",
    published: "true",
    isPin: "true",
    minRead: "",
    blogContent: "",
    summary: "",
    tags: [],
  });
  const [titleBlog, setTitleBlog] = useState(false);
  const [dialogConfirm, setDialogConfirm] = useState(false);
  const [storeId, setStoreId] = useState<number | null>(null);

  const { data: Category } = useGetListCategoryQuery();
  const DataCategory =
    Category?.map((v) => ({
      value: v?.id,
      label: v?.title,
    })) || [];

  const { data: thumbnail, refetch: refetchThumbnail } =
    useGetListThumbnailQuery();

  const { data: listTag, refetch: refetchTag } = useGetListTagQuery();
  const DataTag =
    listTag?.map((v) => ({
      value: v?.id,
      label: v?.name,
    })) || [];

  const { data: listBlog, refetch: refetchBlog } = useGetListBlogQuery();
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  useEffect(() => {
    refetchThumbnail();
    refetchTag();
    refetchBlog();
  }, [refetchThumbnail, refetchTag, refetchBlog]);

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

  const handleSelectChange = (name: string, selectedValues: string[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: selectedValues,
    }));
  };

  const handleSave = async () => {
    const selectedThumbnail = thumbnail?.find(
      (v) => v.title === formData.thumbnail
    );
    if (selectedThumbnail) {
      formData.thumbnail = selectedThumbnail.imageUrl;
    }

    formData.isPin == "true" ? true : false;
    formData.published == "true" ? true : false;

    if (titleBlog) {
      try {
        await createBlog(formData).unwrap();
        refetchBlog();
      } catch (err) {
        console.error("rejected", err);
      }
    } else {
      try {
        await updateBlog(formData).unwrap();
        refetchBlog();
      } catch (err) {
        console.error("rejected", err);
      }
    }
    setDialogOpen(false);
  };

  const handleActionClick = (type: string, rowData: ListBlog) => {
    if (type === "edit") {
      const selectedThumbnail = thumbnail?.find(
        (v) => v.imageUrl === rowData.thumbnail
      );

      const catId = rowData?.categories.map((v) => v.id.toString());
      const tagId = rowData?.tags.map((v) => v.id.toString());

      setTitleBlog(false);
      setDialogOpen(true);
      setFormData({
        id: rowData.id || 0,
        blogTitle: rowData.blogTitle || "",
        slug: rowData.slug || "",
        categoryIds: catId || [],
        thumbnail: selectedThumbnail?.title || "",
        published: rowData.published ? "true" : "false",
        isPin: rowData.isPin ? "true" : "false",
        minRead: rowData.minRead || "",
        blogContent: rowData.blogContent || "",
        summary: rowData.summary || "",
        tags: tagId || [],
      });
    } else if (type === "delete") {
      setDialogConfirm(true);
      setStoreId(rowData?.id);
    }
  };

  const columns: ColumnDef<ListBlog, any>[] = [
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => (
        <Image
          src={row.original.thumbnail || "/path/to/default-image.jpg"} // Provide a default image if necessary
          alt="Thumbnail"
          width={50}
          height={50}
          className="size-[50px] rounded-[10px] object-fit"
        />
      ),
    },
    {
      accessorKey: "blogTitle",
      header: "Title",
      cell: ({ row }) => (
        <div className="truncate w-12">{row.original?.blogTitle}</div>
      ),
    },
    {
      accessorKey: "countViewer",
      header: "Views",
    },
    {
      accessorKey: "summary",
      header: "Summary",
      cell: ({ row }) => (
        <div className="truncate max-w-[450px]">{row.original?.summary}</div>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-1">
          <button onClick={() => handleActionClick("edit", row.original)}>
            <CiEdit className="text-[#2AB7A0] border p-1.5 size-7 rounded-md border-[#2AB7A0]" />
          </button>
          <button onClick={() => handleActionClick("delete", row.original)}>
            <MdDeleteForever className="text-[#FB6666] border p-1.5 size-7 rounded-md border-[#FB6666]" />
          </button>
        </div>
      ),
    },
  ];

  const deleteData = async (Id: number) => {
    setDialogConfirm(false);
    try {
      await deleteBlog(Id).unwrap();
      refetchBlog();
    } catch (error) {
      console.error("Failed to delete the blog:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      blogTitle: "",
      slug: "",
      categoryIds: [],
      thumbnail: "",
      published: "true",
      isPin: "true",
      minRead: "",
      blogContent: "",
      summary: "",
      tags: [],
    });
  };

  return (
    <div>
      <DashBoardLayout>
        <div className="justify-end flex">
          <Button
            className="gap-1 flex"
            variant="outline"
            onClick={() => {
              setDialogOpen(true);
              setTitleBlog(true);
              resetForm();
            }}
          >
            <IoAddCircleOutline />
            Create
          </Button>
          <DialogBlog
            title={titleBlog ? "Create Blog" : "Edit Blog"}
            onSave={handleSave}
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
          >
            <form className="scroll-auto overflow-y-scroll">
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    name="blogTitle"
                    value={formData.blogTitle}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Min Read</Label>
                  <ModifySelect
                    valueSelected={formData.minRead || ""}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, minRead: value }))
                    }
                  >
                    <SelectContent>
                      <SelectGroup>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={`${i + 1}`}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </ModifySelect>
                </div>

                <div>
                  <Label>Publish</Label>
                  <RadioGroup
                    value={formData.published}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, published: value }))
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
                  <Label>Pin</Label>
                  <RadioGroup
                    value={formData.isPin}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, isPin: value }))
                    }
                  >
                    <div className="flex gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="r3" />
                        <Label htmlFor="r3">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="r4" />
                        <Label htmlFor="r4">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label>Thumbnail</Label>
                  <ModifySelect
                    valueSelected={formData.thumbnail || ""}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, thumbnail: value }))
                    }
                  >
                    <SelectContent>
                      {thumbnail?.map((item) => (
                        <SelectItem key={item?.title} value={item.title}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </ModifySelect>
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Tags</Label>
                    <MultiSelect
                      options={DataTag}
                      selectedValues={formData.tags}
                      onChange={(name, selectedValues) =>
                        handleSelectChange("tags", selectedValues)
                      }
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <MultiSelect
                      options={DataCategory}
                      selectedValues={formData.categoryIds}
                      onChange={(name, selectedValues) =>
                        handleSelectChange("categoryIds", selectedValues)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Summary</Label>
                  <Textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    placeholder="Type your message here."
                  />
                </div>
                <div>
                  <Label>Content</Label>
                  <ReactQuill
                    value={formData.blogContent}
                    onChange={handleChange}
                    className="h-[400px]"
                  />
                </div>
              </div>
            </form>
          </DialogBlog>
        </div>
        <DialogConfirm
          title="Confirm"
          Content="Are you sure you want to delete?"
          isOpen={dialogConfirm}
          onCancel={() => setDialogConfirm(false)}
          onConfirm={() => storeId && deleteData(storeId)}
        />

        <div className="w-full">
          <DataTable
            onActionClick={handleActionClick}
            columns={columns}
            data={listBlog || []}
          />
        </div>
      </DashBoardLayout>
    </div>
  );
};

export default Blog;
