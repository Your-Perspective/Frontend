"use client";
import { useState, ChangeEvent } from "react";
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

import {
  useGetListCategoryQuery,
  useGetListThumbnailQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/lib/api/services/Blog";

interface Person {
  Id: number;
  blogTitle: string;
  slug: string;
  thumbnail: string;
  isPin: string;
  blogContent: string;
  summary: string;
  tags: string[];
  categoryIds: string[];
  minRead: string;
  published: string;
}

const Blog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CreateBlog>({
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

  const { data: thumbnail } = useGetListThumbnailQuery();
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedValues: string[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      categoryIds: selectedValues,
    }));
  };

  const handleSave = async () => {
    console.log("Form Data:", formData);

    if (titleBlog) {
      try {
        await createBlog(formData).unwrap();
      } catch (err) {
        console.error("rejected", err);
      }
    } else {
      try {
        await updateBlog(formData).unwrap();
      } catch (err) {
        console.error("rejected", err);
      }
    }
    setDialogOpen(false);
  };

  const handleActionClick = (type: string, rowData: Person) => {
    if (type === "edit") {
      setTitleBlog(false);
      setDialogOpen(true);
      setFormData({
        blogTitle: rowData.blogTitle || "",
        slug: rowData.slug || "",
        categoryIds: rowData.categoryIds || [],
        thumbnail: rowData.thumbnail || "",
        published: rowData.published || "true",
        isPin: rowData.isPin || "true",
        minRead: rowData.minRead || "",
        blogContent: rowData.blogContent || "",
        summary: rowData.summary || "",
        tags: rowData.tags || [],
      });
    } else if (type === "delete") {
      setDialogConfirm(true);
      setStoreId(rowData.Id);
    }
  };

  const data: Person[] = [
    {
      Id: 1,
      blogTitle: "Understanding React Hooks",
      slug: "understanding-react-hooks",
      categoryIds: ["1", "2"],
      thumbnail: "https://example.com/thumbnail1.jpg",
      published: "true",
      isPin: "true",
      minRead: "5",
      blogContent: "React hooks are a new addition in React 16.8...",
      summary: "An in-depth look at React hooks and their usage.",
      tags: ["react", "hooks", "javascript"],
    },
    {
      Id: 2,
      blogTitle: "A Guide to Node.js",
      slug: "guide-to-nodejs",
      categoryIds: ["3", "4"],
      thumbnail: "https://example.com/thumbnail2.jpg",
      published: "false",
      isPin: "false",
      minRead: "8",
      blogContent: "Node.js is a JavaScript runtime built on Chrome's V8...",
      summary: "A comprehensive guide to Node.js for beginners.",
      tags: ["nodejs", "javascript", "backend"],
    },
    {
      Id: 3,
      blogTitle: "CSS Grid Layout",
      slug: "css-grid-layout",
      categoryIds: ["2", "5"],
      thumbnail: "https://example.com/thumbnail3.jpg",
      published: "true",
      isPin: "true",
      minRead: "6",
      blogContent: "CSS Grid Layout is a two-dimensional layout system...",
      summary: "Learn how to create complex layouts with CSS Grid.",
      tags: ["css", "grid", "web development"],
    },
    {
      Id: 4,
      blogTitle: "Introduction to TypeScript",
      slug: "introduction-to-typescript",
      categoryIds: ["1", "3"],
      thumbnail: "https://example.com/thumbnail4.jpg",
      published: "true",
      isPin: "false",
      minRead: "7",
      blogContent: "TypeScript is a superset of JavaScript that adds types...",
      summary: "A beginner's introduction to TypeScript.",
      tags: ["typescript", "javascript", "programming"],
    },
    {
      Id: 5,
      blogTitle: "Mastering Redux",
      slug: "mastering-redux",
      categoryIds: ["2", "4"],
      thumbnail: "https://example.com/thumbnail5.jpg",
      published: "false",
      isPin: "true",
      minRead: "10",
      blogContent:
        "Redux is a predictable state container for JavaScript apps...",
      summary: "Master the fundamentals of Redux for state management.",
      tags: ["redux", "react", "state management"],
    },
  ];

  const columns: ColumnDef<Person, any>[] = [
    {
      accessorKey: "blogTitle",
      header: "Blog Title",
    },
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
    },
    {
      accessorKey: "summary",
      header: "Summary",
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
    } catch (error) {
      console.error("Failed to delete the blog:", error);
    }
  };

  return (
    <div>
      <DashBoardLayout>
        <div className="justify-end flex">
          <Button
            variant="outline"
            onClick={() => {
              setDialogOpen(true);
              setTitleBlog(true);
            }}
          >
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
                  <Label>Blog Title</Label>
                  <Input
                    name="blogTitle"
                    value={formData.blogTitle}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input
                    name="slug"
                    value={formData.slug}
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
                  <Label>Thumbnail</Label>
                  <ModifySelect
                    valueSelected={formData.thumbnail || ""}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, thumbnail: value }))
                    }
                  >
                    <SelectContent>
                      {thumbnail?.map((item) => (
                        <SelectItem key={item?.imageUrl} value={item.imageUrl}>
                          {item.title}
                        </SelectItem>
                      ))}
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
                  <Label>Tags</Label>
                  <Input
                    name="tags"
                    value={formData.tags.join(", ")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tags: e.target.value
                          .split(", ")
                          .map((tag) => tag.trim()),
                      }))
                    }
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <MultiSelect
                    options={DataCategory}
                    selectedValues={formData.categoryIds}
                    onChange={handleSelectChange}
                  />
                </div>
                <div>
                  <Label>Blog Content</Label>
                  <Textarea
                    name="blogContent"
                    value={formData.blogContent}
                    onChange={handleChange}
                    placeholder="Type your message here."
                  />
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
        <DataTable
          onActionClick={handleActionClick}
          columns={columns}
          data={data}
        />
      </DashBoardLayout>
    </div>
  );
};

export default Blog;
