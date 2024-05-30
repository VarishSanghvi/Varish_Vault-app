// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import FileUpload from './components/FileUpload/FileUpload';
import FileList from './components/FileList/FileList';
import Home from './components/HomePage/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<ProtectedRoute><FileUpload /></ProtectedRoute>} />
          <Route path="/files" element={<ProtectedRoute><FileList /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;



// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Register from './components/Auth/Register';
// import Login from './components/Auth/Login';
// import FileUpload from './components/FileUpload/FileUpload';
// import FileList from './components/FileList/FileList';
// import Home from './components/HomePage/Home';
// import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/Footer';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/upload" element={<ProtectedRoute><FileUpload /></ProtectedRoute>} />
//           <Route path="/files" element={<ProtectedRoute><FileList /></ProtectedRoute>} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;
