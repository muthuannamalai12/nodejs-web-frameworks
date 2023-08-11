import React from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
const supabase = createClient(
    process.env.REACT_APPLICATION_SUPABASE_URL,
    process.env.REACT_APPLICATION_SUPABASE_API_KEY
); 
function Login() {
  const navigate = useNavigate();
  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
      navigate("/success");
    } else {
      navigate("/login");
    }
  });
  return (
    <div className="App">
      <header className="App-header">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google", "facebook", "github"]}
        />
      </header>
    </div>
  );
}
export default Login;
