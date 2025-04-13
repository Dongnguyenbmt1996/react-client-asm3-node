import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hidePopup } from "../redux/popupSlice";
import "./Popup.css";
import convertMoney from "../convertMoney";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
const Popup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showPopup, productData } = useSelector((state) => state.popup);

  console.log("productData:", productData);
  console.log("productData._id:", productData._id);

  if (!showPopup) return null;

  return (
    <div
      className="popup-overlay "
      onClick={(e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện overlay
        dispatch(hidePopup());
      }}
    >
      <div className="popup-container fst-italic">
        <button className="close-btn" onClick={() => dispatch(hidePopup())}>
          X
        </button>
        <div className="row">
          <div className="popup-image">
            <img src={productData.img1} alt={productData.name} />
          </div>
          <div className="popup-details">
            <h2>{productData.name}</h2>
            <p className="text-price">{convertMoney(productData.price)} VND</p>
            <p>{productData.short_desc}</p>
            <button
              onClick={() => {
                const productId =
                  productData._id.$oid || productData._id.toString(); // Lấy ID từ object
                navigate(`/detail/${productId}`);
              }}
            >
              <FontAwesomeIcon className="pe-2" icon={faShoppingCart} /> View
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
