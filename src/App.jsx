
import './App.css';
import './index.css'
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

function App() {
  return (
   <Router>
   <Routes>
   <Route exact path="" element={<SignUp />} />
   </Routes>
   </Router>
  );
}

export default App;
