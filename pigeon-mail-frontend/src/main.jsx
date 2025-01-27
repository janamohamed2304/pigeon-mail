import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PigeonMail from './PigeonMail.jsx';
import SignIn from './sign-in/SignIn.jsx';
import SignUp from './sign-up/SignUp.jsx';

function App() {
  return (
    <>
  <Router>
    <Routes>
      {/* Define routes for your pages */}
      <Route path="/" element={<PigeonMail />} /> {/* Default/home page */}
      <Route path="/signin" element={<SignIn />} /> {/* Sign-in page */}
      <Route path="/signup" element={<SignUp />} /> {/* Sign-up page */}
    </Routes>
  </Router>
  </>
);
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
