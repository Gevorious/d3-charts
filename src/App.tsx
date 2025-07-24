import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BarChartPage from './pages/BarChartPage';
import ChoroplethMapPage from './pages/ChoroplethMapPage';
import Layout from '@components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bar-chart" element={<BarChartPage />} />
          <Route path="/choropleth-map" element={<ChoroplethMapPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
