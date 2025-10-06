import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Menu } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand fw-bold text-primary" to="/">
            📝 MyPosts
          </Link>

          {/* Hamburger toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={this.toggleMenu}
          >
            <Menu size={24} />
          </button>

          {/* Navbar links */}
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {[
                { name: "Home", path: "/" },
                { name: "Create Post", path: "/add" },
                { name: "About", path: "/about" },
              ].map((link, idx) => (
                <motion.li
                  key={idx}
                  className="nav-item"
                  whileHover={{ scale: 1.1 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      "nav-link px-3 fw-semibold" +
                      (isActive ? " text-primary" : " text-dark")
                    }
                    onClick={() => this.setState({ isOpen: false })}
                  >
                    {link.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            {/* User/Login Button */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/login"
                className="btn btn-outline-primary ms-lg-3 d-flex align-items-center gap-2"
                style={{ borderRadius: "10px" }}
              >
                <User size={18} /> Login
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    );
  }
}
