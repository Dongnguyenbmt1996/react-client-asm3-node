import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showPopup } from "../../redux/popupSlice";
import "../../custom.css";
import image1 from "../../Img/product1.png";
import image2 from "../../Img/product2.png";
import image3 from "../../Img/product3.png";
import image4 from "../../Img/product4.png";
import image5 from "../../Img/product5.png";
import convertMoney from "../../convertMoney";
export default function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function naviHandler(path) {
    navigate(path);
  }
  //fetch product data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://lab03-node.onrender.com/products");
      // "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      const data = await response.json();
      console.log(data);
      setProducts(data);
      return data.slice(0, 8);
    };
    fetchData();
  }, []);
  //showpopup
  const handlerImageClick = (product) => {
    dispatch(showPopup(product));

    console.log("click");
  };
  return (
    // navbar
    <div className="container container-home ">
      <section className="banner-home bg-light">
        <div className="container">
          <div className="text-banner">
            <p className="text-muted small text-uppercase mb-2 fst-italic">
              New Inspiration 2020
            </p>
            <h1 className="h2 text-uppercase mb-3 fw-normal fst-italic">
              20% off on new season
            </h1>
            <button
              className="btn btn-dark rounded-0 fw-light fst-italic"
              onClick={() => naviHandler("/shop")}
            >
              Browse collections
            </button>
          </div>
        </div>
      </section>

      {/* Danh mục sản phẩm */}
      <section className="container pt-4 colection-home">
        <header className="text-center pb-2">
          <p className="text-uppercase fw-light fst-italic mb-2 fs-6">
            Carefully created collections
          </p>
          <h2 className="text-uppercase fst-italic fw-normal fs-4">
            Browse our categories
          </h2>
        </header>
        {/* /////////// */}
        <div className="content-colection ">
          <div className="content-colection-row">
            <div className="row-homepage">
              <div className="colection-button">
                <button className="btn" onClick={() => naviHandler("/shop")}>
                  <img className="img-1" src={image1} alt="product-1" />
                </button>
              </div>
              <div className="colection-button">
                <button className="btn" onClick={() => naviHandler("/shop")}>
                  <img className="img-2" src={image2} alt="product-2" />
                </button>
              </div>
            </div>
          </div>

          <div className="content-colection-row">
            <div className="row-homepage">
              <div className="colection-button ">
                <button className="btn" onClick={() => naviHandler("/shop")}>
                  <img className="img-3" src={image3} alt="product-3" />
                </button>
              </div>
              <div className="colection-button ">
                <button className="btn" onClick={() => naviHandler("/shop")}>
                  <img className="img-4" src={image4} alt="product-4" />
                </button>
              </div>
              <div className="colection-button ">
                <button className="btn" onClick={() => naviHandler("/shop")}>
                  <img className="img-5" src={image5} alt="product-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top trending */}
      <section className="py-5">
        <header>
          <p className="text-uppercase fw-light fst-italic mb-2 fs-6">
            Made the hard way
          </p>
          <h2 className="text-uppercase fst-italic fw-normal fs-4">
            Top trending products
          </h2>
        </header>
        <div className="product-trend row">
          {products &&
            products.map((product) => (
              <div key={product._id} className="col-xl-3 col-lg-4 col-sm-6">
                <div className="product text-center">
                  <div className="position-relative mb-3">
                    <div className="badge text-white trend-button">
                      <a
                        className="d-block"
                        // href={`#product_${product._id}`}
                        data-toggle="modal"
                        onClick={() => handlerImageClick(product)}
                      >
                        <img className="img-fluid" src={product.img1} alt="" />
                      </a>
                      <div className="product-overlay">
                        <ul className="mb-0 list-inline"></ul>
                      </div>
                    </div>
                    <h6>
                      <button className="btn fw-semibold">
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
      </section>
      {/* Các thông tin khác */}
      <section className="py-5 ">
        <div className="container fst-italic bg-light py-5">
          <div className="row text-center">
            <div className="col-xl-4 col-lg-4 col-sm-6 mb-3 mb-lg-0">
              <h6 className="text-uppercase mb-1 ">Free Shipping</h6>
              <p className="text-small mb-0 text-muted">
                Free Shipping worlwide
              </p>
            </div>
            <div className="col-xl-4 col-lg-4 col-sm-6 mb-3 mb-lg-0">
              <h6 className="text-uppercase mb-1">24 X 7 service</h6>
              <p className="text-small mb-0 text-muted">
                Free Shipping worlwide
              </p>
            </div>
            <div className="col-xl-4 col-lg-4 col-sm-6 mb-3 mb-lg-0">
              <h6 className="text-uppercase mb-1">festival offer</h6>
              <p className="text-small mb-0 text-muted">
                Free Shipping worlwide
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" fst-italic mt-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-6 col-lg-4 col-sm-6 ps-5">
              <h6 className="text-uppercase mb-1 fs-2">let's be friends</h6>
              <p className="text-small mb-0 text-muted">
                Free Shipping worlwide
              </p>
            </div>
            <div className="col-xl-6 col-lg-4 col-sm-6 pe-5">
              <div className="d-flex justify-content-end">
                <input
                  type="text"
                  placeholder="Enter your email address"
                  style={{ width: "350px", border: "1px solid #d3d3d3" }}
                ></input>
                <button
                  className=" py-3 ps-3 pe-3 text-white"
                  style={{ backgroundColor: "gray", border: "none" }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
