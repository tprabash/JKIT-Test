import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const CandidatesTable = ({ rows, selectedCandidate, deleteCandidate }) => {
    return (
        <TableContainer component={Paper} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ textAlign: 'center' }}>ID</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>First Name</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Last Name</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Email Address</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Date Of Birth</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Age</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Salary</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Department</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Department Code</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.length > 0 ? rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component='td' scope="row" sx={{ textAlign: 'center' }}>{row.id}</TableCell>
                                <TableCell component='td' scope="row">{row.firstName}</TableCell>
                                <TableCell component='td' scope="row">{row.lastName}</TableCell>
                                <TableCell component='td' scope="row">{row.email}</TableCell>
                                <TableCell component='td' scope="row">{row.dob}</TableCell>
                                <TableCell component='td' scope="row">{row.age}</TableCell>
                                <TableCell component='td' scope="row">{row.salary}</TableCell>
                                <TableCell component='td' scope="row">{row.departmentName}</TableCell>
                                <TableCell component='td' scope="row">{row.departmentCode}</TableCell>
                                <TableCell sx={{ display: 'none' }} component='td' scope="row">{row.departmentId}</TableCell>
                                <TableCell>
                                    <Button sx={{ margin: '0px 10px' }}
                                        onClick={() => {
                                            selectedCandidate({
                                                id: row.id,
                                                firstName: row.firstName,
                                                lastName: row.lastName,
                                                email: row.email,
                                                dob: row.dob,
                                                age: row.age,
                                                salary: row.salary,
                                                departmentId: row.departmentId,
                                                departmentCode: row.departmentCode
                                            })
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button sx={{ margin: '0px 10px' }}
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
