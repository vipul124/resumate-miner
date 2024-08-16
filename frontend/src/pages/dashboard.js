import UploadResumeForm from "./uploadResumeForm";
import { useRouter } from "next/router";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [userdata, setUserData] = useState([]);
  const [rating, setRating] = useState(0);
  const [refreshList, setRefreshList] = useState(false);
  const [showResumeData, setShowResumeData] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const router = useRouter();
  const refresh = Cookies.get("refresh_token");
  const access_token = Cookies.get("access_token");

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    fetch("/api/user/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (showResumeData) {
      axios
        .get("/api/user/list_predictions", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          setShowResumeData(response.data.prediction);
        })
        .catch((error) => console.error(error));
    }
  }, [access_token, refreshList, showResumeData]);

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    if (!access_token) {
      window.location.href = "/login";
      setAuthenticated(false);
      return;
    }

    axios
      .post("/api/token/verify", {
        token: access_token,
      })
      .then((res) => {
        setAuthenticated(true);
      })
      .catch((error) => {
        axios
          .post("/api/token/refresh", {
            refresh: refresh,
          })
          .then((res) => {
            Cookies.set("access_token", res.data.access);
            Cookies.set("refresh_token", res.data.refresh);
            setAuthenticated(true);
            window.location.reload();
          })
          .catch((error) => {
            setError(error.response.data.detail);
            setAuthenticated(false);
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            console.log(error);
            window.location.href = "/login";
          });
      });
  }, [access_token, refresh]);

  const handleLogout = async () => {
    const body = JSON.stringify({
      refresh,
    });

    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: body,
      });

      if (res.ok) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        setAuthenticated(false);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  const handleShowResumeData = () => {
    setShowResumeData(true);
  };

  const handleRefreshList = () => {
    setRefreshList((prev) => !prev);
  };

  if (!authenticated) {
    return null;
  }

  return (
    <DefaultLayout title="Dashboard" content="Dashboard page for ResuMate">
      <div className="row justify-content-around">
        <div className="col">
          <h1 className="display-5 mb-4 p-2">User Dashboard</h1>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary mt-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="row bg-light">
        <p className="fs-4 mt-3">
          Welcome, {userdata.username}
        </p>

        <div className="py-2 col-12">
          <UploadResumeForm />
          {error && <p>error</p>}
        </div>

      </div>

    </DefaultLayout>
  );
};

export default Dashboard;


import React from "react";

function getWindowSize() {
  if (typeof window === "undefined") {
    return { innerWidth: 0, innerHeight: 0 };
  }
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}