"use client";
import DashBoardLayout from "@/components/layout/layout";
import { DataTable } from "@/components/DashBoard/Table";
import { ColumnDef } from "@tanstack/react-table";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { ListBlog } from "@/types/Types";
import Image from "next/image";
import { useGetListBlogQuery } from "@/lib/api/services/AdminBlog";
import { IoAddCircleOutline } from "react-icons/io5";

const Blog = () => {
  const { data: listBlog } = useGetListBlogQuery();

  const handleActionClick = (type: string, rowData: ListBlog) => {};

  const columns: ColumnDef<ListBlog, any>[] = [
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => (
        <Image
          src={row.original.thumbnail || "/path/to/default-image.jpg"}
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

  return (
    <main>
      <DashBoardLayout>
        <header className="justify-end flex">
          <Button className="gap-1 flex">
            <IoAddCircleOutline />
            Create
          </Button>
        </header>

        <div className="w-full">
          <DataTable
            totalItems={listBlog?.length || 0}
            onActionClick={handleActionClick}
            columns={columns}
            data={listBlog || []}
          />
        </div>
      </DashBoardLayout>
    </main>
  );
};

export default Blog;
