import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import Tasks from './pages/Tasks';
import Team from './pages/Team';
import { AppProvider } from './context/AppContext';
import './App.css';
import './styles.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <AdminSidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/add-project" element={<Add />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

