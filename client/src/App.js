
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="App bg-richblack-100 h-screen flex justify-center items-center ">
   <Toaster position="top-center" />
   <RegistrationForm/>

    </div>
  );
}

export default App;
