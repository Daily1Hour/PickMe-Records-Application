import { useState } from "react";

export const usePagination = <T>(menuItems: T[]) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(menuItems.length / itemsPerPage);

    const paginatedItems = menuItems.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage,
    );

    const handlePageChange = (direction: "next" | "prev") => {
        if (direction === "next" && currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return { paginatedItems, handlePageChange, currentPage, totalPages };
}