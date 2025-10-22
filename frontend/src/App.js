
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<TaskForm isEdit={false} />} />
          <Route path="/edit/:id" element={<TaskForm isEdit={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;