import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

import { useState } from "react";
interface PageInfo {
  totalPages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
interface PaginationProps {
  initialPageInfo: PageInfo;
  onPageChange: (updatedPageInfo: PageInfo) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  initialPageInfo,
  onPageChange,
}) => {
  const [pageInfo, setPageInfo] = useState(initialPageInfo);

  const handlePageChange = (newPage: number) => {
    // Prevent navigation to invalid pages
    console.log("new page", pageInfo);

    if (newPage < 1 || newPage > pageInfo.totalPages) return;

    // Update the pageInfo state
    const updatedPageInfo = {
      ...pageInfo,
      currentPage: newPage,
      hasPrevPage: newPage > 1,
      hasNextPage: newPage < pageInfo.totalPages,
    };
    setPageInfo(updatedPageInfo);

    // Trigger the external callback
    onPageChange(updatedPageInfo);
  };

  // Generate page numbers dynamically
  const getPaginationLinks = () => {
    const { totalPages, currentPage } = pageInfo;
    const links = [];

    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === currentPage}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return links;
  };

  return (
    <Pagination className="py-20">
      <PaginationContent>
        {/* Previous Button */}
        {pageInfo.hasPrevPage && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(pageInfo.currentPage - 1);
              }}
            />
          </PaginationItem>
        )}

        {/* Dynamic Pagination Links */}
        {getPaginationLinks()}

        {/* Next Button */}
        {pageInfo.hasNextPage && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(pageInfo.currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
