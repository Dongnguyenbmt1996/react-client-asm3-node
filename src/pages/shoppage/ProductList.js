import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";
import convertMoney from "../../convertMoney";
export default function ProductList({ products }) {
  const navigate = useNavigate();
  const [triggerEffect, setTriggerEffect] = useState(false);

  useEffect(() => {
    // Kích hoạt hiệu ứng khi danh sách sản phẩm thay đổi
    setTriggerEffect(true);
    const timeout = setTimeout(() => setTriggerEffect(false), 500); // Reset sau 0.5s
    return () => clearTimeout(timeout); // Dọn dẹp timeout
  }, [products]);
  console.log("Products in productlist:", products);
  return (
    <div className="product-trend row">
      {products &&
        products.map((product) => (
          <div
            key={product.id}
            className={`col-xl-3 col-lg-4 col-sm-6 ${
              triggerEffect ? "product-item" : ""
            }`}
          >
            <div className="product text-center">
              <div className="position-relative mb-3">
                <div className="badge text-white trend-button">
                  <a
                    className="d-block"
                    href={`/detail/${product._id?.$oid || product._id}`}
                    data-toggle="modal"
                  >
                    <img
                      className="img-fluid"
                      src={product.img1}
                      alt={product.name}
                      onClick={() =>
                        navigate(`/detail/${product._id.toString()}`)
                      }
                    />
                  </a>
                  <div className="product-overlay">
                    <ul className="mb-0 list-inline"></ul>
                  </div>
                </div>
                <h6>
                  <button
                    className="btn fw-semibold"
                    onClick={() =>
                      navigate(`/detail/${product._id?.$oid || product._id}`)
                    }
                  >
                    {product.name}
                  </button>
                  <p className="fw-light fst-italic">
                    {convertMoney(product.price)} VND
                  </p>
                </h6>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
