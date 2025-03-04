import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
