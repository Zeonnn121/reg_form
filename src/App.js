import './App.css';
import React from 'react';
import Contact from './components/Contact';
import RegistrationForm from './components/Registrationform.tsx';
function App() {
  return (
   <div className='container'>
    <RegistrationForm/>
      <Contact/>
    </div>
  );
}

export default App;
