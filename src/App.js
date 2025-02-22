import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Group from "./Group";
import './App.css';
import Liste from "./liste";
import Modifier from "./modifier";

export default function App() {
    return (
        <div>
            <div className="navbar">
                <Link to='/' className="decoration" style={{ marginLeft: "10px", textDecoration: "none" }}>Accueil</Link>
            </div>

            <Routes>
                <Route path="/" element={<Group />} />
                <Route path="/Liste/:nom" element={<Liste />} />
                <Route path="/modifier/:id" element={<Modifier />} />
            </Routes>
        </div>
    );
}
