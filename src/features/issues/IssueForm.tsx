import { useForm } from "react-hook-form"
import { issueSchema } from "../../schemas/issueSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateUserIssueMutation } from "../../api/issueApiSlice";
import { Loader } from "../../components/Loader";
export const IssueForm = ({ }) => {
  const [createUserIssue, { isLoading }] = useCreateUserIssueMutation();
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    resolver: yupResolver(issueSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "open",
      priority: "Low",
      tags: ""
    }
  })
  const OnSubmit = (data: any) => {
    createUserIssue(data);
    console.log(data);
    reset({
      title: '',
      description: '',
      type: 'open',
      priority: 'Low',
    });

  }
  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(OnSubmit)} className="issue-form">
        <input type="text" placeholder="Enter Title..." {...register('title')} />
        {errors.title && <p className="error">{errors.title.message}</p>}
        <textarea placeholder="Enter a Description"  {...register('description')}></textarea>
        {errors.description && <p className="error">{errors.description.message}</p>}
        <select {...register('type')}>
          <option value="open">open</option>
          <option value="in-progress">in-progress</option>
          <option value="closed">closed</option>
        </select>
        <select  {...register('priority')}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input type="text" placeholder="Enter a Tags..." />
        <button>Submit</button>
      </form>
    </>
  )
}

