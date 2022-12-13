import React from "react";
import "./App.css";
import Index from "./Components/Index";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Components/Details";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/details/:name/:reponame" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
