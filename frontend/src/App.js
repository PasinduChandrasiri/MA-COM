import { Routes, Route } from 'react-router-dom';
import { ContactUs,HomePage } from './Pages';

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/ContactUs' element={<ContactUs />} />
    </Routes>
  );
} 

export default App;