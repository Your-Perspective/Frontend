"use client";
import { useState, useEffect } from "react";
import DashBoardLayout from "@/components/layout/layout";
import { DataTable } from "@/components/DashBoard/Table";
import { ColumnDef } from "@tanstack/react-table";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { ListBlog } from "@/types/Types";
import Image from "next/image";
import DialogConfirm from "@/components/Confirm/confirm";
import {
  useGetListThumbnailQuery,
  useGetListBlogQuery,
  useDeleteBlogMutation,
} from "@/lib/api/services/AdminBlog";
import { IoAddCircleOutline } from "react-icons/io5";

const Blog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [dialogConfirm, setDialogConfirm] = useState(false);
  const [storeId, setStoreId] = useState<number | null>(null);

  const { data: thumbnail, refetch: refetchThumbnail } =
    useGetListThumbnailQuery();

  const { data: listBlog, refetch: refetchBlog } = useGetListBlogQuery();
  const [deleteBlog] = useDeleteBlogMutation();

  useEffect(() => {
    refetchThumbnail();

    refetchBlog();
  }, [refetchThumbnail, refetchBlog]);

  const handleActionClick = (type: string, rowData: ListBlog) => {
    if (type === "edit") {
      setDialogOpen(true);
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

  const deleteData = async (Id: number) => {
    setDialogConfirm(false);
    try {
      await deleteBlog(Id).unwrap();
      refetchBlog();
    } catch (error) {
      console.error("Failed to delete the blog:", error);
    }
  };

  return (
    <main>
      <section>
        <DashBoardLayout>
          <header className="justify-end flex">
            <Button className="gap-1 flex">
              <IoAddCircleOutline />
              Create
            </Button>
          </header>

          <div className={dialogOpen ? "hidden" : "block w-full"}>
            <DataTable
              totalItems={listBlog?.length || 0}
              onActionClick={handleActionClick}
              columns={columns}
              data={listBlog || []}
            />
          </div>
        </DashBoardLayout>
      </section>

      <section>
        <DialogConfirm
          title="Confirm"
          Content="Are you sure you want to delete?"
          isOpen={dialogConfirm}
          onCancel={() => setDialogConfirm(false)}
          onConfirm={() => storeId && deleteData(storeId)}
        />
      </section>
    </main>
  );
};

export default Blog;
