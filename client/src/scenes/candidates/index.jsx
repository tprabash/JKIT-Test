import { useEffect, useState } from "react";
import CandidatesForm from "./CandidatesForm";
import { Box, Button } from "@mui/material";
import Axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState({});

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "firstName",
      headerName: "First Name",
      headerAlign: "center",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      headerAlign: "center",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      headerAlign: "center",
      align: "left",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "center",
      align: "left",
    },
    {
      field: "salary",
      headerName: "Salary",
      type: "number",
      headerAlign: "center",
      align: "left",
    },
    {
      field: "departmentName",
      headerName: "Department",
      headerAlign: "center",
      align: "left",
    },
    {
      field: "departmentCode",
      headerName: "Department Code",
      headerAlign: "center",
      align: "left",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            sx={{ margin: '0px 10px', color: '#ffffff', backgroundColor: '#0d6efd' }}
            onClick={() => {
              setSelectedCandidate({
                id: params.row.id,
                firstName: params.row.firstName,
                lastName: params.row.lastName,
                email: params.row.email,
                dob: params.row.dob,
                age: params.row.age,
                salary: params.row.salary,
                departmentCode: params.row.departmentCode,
                departmentId: params.row.departmentId,
                departmentName: params.row.departmentName
              });
              console.log("setSelectedCandidate");
              setSelectedDepartmentId(params.row.departmentId);
              setIsEdit(true);
            }}
          >
            Edit
          </Button>
          <Button
            sx={{ margin: '0px 10px', color: '#ffffff', backgroundColor: '#dc3545' }}
            onClick={() => deleteCandidate(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    getCandidates();
  }, []);

  const getCandidates = () => {
    Axios.get("https://localhost:7032/api/Candidate/GetCandidate")
      .then((response) => {
        setCandidates(response?.data || []);
      })
      .catch((error) => {
        console.error("Axios Error", error);
      });
  };

  const createCandidate = (data) => {
    setSubmitted(true);
    const payload = {
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email,
      DOB: data.dob,
      Age: data.age,
      Salary: data.salary,
      DepartmentId: selectedDepartmentId,
    };
    Axios.post("https://localhost:7032/api/Candidate/AddCandidate", payload)
      .then(() => {
        getCandidates();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch((error) => {
        console.error("Axios Error", error);
      });
  };

  const updateCandidate = (data) => {
    setSubmitted(true);
    const payload = {
      Id: data.id,
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email,
      DOB: data.dob,
      Age: data.age,
      Salary: data.salary,
      DepartmentId: data.departmentId,
    };
    Axios.patch("https://localhost:7032/api/Candidate/UpdateCandidate", payload)
      .then(() => {
        getCandidates();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch((error) => {
        console.error("Axios Error", error);
      });
  };

  const deleteCandidate = (id) => {
    Axios.delete(`https://localhost:7032/api/Candidate/DeleteCandidate/${id}`)
      .then(() => {
        getCandidates();
      })
      .catch((error) => {
        console.error("Axios Error", error);
      });
  };

  return (
    <Box m="20px">
      <Header title="Candidates" subtitle="List of Candidates" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <CandidatesForm
          createCandidate={createCandidate}
          updateCandidate={updateCandidate}
          selectedDepartmentId={selectedDepartmentId}
          setSelectedDepartmentId={setSelectedDepartmentId}
          data={selectedCandidate}
          isEdit={isEdit}
        />
        <DataGrid
          rows={candidates}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Candidates;
