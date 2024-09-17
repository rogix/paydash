import { useState, useCallback, useEffect } from "react";
import { Transaction } from "../types";

const usePagination = (items: Transaction[], itemsPerPage: number) => {
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState<Transaction[]>([]);
  const [itemOffset, setItemOffset] = useState(0);

  const updatePaginationData = useCallback(
    (items: Transaction[], offset: number) => {
      const newPageCount = Math.ceil(items.length / itemsPerPage);
      const newCurrentItems = items.slice(offset, offset + itemsPerPage);
      setPageCount(newPageCount);
      setCurrentItems(newCurrentItems);
    },
    [itemsPerPage]
  );

  useEffect(() => {
    updatePaginationData(items, itemOffset);
  }, [itemOffset, items, updatePaginationData]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return { pageCount, currentItems, handlePageClick };
};

export default usePagination;