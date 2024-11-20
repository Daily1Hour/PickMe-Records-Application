"use client";

import { HStack, Stack, Text, Button,  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot, } from "@chakra-ui/react";

import { useState } from "react";

const pageSize = 5;
const count = 50;
const items = new Array(count)
  .fill(0)
  .map((_, index) => `Lorem ipsum dolor sit amet ${index + 1}`);

export const Pagination = () => {
  const [page, setPage] = useState(1);

  const startRange = (page - 1) * pageSize;
  const endRange = startRange + pageSize;

  const visibleItems = items.slice(startRange, endRange);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(count / pageSize)) {
      setPage(newPage);
    }
  };

  return (
    <Stack gap="4">
      <Stack>
        {visibleItems.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Stack>

      <PaginationRoot
        page={page}
        count={count}
        pageSize={pageSize}
        onPageChange={(e) => handlePageChange(e.page)}
      >
        <HStack gap={4}>
          <PaginationPrevTrigger
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >◀
          </PaginationPrevTrigger>

          {Array.from({ length: Math.ceil(count / pageSize) }, (_, index) => {
            const isActive = index + 1 === page;
            return (
              <PaginationItem
                key={index + 1}
                type="page"
                value={index + 1}
                onClick={() => handlePageChange(index + 1)}
                _selected={{
                  bg: isActive ? "blue.500" : "gray.100",
                  color: isActive ? "white" : "black",
                }}
              >
                {index + 1}
              </PaginationItem>
            );
          })}

          <PaginationNextTrigger
            onClick={() => handlePageChange(page + 1)}
            disabled={page === Math.ceil(count / pageSize)}
          >
            ▶
          </PaginationNextTrigger>
        </HStack>
      </PaginationRoot>
    </Stack>
  );
};
