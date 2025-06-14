import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { EditIssuePage } from "../pages/EditIssuePage";
import { CreateIssuePage } from "../pages/CreateIssuePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { App } from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: 'edit/:id', element: <EditIssuePage /> },
            { path: 'create', element: <CreateIssuePage /> },
        ],
    },
    {
        path: '*', element: <NotFoundPage />
    }
]);