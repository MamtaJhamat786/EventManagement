import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Shipments from "./views/Shipments";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Shipments />} />
                    <Route path="/shipments" element={<Shipments />} />
                    <Route path="/shipments/:id" element={<Shipments />}  />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </div>
  );
}

export default App;
