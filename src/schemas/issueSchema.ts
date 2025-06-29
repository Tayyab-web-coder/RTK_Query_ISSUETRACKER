import * as yup from "yup";

export const issueSchema = yup.object({
    title: yup.string().trim().required("Title is required").min(3, "Title must be at least 3 characters long").max(100, "Title cannot exceed 100 characters"),
    description: yup.string().trim().required("Description is required").min(10, "Description must be at least 10 characters long").max(500, "Description cannot exceed 500 characters"),
    type: yup.string().oneOf(["open", "in-progress", "closed"], "Invalid type").required("Type is required"),
    priority: yup.string().oneOf(["Low", "Medium", "High"], "Invalid priority").required("Priority is required"),
    tags: yup.string().trim().required('Must enter tags').max(50, "Tags cannot exceed 50 characters"),
});