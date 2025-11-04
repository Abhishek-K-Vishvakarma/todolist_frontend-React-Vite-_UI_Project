
// import './App.css'
import Home from './components/Home';
import Add_To_Do_List from "./components/Add_To_Do_List";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './components/List';
import Edit from './components/Edit';
// import Authentications from './components/Auth';
import Sign from '../user/Sign';
import EmailandOtpVerify from '../user/EmailandOtpVerify';
import Login from '../user/Login';
import Logout from '../user/Logout';
import UserProfile from '../user/UserProfile';
import Forgotpassword from '../user/Forgotpassword';
import Resetpassword from '../user/Resetpassword';
import { UserProvider } from './components/UserContext';
import ImageUpload from '../user/ImageUpload';
function App() {
  return (
    <>
      <UserProvider>
      <BrowserRouter>
        {/* <Authentications> */}
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/add' element={<Add_To_Do_List />}></Route>
            <Route path='/list' element={<List />}></Route>
            <Route path='/edit' element={<Edit />}></Route>
            <Route path='/sign' element={<Sign />}></Route>
            <Route path='/verify' element={<EmailandOtpVerify/>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
            <Route path='/userprofile' element={<UserProfile />}></Route>
            <Route path='/forgot-password' element={<Forgotpassword/>}></Route>
            <Route path='/reset-password' element={<Resetpassword />}></Route>
            <Route path='/image' element={<ImageUpload />}></Route>
          </Routes>
        {/* </Authentications> */}
      </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
