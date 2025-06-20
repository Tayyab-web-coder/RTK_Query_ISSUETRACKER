import { useForm } from "react-hook-form"
import { issueSchema } from "../../schemas/issueSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader } from "../../components/Loader";
type IssueFormValues = {
  title: string;
  description: string;
  type: "open" | "in-progress" | "closed";
  priority: "Low" | "Medium" | "High";
  tags: string;
};

export const IssueForm = ({
  btnText = 'Submit',
  issue = {
    title: "",
    description: "",
    type: "open" as "open",
    priority: "Low" as "Low",
    tags: ""
  },
  submit,
  loading = false
}: {
  btnText?: string;
  issue?: IssueFormValues;
  submit: (data: IssueFormValues) => void;
  loading?: boolean;
}) => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<IssueFormValues>({
    resolver: yupResolver(issueSchema),
    defaultValues: issue
  })
  return (
    <>
      {loading && <Loader />}
      <form onSubmit={handleSubmit((data)=>{
        submit(data)
        reset();
        })} className="issue-form">
          <div className="title">
        <input type="text" className={`${errors.title && 'error-Input'}`} placeholder="Enter Title..." {...register('title')} />
        {errors.title && <p className="error">{errors.title.message}</p>}
          </div>
          <div className="description">
        <textarea placeholder="Enter a Description" className={`${errors.description && 'error-Input'}`}  {...register('description')}></textarea>
        {errors.description && <p className="error">{errors.description.message}</p>}
          </div>
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
        <div className="tags">
        <input type="text" className={`${errors.tags && 'error-Input'}`} placeholder="Enter a Tags..." {...register('tags')} />
        {errors.tags && <p className="error">{errors.tags.message}</p>}
        </div>
        <button>{btnText}</button>
      </form>
    </>
  )
}

