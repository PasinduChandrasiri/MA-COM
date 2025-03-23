import { Routes, Route } from 'react-router-dom';
import { ContactUs, HomePage, Login, ForgotPassword, SignUp, Settings,ManagementPage } from './Pages';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/HomePage' element={<HomePage />} />
      <Route path='/ContactUs' element={<ContactUs />} />
      <Route path='/ForgotPassword' element={<ForgotPassword />} />
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/Settings' element={<Settings />} />
      <Route path='/ManagementPage' element={<ManagementPage />} />
    </Routes>
  );
}

export default App;