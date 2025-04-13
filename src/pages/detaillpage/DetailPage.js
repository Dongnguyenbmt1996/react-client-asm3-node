import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import convertMoney from "../../convertMoney";
import "../../custom.css";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../redux/actions";

export default function DetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); // Sản phẩm hiện tại
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState(""); // Ảnh chính
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/product/${productId}`
        );
        const data = await response.json();

        setProduct(data);
        setMainImage(data.img1);

        // Fetch all để tìm related product
        const allRes = await fetch("http://localhost:5000/products");
        const allData = await allRes.json();

        const related = allData.filter((item) => {
          const itemId = item._id?.$oid || item._id;
          return item.category === data.category && itemId !== productId;
        });
        setRelatedProducts(related);
      } catch (error) {
        console.error("Lỗi khi fetch chi tiết sản phẩm:", error);
      }
    };

    fetchData();
  }, [productId]);

  // const handleAddToCart = (event) => {
  //   event.preventDefault();
  //   if (!currentUser) {
  //     alert("Please login to add items to cart.");
  //     return;
  //   }
  //   const quantity = parseInt(document.querySelector(".quantity").value);
  //   dispatch(addCart(product, quantity, currentUser));
  //   alert("Product Added");
  // };
  const handleAddToCart = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      alert("Please login to add items to cart.");
      return;
    }

    const quantity = parseInt(document.querySelector(".quantity").value);

    try {
      const response = await fetch("http://localhost:5000/addcart", {
        method: "POST",
        credentials: "include", // ĐỂ GỬI COOKIE QUA BACKEND
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Product added to cart!");
      } else {
        alert(result.message || "Failed to add to cart.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Something went wrong.");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container py-5  fst-italic">
      <div className="row row-detailPage">
        {/* Các ảnh nhỏ */}
        <div className="col-lg-2 small-images-detail">
          {[product.img1, product.img2, product.img3, product.img4].map(
            (img, index) =>
              img && ( // Chỉ hiển thị ảnh nếu URL hợp lệ
                <div key={index} onClick={() => setMainImage(img)}>
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`img-fluid small-img ${
                      mainImage === img ? "selected-img" : ""
                    }`} // Thêm class để hiển thị ảnh đang chọn
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )
          )}
        </div>

        {/* Ảnh chính */}
        <div className="col-lg-5 main-image">
          <img
            src={mainImage}
            alt={product.name}
            className="img-fluid main-img"
          />
        </div>

        {/* Chi tiết sản phẩm */}
        <div className="col-lg-5 product-details mb-4">
          <h1 className="text-uppercase">{product.name}</h1>
          <h3 className="fw-light text-muted">
            {convertMoney(product.price)} VND
          </h3>
          <p className="text-muted">{product.short_desc}</p>
          <h4 className="text-muted">
            CATEGORY: <span>{product.category}</span>
          </h4>
          <form className="add-to-cart-form bm-4" onSubmit={handleAddToCart}>
            <div className="text-muted ">
              <p className="mb-0">Quantity</p>
            </div>
            <div className="quantity-input">
              <button
                type="button"
                className="btn-decrement"
                onClick={() => {
                  const input = document.querySelector(".quantity");
                  if (input.value > 1) input.value--;
                }}
              >
                -
              </button>
              <input
                type="number"
                className="quantity"
                defaultValue={1}
                min={1}
                id="quantity"
              />
              <button
                type="button"
                className="btn-increment"
                onClick={() => {
                  const input = document.querySelector(".quantity");
                  input.value++;
                }}
              >
                +
              </button>
            </div>
            <button type="submit" className="btn-add-to-cart">
              Add to Cart
            </button>
          </form>
        </div>
      </div>
      <div className="text-muted py-4">
        <button className="text-uppercase mb-4 btn-description">
          description
        </button>
        <h4 className="text-uppercase mb-4">product description</h4>
        <p>{product.long_desc}</p>
      </div>
      {/* Sản phẩm liên quan */}
      <div>
        <h4 className="text-uppercase mb-4">Related Products</h4>
        <div className="row">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((item) => {
              const itemId = item._id?.$oid || item._id; // Lấy ID thực
              return (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={itemId}>
                  <div className="card">
                    <img
                      src={item.img1}
                      alt={item.name}
                      className="card-img-top"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        (window.location.href = `/detail/${itemId}`)
                      }
                    />
                    <div className="card-body text-center text-muted">
                      <h6>{item.name}</h6>
                      <p className="fw-light text-muted">
                        {convertMoney(item.price)} VND
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
