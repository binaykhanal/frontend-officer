import React from "react";
import { supabase } from "../supabase/supabaseClient";
import { Button } from "antd";


const Auth = () => {
  const signInWithProvider = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });

      if (error) {
        console.error(`Error signing in with ${provider}:`, error.message);
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {/* Button to sign in with Google */}
      <Button
        type="primary"
        onClick={() => signInWithProvider("google")}
        className="mb-4"
      >
        Login with Google
      </Button>

      {/* Button to sign in with GitHub */}
      <Button type="primary" onClick={() => signInWithProvider("github")}>
        Login with GitHub
      </Button>
    </div>
  );
};

export default Auth;
