import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Home = () => { 
    const { user } = useContext(AuthContext);
    
    return (
        <main>
            <h1>Home</h1>
            <br />
            {user ? <p>Hello, {user.username}.</p> : <p>Hello, world.</p>}
            <Link to='/dashboard'><button>Dashboard</button></Link>
            <Link to="/login"><button>Login</button></Link>
        </main>
    );
}

export default Home;