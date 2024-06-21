import './App.css';
import {createBrowserRouter,RouterProvider} from  'react-router-dom';
import RootLayout from './components/rootLayout/RootLayout';
import Home from './components/home/Home'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/login',
          element:<Login/>,
        },{
          path:'/signup',
          element:<Signup/>
        },
      ]
    }
  ])

  return (
    <div className="app-main">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
