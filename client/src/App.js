import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome To John Keells UMS</h1>
        <button className= "user-button" onClick={() => navigate('/candidates')}>Users</button>
      </header>
    </div>
  );
}

export default App;
