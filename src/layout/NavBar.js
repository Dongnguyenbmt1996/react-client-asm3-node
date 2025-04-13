import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../custom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ON_LOGOUT } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

export default function NavBar() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [active, setActive] = useState("Home");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleNavigate = (path) => {
    navigate(path);
  };
  const handlerActive = (value) => {
    setActive(value);
  };

  const handleLogout = async () => {
    try {
      // Gửi yêu cầu logout tới backend
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include", // Cần thiết để gửi cookie
      });

      // Sau khi logout thành công, xóa thông tin người dùng và giỏ hàng trong localStorage
      dispatch({ type: ON_LOGOUT });
      localStorage.removeItem("currentUser");
      localStorage.removeItem("cart");

      // Chuyển hướng về trang chủ
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <div className="containter-nav container px-0 px-lg-3 fst-italic">
      <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0 fixed-top">
        <div className="container">
          {/* Nút bên trái */}
          <div className="navbar-nav">
            <div onClick={() => handlerActive("Home")}>
              <button
                className="btn btn-link nav-link nav-item"
                onClick={() => handleNavigate("/")}
                style={
                  active === "Home" ? { color: "#EEAD0E" } : { color: "black" }
                }
              >
                Home
              </button>
            </div>
            <div onClick={() => handlerActive("Shop")}>
              <button
                className="btn btn-link nav-link nav-item"
                onClick={() => handleNavigate("/shop")}
                style={
                  active === "Shop" ? { color: "#EEAD0E" } : { color: "black" }
                }
              >
                Shop
              </button>
            </div>
          </div>

          {/* Chữ "Boutique" ở giữa */}
          <span className="navbar-brand mx-auto font-weight-bold text-uppercase text-dark">
            Boutique
          </span>

          {/* Nút bên phải */}
          <div className="navbar-nav">
            <button
              className="btn btn-link nav-link nav-item px-3"
              onClick={() => handleNavigate("/cart")}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Cart
            </button>

            {currentUser ? (
              <div className="d-flex align-items-center">
                <FontAwesomeIcon className="px-1" icon={faUser} />
                <span>{currentUser.fullname}</span>
                <button
                  className="btn btn-link nav-link nav-item"
                  onClick={handleLogout}
                >
                  (Logout)
                </button>
              </div>
            ) : (
              <button
                className="btn btn-link nav-link nav-item"
                onClick={() => handleNavigate("/signin")}
              >
                <FontAwesomeIcon icon={faUser} /> Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
