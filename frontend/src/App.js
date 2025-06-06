import { Routes, Route } from 'react-router-dom';
import { ContactUs, HomePage, Login, ForgotPassword, SignUp, AttendanceMarking, AttendanceView, CashRequest, CashApprove, Feedback, LandingPage, Settings, ManagementPage,FileHandling } from './Pages';

function App() { 

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/HomePage' element={<HomePage />} />
      <Route path='/ContactUs' element={<ContactUs />} />
      <Route path='/ForgotPassword' element={<ForgotPassword />} />
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/AttendanceMarking' element={<AttendanceMarking />} />
      <Route path='/AttendanceView' element={<AttendanceView />} />
      <Route path='/CashRequest' element={<CashRequest />} />
      <Route path='/CashApprove' element={<CashApprove />} />
      <Route path='/Feedback' element={<Feedback />} />
      <Route path='/FileHandling' element={<FileHandling />} />
      <Route path='/Settings' element={<Settings />} />
      <Route path='/ManagementPage' element={<ManagementPage />} />
    </Routes>
  );
}

export default App;