
import React, { useCallback, useEffect, Suspense, useState } from "react";
import UserCard from "./components/UserCard";
import { getUsers } from "./Api";
import "./App.css";

const About = React.lazy(() => import("./components/About"));

function App(){

  const [users,setUsers] = useState([]);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(()=>{
    getUsers().then((data) => setUsers(data))
  },[]);

  const toggleAbout = useCallback(() => {
    setShowAbout((prev) => !prev)
  }, [])

    return (
    <div className="app-container">
      <h1>React Performance Demo</h1>

      <button onClick={toggleAbout}>Toggle About </button>

      {showAbout && 
      (

        <Suspense fallback={<p>Loading...</p>}>

          <div className="about-box">
            <About />
          </div>
          
        </Suspense>

      )}

      <h2>Users List</h2>

      {users.map((u) => 
      (
        <UserCard key={u.id} user={u} />
      ))
      }

    </div>
  );

}

export default App