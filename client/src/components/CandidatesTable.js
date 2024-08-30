import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const CandidatesTable = ({ rows, selectedCandidate, deleteCandidate }) => {
    return (
        <TableContainer component={Paper} >
            <Table sx={{ borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid #ddd' }}>ID</TableCell>
                        <TableCell sx={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid #ddd' }}>First Name</TableCell>
                        <TableCell sx={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid #ddd' }}>Last Name</TableCell>
                        <TableCell sx={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid #ddd' }}>Email Address</TableCell>
                        <TableCell sx={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid #ddd' }}>Date Of Birth</TableCell>
                        <TableCell sx={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid #ddd' }}>Age</TableCell>
                        <TableCell sx={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid #ddd' }}>Salary</TableCell>
                        <TableCell sx={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid #ddd' }}>Department</TableCell>
                        <TableCell sx={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid #ddd' }}>Department Code</TableCell>
                        <TableCell sx={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid #ddd' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.length > 0 ? rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component='td' scope="row" sx={{ textAlign: 'center' , borderCollapse: 'collapse', border: '1px solid #ddd'}}>{row.id}</TableCell>
                                <TableCell component='td' scope="row" sx={{ textAlign: 'left' , borderCollapse: 'collapse', border: '1px solid #ddd'}}>{row.firstName}</TableCell>
                                <TableCell component='td' scope="row" sx={{ textAlign: 'left' , borderCollapse: 'collapse', border: '1px solid #ddd'}}>{row.lastName}</TableCell>
                                <TableCell component='td' scope="row" sx={{ textAlign: 'center' , borderCollapse: 'collapse', border: '1px solid #ddd'}}>{row.email}</TableCell>
                                <TableCell component='td' scope="row" sx={{ textAlign: 'center' , borderCollapse: 'collapse', border: '1px solid #ddd'}}>{row.dob}</TableCell>
                                <TableCell component='td' scope="row" sx={{ textAlign: 'center' , borderCollapse: 'collapse', border: '1px solid #ddd'}}>{row.age}</TableCell>
                                <TableCell component='td' scope="row" sx={{ textAlign: 'center' , borderCollapse: 'collapse', border: '1px solid #ddd'}}>{row.salary}</TableCell>
                                <TableCell component='td' scope="row" sx={{ textAlign: 'center' , borderCollapse: 'collapse', border: '1px solid #ddd'}}>{row.departmentName}</TableCell>
                                <TableCell component='td' scope="row" sx={{ textAlign: 'center' , borderCollapse: 'collapse', border: '1px solid #ddd'}}>{row.departmentCode}</TableCell>
                                <TableCell sx={{ display: 'none' }} component='td' scope="row">{row.departmentId}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button sx={{ margin: '0px 10px', color: '#ffffff', backgroundColor: '#0d6efd' }}
                                        onClick={() => {
                                            selectedCandidate({
                                                id: row.id,
                                                firstName: row.firstName,
                                                lastName: row.lastName,
                                                email: row.email,
                                                dob: row.dob,
                                                age: row.age,
                                                salary: row.salary,
                                                departmentCode: row.departmentCode,
                                                departmentId: row.departmentId,
                                                departmentName: row.departmentName
                                            })
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button sx={{ margin: '0px 10px', color: '#ffffff', backgroundColor: '#dc3545' }}
                                        onClick={() => deleteCandidate(row.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell component='td'>No Data Found</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CandidatesTable;
