import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { Button, Input, Form } from "antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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

  const handleLogin = async (values) => {
    setLoading(true);
    const { email, password } = values;
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Error logging in:", error.message);
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 shadow-lg rounded-lg ">
        <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>

        {/* Login Form */}
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={handleLogin}
          className="mb-6"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <div className="text-center text-gray-500 my-4">OR</div>

        {/* Button to sign in with Google */}
        <Button
          type="primary"
          icon={<GoogleOutlined />}
          onClick={() => signInWithProvider("google")}
          className="w-full mb-4 flex items-center justify-center"
        >
          Login with Google
        </Button>

        {/* Button to sign in with GitHub */}
        <Button
          type="primary"
          icon={<GithubOutlined />}
          onClick={() => signInWithProvider("github")}
          className="w-full flex items-center justify-center"
        >
          Login with GitHub
        </Button>
      </div>
    </div>
  );
};

export default Auth;
