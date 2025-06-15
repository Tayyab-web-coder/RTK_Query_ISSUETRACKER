import { useGetUserIssueByIdQuery } from "../api/issueApiSlice"
import { IssueForm } from "../features/issues"
import { useParams, useNavigate } from "react-router-dom"
import { Loader } from "../components/Loader"
import { useUpdateUserIssueMutation } from "../api/issueApiSlice"
import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"

export const EditIssuePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [updateUserIssue,{isSuccess}] = useUpdateUserIssueMutation();

  if (!id) return <div>Issue not found</div>
  const { data: issue, error, isLoading } = useGetUserIssueByIdQuery({ id })
    useEffect(() => {
      if (isSuccess) {
        toast.success("Issue created successfully!")
      }
    }, [isSuccess]);
  const OnSubmit = (data: any) => {
    console.log({ data });
    
    updateUserIssue({data });
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }

  return (
    <>
          <ToastContainer />
    <div className="centered-container">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>Please Enter Correct Id</div>
      ) : (
        <IssueForm btnText="Edit Issue" issue={issue as any} submit={OnSubmit} loading={isLoading} />
      )}
    </div>
      </>
  )
}

