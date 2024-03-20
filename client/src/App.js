import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Home } from "./pages/home/Home";
import { Navbar } from "./componants/navbar/Navbar";
import { Footer } from "./componants/footer/Footer";
import { Profile } from "./pages/profile/Profile";
import { Post } from "./componants/post/Post";
import { Write } from "./pages/write/Write";
import { Pp } from "./componants/footer/pp/Pp";
import { Question } from "./componants/question/Question";

function App() {
  const Layout=()=>{
    return (
      <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path: "/",
          element: <Home/>,
        },
        {
          path:'/post/:id',
          element:<Post/>
        },
        {
          path:'/write',
          element:<Write/>
        },
        {
          path:'/question/:id',
          element:<Question/>
        }
      ]
    },
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:"/profile/:id",
          element:<Profile/>
        },
        {
          path:"/pp",
          element:<Pp/>
        }

      ]
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    }
  ]);
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>    
    </div>
  );
}

export default App;
