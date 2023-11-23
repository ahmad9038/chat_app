import React, { useState } from "react";
import styles from "../css/login.module.css";
import { BiShow, BiHide } from "react-icons/bi";
import { Box, useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: false, // Added showPassword state
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const toggleShowPassword = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const postData = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { email, password } = user;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.error === "Enter All Info") {
      toast({
        description: "fill all fields",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    } else if (data.error || !data) {
      toast({
        description: "Invalid Credentials",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        description: "Login SuccessFull",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chat");
    }
  };

  return (
    <Box className={styles.parent} width={"100%"}>
      <div className={styles.container}>
        <h1>Welcome Back!</h1>
        <form method="POST">
          <div className={styles.inputContainer}>
            <input
              type="email"
              name="email"
              onChange={handleInputs}
              value={user.email}
              required
            />
            <label htmlFor="username">Email</label>
          </div>
          <div className={`${styles.inputContainer} ${styles.passwordInput}`}>
            <input
              type={user.showPassword ? "text" : "password"} // Toggle input type
              name="password"
              onChange={handleInputs}
              value={user.password}
              required
            />
            <label htmlFor="password">Password</label>
            {user.showPassword ? (
              <BiShow
                className={styles.eyeIcon}
                onClick={toggleShowPassword} // Toggle showPassword state on icon click
              />
            ) : (
              <BiHide
                className={styles.eyeIcon}
                onClick={toggleShowPassword} // Toggle showPassword state on icon click
              />
            )}
          </div>
          <button onClick={postData} type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : "Login"}
          </button>
        </form>
        <div style={{ marginTop: "20px" }}>
          <strong>for quick testing</strong>
          <br />
          <strong>Email:</strong> ahmadshahzad.9038@gmail.com
          <p>
            <strong>Password:</strong> a
          </p>
        </div>
      </div>
    </Box>
  );
};

export default Login;
