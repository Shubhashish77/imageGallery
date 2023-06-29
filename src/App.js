import './App.css';
import { ImageProvider } from './context/imageContext';
import Homepage from './pages/Homepage';

function App() {
  return (
    <ImageProvider>
      <div className='app'>
        <Homepage />
      </div>
    </ImageProvider>
  );
}

export default App;