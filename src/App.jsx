import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Homepage } from './pages/Homepage';
import { SinglePage } from './pages/SinglePage';



function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path='/:id' element={<SinglePage />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
