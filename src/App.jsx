
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route";
import 'react-toastify/dist/ReactToastify.css';


function App() {
 
  return (
    <>

      <RouterProvider router={router} />
    </>
  );
}

export default App;
