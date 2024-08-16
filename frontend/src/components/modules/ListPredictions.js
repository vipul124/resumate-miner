import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";

const ListPredictions = () => {
  const [showListPrediction, setShowListPrediction] = useState(false);
  const [getListPrediction, setGetListPrediction] = useState(false);
  const [resumeData, setResumeData] = useState([]);
  const [b, setB] = useState(true);
  const [refreshList, setRefreshList] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedUserData, setSelectedUserData] = useState(null);


  useEffect(() => {
    if (getListPrediction || refreshList) {
      axios
        .get("/api/resume/viewalldata")
        .then((response) => {
          const data = response.data.resume_data_list;
          setResumeData(data);
          setRefreshList(false);
          setShowListPrediction(true);
          setGetListPrediction(false);
        })
        .catch((error) => console.error(error));
    }
  }, [showListPrediction, refreshList]);

  const handleShowPredictions = () => {
    setShowListPrediction(true);
    setGetListPrediction(true);
  };

  const handleRefreshList = () => {
    setRefreshList(true);
  };

  const handleCloseOverlay = () => {
    setSelectedUserData(null);
  };

  const handleUserClick = (uuid) => {
    const user = resumeData.find((user) => user.uuid === uuid);
    setSelectedUserData(user);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredRows = resumeData.filter((row) => {
    const lowerCaseFilterText = filterText.toLowerCase();
    return (
      row.json_string[0].name.toLowerCase().includes(lowerCaseFilterText) ||
      row.json_string[0].education[0].gpa
        .toString()
        .toLowerCase()
        .includes(lowerCaseFilterText) ||
      row.json_string[0].field_of_study
        .toLowerCase()
        .includes(lowerCaseFilterText) ||
      row.overall_score.toString().toLowerCase().includes(lowerCaseFilterText)
    );
  });

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "cpi", headerName: "CPI", flex: 1 },
    { field: "branch", headerName: "Branch", flex: 1 },
    { field: "score", headerName: "Score", flex: 1 },
  ];

  const rows = filteredRows.map((userdata, index) => ({
    id: userdata.uuid,
    name: userdata.json_string[0].name,
    cpi: userdata.json_string[0].education[0].gpa,
    branch: userdata.json_string[0].field_of_study,
    score: userdata.overall_score,
  }));

  return (
    <div className="mt-5">
      <button
        className="btn btn-primary"
        onClick={showListPrediction ? handleRefreshList : handleShowPredictions}
      >
        {showListPrediction ? "Fetch Data" : "Fetch Data"}
      </button>
      {selectedUserData && (
        <UserProfile
          userData={selectedUserData}
          onClose={handleCloseOverlay}
        />
      )}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={(params) => handleUserClick(params.row.id)}
        />
      </div>
    </div>
  );
};

export default ListPredictions;