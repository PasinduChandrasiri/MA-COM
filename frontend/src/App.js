import { Routes, Route } from 'react-router-dom';
import { ContactUs, HomePage, Login, ForgotPassword, SignUp, AttendanceMarking, Feedback } from './Pages';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/HomePage' element={<HomePage />} />
      <Route path='/ContactUs' element={<ContactUs />} />
      <Route path='/ForgotPassword' element={<ForgotPassword />} />
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/AttendanceMarking' element={<AttendanceMarking />} />
      <Route path='/Feedback' element={<Feedback />} />
    </Routes>

  );
}

export default App;