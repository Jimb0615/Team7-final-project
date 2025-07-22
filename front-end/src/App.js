import { NewsReader } from './NewsReader';
import './App.css';

function App() {
  return (
    <div
      style={{
        backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        backgroundColor: '#ffffff',
        minHeight: '100vh',
      }}
    >
      <header className="app-header">
        <h1>Git'r Done News Reader</h1>
        <p>Shift gears to smarter news — save it, read it, Git’r Done!</p>
      </header>
      <NewsReader />
    </div>
  );
}

export default App;
