import FacultyAdd from './components/FacultyAdd';
import Home from './components/Home';
import News from './components/News';
import Login from './components/Login';
import Student from './components/Student';
import Faculty from './components/Faculty';
import StudentAdd from './components/StudentAdd';
import NewsEventsAdd from './components/NewsEvents';


import React, { useContext } from 'react';
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
function App() {
  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/login' />
  }
  // console.log(currentUser)
  return (
    <div className="">
    
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='login' element={<Login/>} />
            <Route 
              index 
              element={
                <RequireAuth>
                  <Home/>
                </RequireAuth>
              }
            />
            <Route 
              path='/student'
              element={
                <RequireAuth>
                  <Student/>
                </RequireAuth>
              }
            />
            <Route 
              path='/faculty'
              element={
                <RequireAuth>
                  <Faculty/>
                </RequireAuth>
              }
            />
            <Route 
              path='/new'
              element={
                <RequireAuth>
                  <News/>
                </RequireAuth>
              }
            />
            <Route 
              path='/faculty_add'
              element={
                <RequireAuth>
                  <FacultyAdd/>
                </RequireAuth>
              }
            />
            <Route 
              path='/student_add'
              element={
                <RequireAuth>
                  <StudentAdd/>
                </RequireAuth>
              }
            />
            <Route 
              path='/new_add'
              element={
                <RequireAuth>
                  <NewsEventsAdd/>
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
