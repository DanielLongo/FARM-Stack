import { useContext } from 'react';
import { GlobalProvider, GlobalContext } from './state/GlobalState';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Home from './pages/Home';
import Landing from './pages/Landing';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { isAuthed } = useContext(GlobalContext);

  return (
    <GlobalProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {isAuthed ? (
            <Route path="/home" element={<Home />} />
          ) : (
            <Route path="/" element={<Landing />} />
          )}
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
