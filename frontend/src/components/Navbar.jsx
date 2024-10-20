import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "../pages/shop/CartModal";
import avatarImage from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const NavBar = () => {
  const products = useSelector((state) => state.cart.products);
  // console.log("products : ", products.length)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  // show user is logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // console.log("user : ", user);

  // dropdown menus
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  // admin dropdown
  const adminDropDown = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add new Post", path: "/dashboard/add-new-post" },
  ];

  // user dropdown
  const userDropDown = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropDownMenu =
    user?.role === "admin" ? [...adminDropDown] : [...userDropDown];

  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  // handle user logout
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      setIsDropDownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Failed to logout ", error);
    }
  };
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/pages">Pages</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* logo */}
        <div className="nav__logo">
          <Link to="/">
            Zazz<span>.</span>
          </Link>
        </div>

        {/* nav icons */}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button className="hover:text-primary" onClick={handleCartToggle}>
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                {products.length}
              </sup>
            </button>
          </span>
          <span>
            {user ? (
              <img
                src={user?.profileImage || avatarImage}
                alt=""
                className="size-6 rounded-full cursor-pointer"
                onClick={handleDropDownToggle}
              />
            ) : (
              <Link to="/login">
                <i className="ri-user-line"></i>
              </Link>
            )}
            {isDropDownOpen && (
              <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="font-medium space-y-4 p-2">
                  {dropDownMenu.map((menuItem, index) => (
                    <li key={index}>
                      <Link
                        onClick={() => setIsDropDownOpen(false)}
                        className="dropdown-items"
                        to={menuItem.path}
                      >
                        {menuItem.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link onClick={handleLogout} className="dropdown-items">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </span>
        </div>
      </nav>

      {isCartOpen && (
        <CartModal
          isCartOpen={isCartOpen}
          handleCartToggle={handleCartToggle}
          products={products}
        />
      )}
    </header>
  );
};

export default NavBar;
