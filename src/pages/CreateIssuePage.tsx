import { IssueForm } from "../features/issues"
import { useCreateUserIssueMutation } from "../api/issueApiSlice";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const CreateIssuePage = () => {
  const navigate = useNavigate();
  const [createUserIssue, { isSuccess }] = useCreateUserIssueMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Issue created successfully!")
    }
  }, [isSuccess]);

  const OnSubmit = (data: any) => {
    createUserIssue(data);
      setTimeout(() => {
      navigate('/');
    }, 3000);
  }
  return (
    <div className="centered-container">
      <ToastContainer />
      <IssueForm btnText="Create Issue" submit={OnSubmit} />
    </div>
  )
}
