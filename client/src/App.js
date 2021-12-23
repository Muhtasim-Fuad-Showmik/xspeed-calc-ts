import React from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import ScreenA from './components/screenA';
import ScreenB from './components/screenB';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<ScreenA />} />
                <Route exact path="/screenb" element={<ScreenB />} />
            </Routes>
        </Router>
    );;
}
 
export default App;