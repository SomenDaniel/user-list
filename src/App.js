import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import "./App.css";
import EditPage from "./components/EditPage";
import NewUserPage from "./components/NewUserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/edit/:id" element={<EditPage />}></Route>
        <Route path="/new" element={<NewUserPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
