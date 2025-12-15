import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicPage from './page/PublicPage'
// import AdminPage from './page/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="*" element={<PublicPage />} />
          {/* <Route path="/admin/*" element={<AdminPage />} /> */}
        </Routes>
      </ThemeProvider>
    </BrowserRouter >
  );
}

export default App;