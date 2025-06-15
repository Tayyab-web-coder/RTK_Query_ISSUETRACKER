import { toast } from "react-toastify";
import { useGetUserIssueQuery } from "../../api/issueApiSlice"
import { Loader } from "../../components/Loader";
import { IssueItem } from "./IssueItem";
import {  useEffect, useState } from "react";
export const IssueList = () => {
    const [active, setActive] = useState("all");

    let { data, isFetching, isError, error } = useGetUserIssueQuery();
  const filteredData = data?.filter((issue) => {
    if (active === "low") return issue.priority === "Low";
    if (active === "medium") return issue.priority === "Medium";
    if (active === "high") return issue.priority === "High";
    return true;
  });

    useEffect(() => {
        if (error && isError) {
            toast.error(`Error fetching issues: ${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }, [error, isError, data]);


    return (
        <>
            <div className="filter-buttons">
                <button className={`${active=='all' && 'active'} btn`} onClick={() => setActive('all')}>All</button>
                <button className={`${active=='low' && 'active'} btn`} onClick={() => setActive('low')}>Low</button>
                <button className={`${active=='medium' && 'active'} btn`} onClick={() => setActive('medium')}>Medium</button>
                <button className={`${active=='high' && 'active'} btn`} onClick={() => setActive('high')}>High</button>
            </div>
            {
                isFetching ? (
                    <Loader />
                )
                    : (
                        <div className="issue-list">
                            {isError ? (
                                <p className="error">
                                    Error fetching issues: {
                                        error
                                            ? typeof error === "string"
                                                ? error
                                                : "status" in error
                                                    ? `Status: ${error.status}${error.data ? `, Data: ${JSON.stringify(error.data)}` : ""}`
                                                    : "message" in error
                                                        ? error.message
                                                        : "Unknown error"
                                            : "Unknown error"
                                    }
                                </p>
                            ) : (

                                filteredData && filteredData?.length > 0 ? (
                                    filteredData.map((issue: any) => (
                                        <div key={issue.id} className="issue-item">
                                            <IssueItem issue={issue} />
                                        </div>
                                    ))
                                ) : (
                                    <p className="error">No issues found.</p>
                                )
                            )}
                        </div>
                    )
            }
        </>
    )
}
