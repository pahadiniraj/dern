import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import RegisterUser from "../Pages/User/RegisterUser";
import Login from "../Pages/User/Login";
import NotfoundPage from "../Pages/NotfoundPage";
import RequestCreate from "../Pages/Request/RequestCreate";
import RequestIndex from "../Pages/Request/RequestIndex";
import ViewRequest from "../Pages/Request/ViewRequest";
import RepairIndex from "../Pages/RepairJob/RepairIndex";
import RepairView from "../Pages/RepairJob/RepairView";
import ArticleIndex from "../Pages/Articles/ArticleIndex";
import ArticleCrreate from "../Pages/Articles/ArticleCrreate";
import ArticleEdit from "../Pages/Articles/ArticleEdit";
import SpareCreate from "../Pages/Sparepart/SpareCreate";
import ViewArticle from "../Pages/Articles/ViewArticle";
import SpareIndex from "../Pages/Sparepart/SpareIndex";
import SpareEdit from "../Pages/Sparepart/SpareEdit";
import JobIndex from "../Pages/JobManagement/JobIndex";
import Users from "../Pages/User/Users";
import Profile from "../Pages/User/Profile";
import Changepass from "../Pages/User/Changepass";
import Forgetpass from "../Pages/User/Forgetpass";
import Resetpass from "../Pages/User/Resetpass";
import Index from "../Pages/Dashboard/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Index />,
      },
      {
        path: "/Request/create",
        element: <RequestCreate />,
      },
      {
        path: "/",
        element: <RequestIndex />,
      },

      {
        path: "/Request/view/:id",
        element: <ViewRequest />,
      },
      {
        path: "/repair",
        element: <RepairIndex />,
      },
      {
        path: "/repair/view/:id",
        element: <RepairView />,
      },
      {
        path: "/articles",
        element: <ArticleIndex />,
      },
      {
        path: "/article/create",
        element: <ArticleCrreate />,
      },
      {
        path: "/article/edit/:id",
        element: <ArticleEdit />,
      },
      {
        path: "/article/view/:id",
        element: <ViewArticle />,
      },
      {
        path: "/sparePart",
        element: <SpareIndex />,
      },
      {
        path: "/sparePart/create",
        element: <SpareCreate />,
      },
      {
        path: "/sparePart/edit/:id",
        element: <SpareEdit />,
      },
      {
        path: "/dailyJob",
        element: <JobIndex />,
      },
      {
        path: "/userLists",
        element: <Users />,
      },
      {
        path: "/userinfo",
        element: <Profile />,
      },
      {
        path: "/changePassword",
        element: <Changepass />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterUser />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgetpassword",
    element: <Forgetpass />,
  },
  {
    path: "/resetpass",
    element: <Resetpass />,
  },
  {
    path: "/auth/resetpassword/:token",
    element: <Resetpass />,
  },

  {
    path: "/*",
    element: <NotfoundPage />,
  },
]);

export { router };
