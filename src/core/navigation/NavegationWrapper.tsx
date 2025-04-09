import { createBrowserRouter } from "react-router";
import RegisterUser from "../../features/users/presentation/pages/RegisterUser";
import Dashboard from "../../features/dashboard/presentation/pages/Dashboard";
import UserManagement from "../../features/users/presentation/pages/UserManagement";
import FilmHubManagement from "../../features/FilmHub/presentation/pages/FilmHubManagement";
import { RegisterUserModel } from "../../features/users/presentation/viewmodels/RegisterUserModel";

const registerUserModel = new RegisterUserModel();

export const navigationWrapper = createBrowserRouter([
    {
        path: "/users",
        element: <UserManagement />,
    },
    {
        path: "/users/register",
        element: <RegisterUser viewModel={registerUserModel} />,
    },
    {
        path: "/filmhub",
        element: <FilmHubManagement />,
    },
    {
        path: "/",
        element: <Dashboard />,
    }
]);