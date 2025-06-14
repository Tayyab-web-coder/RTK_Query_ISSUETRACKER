import { useGetUserIssueQuery } from "../../api/issueApiSlice"
export const IssueList = () => {
    const { data } = useGetUserIssueQuery();
    console.log(data);
    
    return (
        <div>IssueList</div>
    )
}
