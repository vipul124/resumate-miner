import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/" className="fw-bold navbar-brand">
          ResuMate
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="justify-content-end collapse navbar-collapse"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link
              href="/dashboard"
              className={
                router.pathname === "/dashboard" ? "nav-link" : "nav-link active"
              }
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className={
                router.pathname === "/login" ? "nav-link" : "nav-link active"
              }
            >
              Login
            </Link>
            <Link
              href="/register"
              className={
                router.pathname === "/register" ? "nav-link" : "active nav-link"
              }
            >
              Register
            </Link>
            <Link
              href="/adminlogin"
              className={
                router.pathname === "/adminlogin" ? "nav-link" : "active nav-link"
              }
            >
              Admin Login 
            </Link>
          </div>
        </div>
      </div>
    </nav>
    </header>
  );
};

export default Header;
