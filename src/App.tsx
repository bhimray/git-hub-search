import React from "react";
import "./App.css";
import Index from "./Components/Index";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="App">
        <Index />
      </div>
    </QueryClientProvider>
  );
}

export default App;
