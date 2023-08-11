import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const supabase = createClient(
    process.env.REACT_APPLICATION_SUPABASE_URL,
    process.env.REACT_APPLICATION_SUPABASE_API_KEY
);
function Success() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);
  const avatar = user?.user_metadata?.avatar_url;
  const userName = user?.user_metadata?.full_name;
  async function signOutUser() {
    await supabase.auth.signOut();
    navigate("/login");
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Login Successful</h1>
        <h2>{userName}</h2>
        <img src={avatar} />
        <button onClick={() => signOutUser()}>Sign Out</button>
      </header>
    </div>
  );
}
export default Success;
