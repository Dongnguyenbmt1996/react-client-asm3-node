import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function HistoryPage() {
  //validate form
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/order/user", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data) setOrders(data);
      })
      .catch((err) => console.error("Lỗi khi lấy đơn hàng:", err));
  }, [navigate]);

  return (
    <div className="container fst-italic">
      <section className="py-5 bg-light container-shop">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">History</h1>
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
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="thead-light">
              <tr>
                <th>ID ORDER</th>
                <th>ID USER</th>
                <th>NAME</th>
                <th>PHONE</th>
                <th>ADDRESS</th>
                <th>TOTAL</th>
                <th>DELIVERY</th>
                <th>STATUS</th>
                <th>DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.userId}</td>
                  <td>{order.user.fullname}</td>
                  <td>{order.user.phone}</td>
                  <td>{order.user.address}</td>
                  <td>
                    {order.totalPrice
                      ? order.totalPrice.toLocaleString() + " VND"
                      : "N/A"}
                  </td>
                  <td>{order.orderTime}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      View <span className="ml-1">➜</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
