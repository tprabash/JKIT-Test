import { useEffect, useState } from "react";
import CandidatesForm from "./CandidatesForm";
import CandidatesTable from "./CandidatesTable";
import { Box } from "@mui/material";
import Axios from "axios";

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState({});

    useEffect(() => {
        getCandidates();
    }, []);

    const getCandidates = () => {
        Axios.get('https://localhost:7032/api/Candidate/GetCandidate')
            .then(response => {
                setCandidates(response?.data || []);
            })
            .catch(error => {
                console.error('Axios Error', error);
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
        Axios.post('https://localhost:7032/api/Candidate/AddCandidate', payload)
            .then(() => {
                getCandidates();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error('Axios Error', error);
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
            DepartmentId: selectedDepartmentId,
        };
        Axios.patch('https://localhost:7032/api/Candidate/UpdateCandidate', payload)
            .then(() => {
                getCandidates();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error('Axios Error', error);
            });
    };

    const deleteCandidate = (id) => {
        Axios.delete(`https://localhost:7032/api/Candidate/DeleteCandidate/${id}`)
            .then(() => {
                getCandidates();
            })
            .catch(error => {
                console.error('Axios Error', error);
            });
    };

    return (
        <Box
            sx={{
                width: 'calc(100% - 100px)',
                margin: 'auto',
                marginTop: '100px',
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
            <CandidatesTable
                rows={candidates}
                selectedCandidate={data => {
                    setSelectedCandidate(data);
                    setIsEdit(true);
                }}
                deleteCandidate={data => window.confirm('Are You Sure To Delete') && deleteCandidate(data)}
            />
        </Box>
    );
};

export default Candidates;
