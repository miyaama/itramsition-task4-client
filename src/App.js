import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import "antd/dist/antd.css";
import AuthorizationPage from "./pages/AuthorizationPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import { IS_LOGIN_LOCAL_STORAGE } from "./constants";
import axios from "axios";

function App() {
  const [userStatus, setUserStatus] = useState("");
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem(IS_LOGIN_LOCAL_STORAGE));

  useEffect(() => {
    const fetchUserStatusById = async (id) => {
      const result = await axios.get(
        `https://fathomless-headland-55323.herokuapp.com/api/get/${id}`
      );
      setUserStatus(result.data.status);
    };

    const id = userData?.id;

    if (id) {
      fetchUserStatusById(id);
    }
  }, []);

  useEffect(() => {
    if (userStatus === "active") {
      navigate("/users");
    } else {
      navigate("/");
    }
  }, [userStatus]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </div>
  );
}

export default App;
