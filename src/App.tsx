import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import NavBar from "./components/NavBar";
import { Provider } from 'react-redux'
import Home from "./views/Home";
import store from "./store";
import SingleTicket from "./views/SingleTicket";

const queryClient = new QueryClient()

function App() {

  return (
    <div className="App" style={{ backgroundColor: '#F4F4F6', height: '100vh'}}>

            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/events" element={<Home />} />
                        <Route path="/events/:id" element={<SingleTicket />} />
                    </Routes>
                </Provider >
            </QueryClientProvider>

    </div>
  );
}

export default App;
