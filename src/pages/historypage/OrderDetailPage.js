// pages/OrderDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      console.log("Fetching order ID:", id);
      try {
        const res = await fetch(`http://localhost:5000/order/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Không thể lấy dữ liệu đơn hàng");
        }
        const data = await res.json();
        console.log("data order id:", data);
        setOrder(data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      }
    };

    fetchOrder();
  }, [id]);
  if (!order) return <p>Đang tải...</p>;

  return (
    <div className="container fst-italic">
      <h2 className="text-uppercase">Information Order</h2>
      <p>
        <strong>User Id:</strong> {order.user.userId}
      </p>
      <p>
        <strong>Full Name:</strong> {order.user.fullname}
      </p>
      <p>
        <strong>Phone:</strong> {order.user.phone}
      </p>
      <p>
        <strong>Address:</strong> {order.user.address}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Total:</strong> {order.totalPrice.toLocaleString()} VND
      </p>

      <hr />
      <h4>Products</h4>
      <table className="table table-bordered text-center">
        <thead className="thead-light">
          <tr>
            <th>ID PRODUCT</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>COUNT</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((item, idx) => (
            <tr key={idx}>
              <td>{item._id}</td>
              <td>
                <img
                  src={item.img}
                  alt={item.productName}
                  style={{ width: "60px" }}
                />
              </td>
              <td>{item.productName}</td>
              <td>{item.price.toLocaleString()} VND</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailPage;
