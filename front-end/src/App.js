import { NewsReader } from './NewsReader';
import './App.css';

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>Git'r Done News Reader</h1>
        <p>Curate and browse your favorite headlines</p>
      </header>
      <NewsReader />
    </div>
  );
}

export default App;