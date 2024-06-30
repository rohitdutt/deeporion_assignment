import './App.css';
import Login from "./pages/Login";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import ProtectedRoute from "./component/ProtectedRoute";
import EmployeeList from "./pages/EmployeeList";
import DepartmentManagement from "./pages/DepartmentManagement";
import ManagerRoute from "./routes/ManagerRoute";

function App() {

    return (
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path="/employees" element={<ProtectedRoute />}>
                <Route index element={<EmployeeList />} />
            </Route>
            <Route element={<ManagerRoute />}>
                <Route path="/departments" element={<DepartmentManagement />} />
            </Route>
        </Routes>
    );
}

export default App;
