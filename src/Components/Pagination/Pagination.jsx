import { useState, useEffect } from "react";
import { getPageCount } from "../../API/utils";
import Servise from "../../API/LoadData";
import styled from "./Pagination.module.scss";

export default function Pagination({ posts, setPosts, settings }) {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(settings.limit);

    useEffect(() => {
        let ignore = false;

        const fetchingPost = async () => {
            const response = await Servise.getAll(limit, page, settings.url);
            setPosts([...posts, ...response.data]);
            const totalCount = response.headers["x-total-count"];
            setTotalPages(getPageCount(totalCount, limit));
        };

        !ignore && fetchingPost();

        return () => {
            ignore = true;
        };
    }, [page]);

    const changePage = () => setPage((page) => ++page);

    return (
        <div className={styled.pagination}>
            {totalPages !== page && (
                <button className={styled.button} onClick={changePage}>
                    Next
                </button>
            )}
        </div>
    );
}
