import { useEffect, useState } from "react";
import DepartmentComponent from "./DepartmentForm";
import { Box, Button } from "@mui/material";
import Axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState({});

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "departmentName",
            headerName: "Department Name",
            headerAlign: "center",
            flex: 1,
            cellClassName: "name-column--cell",
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
                            setSelectedDepartment({
                                id: params.row.id,
                                departmentName: params.row.departmentName,
                                departmentCode: params.row.departmentCode,
                            });
                            setIsEdit(true); // Set edit mode to true
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        sx={{ margin: '0px 10px', color: '#ffffff', backgroundColor: '#dc3545' }}
                        onClick={() => deleteDepartment(params.row.id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    useEffect(() => {
        getDepartments();
    }, []);

    const getDepartments = () => {
        Axios.get("https://localhost:7032/api/Department/GetDepartment")
            .then((response) => {
                setDepartments(response?.data || []);
            })
            .catch((error) => {
                console.error("Axios Error", error);
            });
    };

    const createDepartment = (data) => {
        const payload = {
            DepartmentName: data.departmentName,
            DepartmentCode: data.departmentCode,
        };
        Axios.post("https://localhost:7032/api/Department/AddDepartment", payload)
            .then(() => {
                getDepartments();
                setIsEdit(false);
            })
            .catch((error) => {
                console.error("Axios Error", error);
            });
    };

    const updateDepartment = (data) => {
        const payload = {
            Id: data.id,
            DepartmentName: data.departmentName,
            DepartmentCode: data.departmentCode,
        };
        Axios.patch("https://localhost:7032/api/Department/UpdateDepartment", payload)
            .then(() => {
                getDepartments();
                setIsEdit(false);
            })
            .catch((error) => {
                console.error("Axios Error", error);
            });
    };

    const deleteDepartment = (id) => {
        Axios.delete(`https://localhost:7032/api/Department/DeleteDepartment/${id}`)
            .then(() => {
                getDepartments();
            })
            .catch((error) => {
                console.error("Axios Error", error);
            });
    };

    return (
        <Box m="20px">
            <Header title="Departments" subtitle="List of Departments" />
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
                <DepartmentComponent
                    createDepartment={createDepartment}
                    updateDepartment={updateDepartment}
                    data={selectedDepartment}
                    isEdit={isEdit}
                />
                <DataGrid
                    rows={departments}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default Departments;
