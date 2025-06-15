import { IssueForm } from "../features/issues"
import { useCreateUserIssueMutation } from "../api/issueApiSlice";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export const CreateIssuePage = () => {
  const [createUserIssue, { isSuccess }] = useCreateUserIssueMutation();

  useEffect(() => {
    if (isSuccess) {
      // Show success notification
      toast.success("Issue created successfully!")
      console.log("✅ Issue created successfully");

    }
  }, [isSuccess]);

  const OnSubmit = (data: any) => {
    createUserIssue(data);
    console.log("Creating issue with data:", data);
  }
  return (
    <div className="centered-container">
      <ToastContainer />
      <IssueForm btnText="Create Issue" submit={OnSubmit} />
    </div>
  )
}
