import { useGetUserIssueByIdQuery } from "../api/issueApiSlice"
import { IssueForm } from "../features/issues"
import { useParams } from "react-router-dom"
import { Loader } from "../components/Loader"
import { useUpdateUserIssueMutation } from "../api/issueApiSlice"
export const EditIssuePage = () => {
  const { id } = useParams<{ id: string }>();
  const [updateUserIssue] = useUpdateUserIssueMutation();

  if (!id) return <div>Issue not found</div>
  const { data: issue, error, isLoading } = useGetUserIssueByIdQuery({ id })
  
  const OnSubmit = (data: any) => {
    console.log({ data });
    
    updateUserIssue({data });
  }
  return (
    <div className="centered-container">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>Error loading issue</div>
      ) : (
        <IssueForm btnText="Edit Issue" issue={issue as any} submit={OnSubmit} loading={isLoading} />
      )}
    </div>
  )
}

