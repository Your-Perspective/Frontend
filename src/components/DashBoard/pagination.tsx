import React from "react";
import { PaginationProps } from "@/types/Types";

const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageClick = (index: number) => {
    onPageChange(index);
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <section aria-label="Pagination">
        <ul className="inline-flex -space-x-px">
          <li>
            <button
              onClick={() => handlePageClick(Math.max(0, pageIndex - 1))}
              disabled={pageIndex === 0}
              className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-[#1F2937] dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageClick(index)}
                className={`px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-[#1F2937] dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  pageIndex === index
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "bg-white dark:bg-[#1F2937]"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                handlePageClick(Math.min(totalPages - 1, pageIndex + 1))
              }
              disabled={pageIndex === totalPages - 1}
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-[#1F2937] dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Pagination;
