import { useState } from 'react';
import './App.css';
import { Main } from './components/layout';
import { AppStateProvider } from './components/state';

function App() {
  return <AppStateProvider>
    <Main />
  </AppStateProvider>
}

export default App;
