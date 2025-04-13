import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [enterValue, setEnterValue] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  function handleValueChange(id, value) {
    setEnterValue((pre) => ({
      ...pre,
      [id]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("https://lab03-node.onrender.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enterValue),
      });

      const data = await res.json();

      if (!res.ok) {
        const serverErrors = {};
        if (Array.isArray(data.errors)) {
          data.errors.forEach((err) => {
            serverErrors[err.path] = err.msg; // param giống key: fullname, email, password, phone
          });
          setErrors(serverErrors);
        } else if (data.message) {
          // fallback nếu chỉ có 1 lỗi (ví dụ trả về lỗi dạng { message: '...' })
          alert(data.message);
        }
        setErrors(serverErrors);
      } else {
        setErrors({});
        // alert("Đăng ký thành công!");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Lỗi kết nối server:", error);
      alert("Không thể kết nối đến server.");
    }
  }

  return (
    <div className="container">
      <div className="sign-up text-muted fst-italic">
        <div className="text-center form-container">
          <h2 className="mb-4 h2-signup">Sign Up</h2>
          <form className="form-signup" onSubmit={handleSubmit}>
            <div>
              <input
                className="input-signup"
                type="text"
                placeholder="Full Name"
                id="fullname"
                value={enterValue.fullname}
                onChange={(e) => handleValueChange("fullname", e.target.value)}
              />
              {errors.fullname && (
                <div className="error-text">{errors.fullname}</div>
              )}
            </div>
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
            <div>
              <input
                className="input-signup"
                type="text"
                placeholder="Phone"
                id="phone"
                value={enterValue.phone}
                onChange={(e) => handleValueChange("phone", e.target.value)}
              />
              {errors.phone && <div className="error-text">{errors.phone}</div>}
            </div>
            <div>
              <button className="btn-signup" type="submit">
                SIGN UP
              </button>
            </div>
            <div className="text-center p-t-45 p-b-4">
              <span>Login?</span>
              &nbsp;
              <Link to="/signin" className="link-signup">
                Click
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
