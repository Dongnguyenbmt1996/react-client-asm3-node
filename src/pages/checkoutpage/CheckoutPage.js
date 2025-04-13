import React, { useState, useEffect } from "react";
import "../../custom.css";
//import { useSelector } from "react-redux";
import convertMoney from "../../convertMoney";
//import { isNotEmpty, isEmail } from "../../Authentication/util/validation";
export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/cart", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.items); // { product, quantity }
      })
      .catch((err) => console.error("Lỗi khi lấy cart:", err));
  }, []);

  // Tính tổng
  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  //validate form
  const [enterValue, setEnterValue] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  //hàm lấy dữ liệu
  function handleValueChange(id, value) {
    setEnterValue((pre) => ({
      ...pre,
      [id]: value,
    }));
  }

  function handlerSubmitOrder(e) {
    e.preventDefault();

    fetch("http://localhost:5000/order/create", {
      method: "POST",
      credentials: "include", // Để gửi cookie session
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: enterValue.fullname,
        email: enterValue.email,
        phone: enterValue.phone,
        address: enterValue.address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors); // lấy lỗi từ backend
        } else if (data.order) {
          alert("Đặt đơn thành công!");
          setEnterValue({
            fullname: "",
            email: "",
            phone: "",
            address: "",
          });
          setErrors({});
        } else {
          alert("Đã xảy ra lỗi khi đặt đơn.");
        }
      })
      .catch((err) => {
        console.error("Lỗi khi gửi đơn hàng:", err);
        alert("Lỗi khi gửi đơn hàng.");
      });
  }

  return (
    <div className="container fst-italic">
      <section className="py-5 bg-light container-shop">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Checkout</h1>
            </div>
            <div className="col-lg-6 text-lg-right">
              <nav aria-label="breadcrumb" className="text-uppercase">
                <ol className=" breadcrumb justify-content-lg-end mb-0 px-0">
                  <li className="breadcrumb-item ">
                    <a className="nav-checkout" href="/">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a className="nav-checkout" href="/cart">
                      Cart
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item nav-checkout active"
                    aria-current="page"
                  >
                    Checkout
                  </li>
                  <li className="breadcrumb-item nav-checkout active">
                    <a className="text-uppercase" href="/history">
                      History
                    </a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="row">
          <h4 className="text-uppercase mb-4 px-3 h4-checkout">
            billing details
          </h4>
          <div className="col-lg-8 mb-4 px-3">
            <form
              className="text-muted form-checkout"
              onSubmit={handlerSubmitOrder}
            >
              <div className="d-flex flex-column mb-3">
                <label className="text-uppercase mb-2">full name</label>
                <input
                  type="text"
                  placeholder="Enter Your Full Name Here!"
                  id="fullname"
                  value={enterValue.fullname}
                  onChange={(e) =>
                    handleValueChange("fullname", e.target.value)
                  }
                />
                {errors.fullname && (
                  <div className="error-text">{errors.fullname}</div>
                )}
              </div>
              <div className="d-flex flex-column mb-3">
                <label className="text-uppercase mb-2">email</label>
                <input
                  type="text"
                  placeholder="Enter Your Email Here!"
                  id="email"
                  value={enterValue.email}
                  onChange={(e) => handleValueChange("email", e.target.value)}
                />
                {errors.email && (
                  <div className="error-text">{errors.email}</div>
                )}
              </div>
              <div className="d-flex flex-column mb-3">
                <label className="text-uppercase mb-2">phone number</label>
                <input
                  type="text"
                  placeholder="Enter Your phone number Here!"
                  id="phone"
                  value={enterValue.phone}
                  onChange={(e) => handleValueChange("phone", e.target.value)}
                />
                {errors.phone && (
                  <div className="error-text">{errors.phone}</div>
                )}
              </div>
              <div className="d-flex flex-column mb-3">
                <label className="text-uppercase mb-2">address</label>
                <input
                  type="text"
                  placeholder="Enter Your Address Here!"
                  id="address"
                  value={enterValue.address}
                  onChange={(e) => handleValueChange("address", e.target.value)}
                />
                {errors.address && (
                  <div className="error-text">{errors.address}</div>
                )}
              </div>
              <button type="submit">Place order</button>
            </form>
          </div>
          <div className="col-lg-4 px-4 py-4 order-checkout">
            <h4 className="text-uppercase h4-checkout mb-3"> your order</h4>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex gap-2 border-bottom border-secondary"
              >
                <p className="text-order-checkout">{item.product.name}</p>
                <p className="flex-end mb-0 ms-auto text-muted">
                  {convertMoney(item.product.price)}VND x{item.quantity}
                </p>
              </div>
            ))}
            <div className="total-checkout d-flex">
              <p className="text-uppercase">total</p>
              <p className="flex-end ms-auto">{convertMoney(total)}VND</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
