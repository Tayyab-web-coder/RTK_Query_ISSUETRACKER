import { useDeleteUserIssueMutation } from "../../api/issueApiSlice";
import { NavLink } from "react-router-dom";
import { showConfirmDialog } from '../../components/ConfirmDialog';
type Issue = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  type: 'open' | 'in-progress' | 'closed';
  priority: 'Low' | 'Medium' | 'High';
};

export const IssueItem = ({ issue }: { issue: Issue }) => {
  const [deleteUserIssue] = useDeleteUserIssueMutation();

  const handleDelete = async () => {
  const confirmed = await showConfirmDialog({
    title: 'Delete this issue?',
    text: 'This will permanently remove the issue.',
  });

  if (confirmed) {
    deleteUserIssue({ id: issue.id })
  }
};

  return (
    <div className="issue-card">
      <div className="issue-header">
        <h3 className="issue-title">{issue.title}</h3>
        <span className="issue-date">
          {new Date(issue.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="issue-description">{issue.description}</p>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>

        <div className="issue-tags">
          <span className={`issue-status ${issue.type}`}>
            {issue.type.toUpperCase()}
          </span>

          <span className={`issue-priority ${issue.priority}`}>
            {issue.priority.toUpperCase()}
          </span>
        </div>

        <div className="issue-actions">
          <NavLink to={`/edit/${issue.id}`}>
          <button className="btn update">
            Update
            </button>
          </NavLink>
          <button className="btn delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};
