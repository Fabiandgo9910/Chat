import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import Login  from "./components/login";
import socketIO from 'socket.io-client';


const socket = socketIO.connect('http://localhost:4000' );
function App() {
  return (
    <BrowserRouter>
<div>
        <Routes>
          <Route path="/" element={<Home  />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          <Route path="/login" element={<Login socket={socket} />}></Route>
        </Routes>
</div>
    </BrowserRouter>
  );
}

export default App;