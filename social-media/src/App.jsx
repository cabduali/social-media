import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppContext from './components/AppContext/AppContext';
import Pages from './Pages/Pages'; // Corrected path

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContext>
          <Pages />
        </AppContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
