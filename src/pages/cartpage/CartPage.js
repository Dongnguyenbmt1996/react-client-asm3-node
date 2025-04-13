import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import convertMoney from "../../convertMoney";
import "../../custom.css";
import {
  faTrash,
  faGift,
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart từ backend
  useEffect(() => {
    fetch("http://localhost:5000/cart", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Bạn chưa đăng nhập");
          navigate("/signin");
          return null;
        }
        return res.json();
      })

      .then((data) => {
        setCartItems(data.items); // { product, quantity }
      })
      .catch((err) => console.error("Lỗi khi lấy cart:", err));
  }, [navigate]);

  // Tính tổng
  // const total = cartItems.reduce(
  //   (acc, item) => acc + item.product.price * item.quantity,
  //   0
  // );
  let total = 0;
  for (let item of cartItems || []) {
    total += (item.product?.price || 0) * item.quantity;
  }

  // Cập nhật số lượng
  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const res = await fetch("http://localhost:5000/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      setCartItems(data.items); // cập nhật lại sau khi backend xử lý xong
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
    }
  };

  // Xóa sản phẩm
  const handleDelete = async (productId) => {
    if (!window.confirm("Bạn muốn xoá sản phẩm này?")) return;
    try {
      const res = await fetch(`http://localhost:5000/remove/${productId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCartItems(data.items); // cập nhật lại sau khi xoá
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  return (
    <div className="container fst-italic">
      {/* Header */}
      <section className="py-5 container-shop bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase">Cart</h1>
            </div>
            <div className="col-lg-6 text-end history-css">
              <p className="text-uppercase">Cart</p>
              <a className="text-uppercase" href="/history">
                History
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Cart */}
      <section className="py-5">
        <h4 className="text-uppercase">Shopping Cart</h4>
        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive">
              <table className="table">
                <thead className="">
                  <tr className="text-uppercase text-center">
                    <th className="bg-light">Image</th>
                    <th className="bg-light">Product</th>
                    <th className="bg-light">Price</th>
                    <th className="bg-light">Quantity</th>
                    <th className="bg-light">Total</th>
                    <th className="bg-light">Remove</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {cartItems &&
                    cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Link to={`/detail/${item.product._id}`}>
                            <img
                              src={item.product.img1}
                              alt={item.product.name}
                              width="70"
                            />
                          </Link>
                        </td>
                        <td className="fw-bold">{item.product.name}</td>
                        <td className="text-muted">
                          {convertMoney(item.product.price)} VND
                        </td>
                        <td className="input-cart">
                          <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) =>
                              handleUpdateQuantity(
                                item.product._id,
                                +e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="text-muted">
                          {convertMoney(item.product.price * item.quantity)} VND
                        </td>
                        <td>
                          <button
                            className="btn"
                            onClick={() => handleDelete(item.product._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cart Total */}
          <div className="col-lg-4 cart-total px-4">
            <h4 className="text-uppercase fw-normal pb-3">Cart Total</h4>
            <div className="">
              <div className="d-flex justify-content-between border-bottom border-secondary mb-3">
                <h6 className="text-uppercase fw-normal">Subtotal</h6>
                <p className="fw-light">{convertMoney(total)} VND</p>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="text-uppercase fw-normal">Total</h6>
                <p>{convertMoney(total)} VND</p>
              </div>
            </div>
            <div className="mt-3">
              <input
                type="text"
                className="form-control py-2"
                placeholder="Enter your coupon"
              />
              <button className=" btn-apply-coupon w-100 mb-2">
                <FontAwesomeIcon className="px-2" icon={faGift} />
                Apply Coupon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className=" py-3 px-3 mb-3 bg-light fst-italic d-flex justify-content-between align-items-center ">
        <button
          className=" me-3 fst-italic me-auto text-muted btn-continuecart"
          onClick={() => navigate("/shop")}
        >
          <FontAwesomeIcon className="px-2" icon={faArrowLeftLong} />
          Continue Shopping
        </button>
        <div className="flex-grow-1 d-flex justify-content-center">
          <button
            className="fst-italic mx-auto text-muted py-2"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
            <FontAwesomeIcon className="px-2" icon={faArrowRightLong} />
          </button>
        </div>
      </section>
    </div>
  );
}
