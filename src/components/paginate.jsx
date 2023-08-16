import ReactPaginate from "react-paginate";

export default function MyPaginate({page, lastPage, setPage}){

    return (
        <div className={"d-flex justify-content-end"}>
            <ReactPaginate
                initialPage = {page - 1}
                forcePage = {page - 1}
                previousLabel={'«'}
                breakLabel={'...'}
                nextLabel={'»'}
                pageCount={lastPage}
                marginPagesDisplayed={5}
                pageRangeDisplayed={8}
                onPageChange={(e) => (setPage(e.selected+1))}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    );
}