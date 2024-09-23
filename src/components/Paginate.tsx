import ReactPaginate from "react-paginate";

interface Props {
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
}

export function Paginate({ pageCount, handlePageClick }: Props) {
  return (
    <div className="flex justify-center mt-12">
      <ReactPaginate
        onPageChange={handlePageClick}
        pageCount={pageCount}
        containerClassName={"flex space-x-2"}
        pageLinkClassName={
          "px-3 py-1 border border-gray-300 rounded hover:bg-slate-500"
        }
        previousLabel={"Prev"}
        nextLabel={"Next"}
        previousLinkClassName={
          "px-3 py-1 border border-gray-300 rounded hover:bg-slate-500"
        }
        nextLinkClassName={
          "px-3 py-1 border border-gray-300 rounded hover:bg-slate-500"
        }
        activeLinkClassName={"bg-slate-600"}
      />
    </div>
  );
}
