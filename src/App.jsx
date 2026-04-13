import { Routes, Route } from 'react-router-dom'
import Invitation from './pages/Invitation';
import JoinersPage from './pages/JoinersPage';
import ListIdPage from './pages/ListIdPage';
import BackgroundMusic from './components/BackgroundMusic';

export default function App() {
  return (
    <>
      <BackgroundMusic />
      <Routes>
        <Route path="/" element={<Invitation />} />
        <Route path="/joiners" element={<JoinersPage />} />
        <Route path="/wedding/listid" element={<ListIdPage />} />
      </Routes>
    </>
  );
}
