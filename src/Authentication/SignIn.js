import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ON_LOGIN } from "../redux/actions";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enterValue, setEnterValue] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  function handleValueChange(id, value) {
    setEnterValue((prev) => ({
      ...prev,
      [id]: value,
    }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
    setLoginError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setLoginError("");

    try {
      const res = await fetch("https://lab03-node.onrender.com/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // rất quan trọng để nhận cookie
        body: JSON.stringify(enterValue),
      });

      const data = await res.json();

      if (res.status === 422) {
        const newErrors = {};
        data.errors.forEach((error) => {
          newErrors[error.path] = error.msg;
        });
        setErrors(newErrors);
      } else if (res.status === 401) {
        setLoginError(data.message);
      } else if (res.ok) {
        // Lưu token vào localStorage
        localStorage.setItem("authToken", data.token);
        dispatch({ type: ON_LOGIN, payload: data.user });
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        navigate("/");
      } else {
        setLoginError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Lỗi fetch:", err);
      setLoginError("Lỗi kết nối server.");
    }
  }

  return (
    <div className="container">
      <div className="sign-up text-muted fst-italic">
        <div className="text-center form-container">
          <h2 className="mb-4 h2-signup">Sign In</h2>
          <form className="form-signup" onSubmit={handleSubmit}>
            <div>
              <input
                className="input-signup"
                type="text"
                placeholder="Email"
                id="email"
                value={enterValue.email}
                onChange={(e) => handleValueChange("email", e.target.value)}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>
            <div>
              <input
                className="input-signup"
                type="password"
                placeholder="Password"
                id="password"
                value={enterValue.password}
                onChange={(e) => handleValueChange("password", e.target.value)}
              />
              {errors.password && (
                <div className="error-text">{errors.password}</div>
              )}
            </div>
            {loginError && <div className="error-text">{loginError}</div>}
            <div>
              <button className="btn-signup" type="submit">
                SIGN IN
              </button>
            </div>
            <div className="text-center p-t-45 p-b-4">
              <span>Create an account?</span>
              <Link to="/signup" className="link-signup">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
