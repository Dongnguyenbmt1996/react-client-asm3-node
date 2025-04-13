import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Search from "./Search";
import SortProduct from "./SortProduct";
import PageNumber from "./PageNumber";
export default function ShopPage() {
  const [products, setProducts] = useState([]); //sản phẩm
  const [category, setCategory] = useState("All"); //danh mục
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const productsPerPage = 8;

  ////fetch dữ liệu sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      );
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      console.log(data);
      return data;
    };
    fetchData();
  }, []);
  /// xử lý lọc và tìm kiếm sản phầm
  useEffect(() => {
    let result = [...products];
    //lọc theo danh mục
    if (category !== "All") {
      result = result.filter((product) => product.category === category);
    }
    //lọc theo từ khoá
    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Sắp xếp sản phẩm
    if (sortOrder === "LowToHigh") {
      result = result.sort((a, b) => a.price - b.price); // Sắp xếp tăng dần
    } else if (sortOrder === "HighToLow") {
      result = result.sort((a, b) => b.price - a.price); // Sắp xếp giảm dần
    }
    //phân trang
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = currentPage * productsPerPage;
    const paginatedResult = result.slice(startIndex, endIndex);
    setFilteredProducts(paginatedResult);
    setTotalResults(result.length);
  }, [category, searchTerm, sortOrder, products, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchTerm, sortOrder]);

  return (
    <div className="container">
      <section className="py-5 container-shop bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase">Shop</h1>
            </div>
            <div className="col-lg-6 ">
              <p className="text-uppercase">Shop</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* categories */}
            <div className="col-lg-3 order-2 order-lg-1">
              <h4 className="text-uppercase mb-4">categories</h4>
              <div className="bg-dark text-white mb-3 py-2 ">
                <p className="text-uppercase font-weight-bold px-4">Apple</p>
              </div>
              <ul className="list-unstyled pl-lg-4 font-weight-normal">
                <li className="mb-2 px-4">
                  <a
                    href="#"
                    className="link-categorie"
                    onClick={() => setCategory("All")}
                  >
                    All
                  </a>
                </li>
              </ul>
              <div className="py-2 px-4 bg-light mb-2">
                <p className="text-uppercase font-weight-bold">Iphone & Mac</p>
              </div>
              <ul className="list-unstyled pl-lg-4 font-weight-normal px-4">
                <li className="mb-2">
                  <a
                    href="#"
                    className="link-categorie"
                    onClick={() => setCategory("iphone")}
                  >
                    Iphone
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="link-categorie"
                    onClick={() => setCategory("ipad")}
                  >
                    Ipad
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="link-categorie"
                    onClick={() => setCategory("macbook")}
                  >
                    Macbook
                  </a>
                </li>
              </ul>
              <div className="py-2 px-4 bg-light mb-2">
                <p className="text-uppercase font-weight-bold">Wireless</p>
              </div>
              <ul className="list-unstyled pl-lg-4 font-weight-normal px-4">
                <li className="mb-2">
                  <a
                    href="#"
                    className="link-categorie"
                    onClick={() => setCategory("airpod")}
                  >
                    Airpod
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="link-categorie"
                    onClick={() => setCategory("watch")}
                  >
                    Watch
                  </a>
                </li>
              </ul>
              <div className="py-2 px-4 bg-light mb-2">
                <p className="text-uppercase font-weight-bold">Other</p>
              </div>
              <ul className="list-unstyled pl-lg-4 font-weight-normal px-4">
                <li className="mb-2">
                  <a
                    href="#"
                    className="link-categorie"
                    onClick={() => setCategory("mouse")}
                  >
                    Mouse
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="link-categorie"
                    onClick={() => setCategory("keyboard")}
                  >
                    Keyboard
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="link-categorie"
                    onClick={() => setCategory("other")}
                  >
                    Other
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
              <div className="row mb-3 align-items-center">
                <Search setSearchTerm={setSearchTerm} />
                <div className="col-lg-8">
                  <SortProduct setSortOrder={setSortOrder} />
                </div>
              </div>
              {/* Products */}

              <ProductList products={filteredProducts} />
              <PageNumber
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalProducts={totalResults}
                productsPerPage={productsPerPage}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
