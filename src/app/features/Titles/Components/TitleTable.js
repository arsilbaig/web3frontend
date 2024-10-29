import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import ConfirmDialog from '../../shared-components/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTitles, selectTitlesData } from '../../../store/slice/TitleSlice';
import { CircularProgress } from '@mui/material';
import SharedSnackBar from '../../shared-components/SharedSnackBar';
import { selectMetaMaskState } from '../../../store/slice/MetaMaskSlice';

function createData(id, name, createdAt, updatedAt) {
    return {
        id,
        name,
        createdAt,
        updatedAt,
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Title Name',
    },
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'CreatedAt',
    },
    {
        id: 'updatedAt',
        numeric: false,
        disablePadding: false,
        label: 'UpdatedAt',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected, setDeleteDialog, setSnackOpen, setSnackMessage, setSnackVarient, metaMaskState } = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Avalible Title List
                </Typography>
            )}
            {numSelected > 0 ? (
                <div onClick={(() => {
                    if (!metaMaskState?.metaMaskAddress) {
                        setSnackMessage("Meta Mask Wallet is not Connected.")
                        setSnackVarient("error")
                        setSnackOpen(true);
                    }
                })}
                >
                    <IconButton disabled={!metaMaskState?.metaMaskAddress} onClick={(() => setDeleteDialog(true))} >
                        <Tooltip title="Delete">
                            <DeleteIcon color="error" />
                        </Tooltip>
                    </IconButton>
                </div>

            ) : (
                null
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function TitleTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('title');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const titleData = useSelector(selectTitlesData) || null
    const dispatch = useDispatch()

    const [snackOpen, setSnackOpen] = React.useState(false)
    const [snackMessage, setSnackMessage] = React.useState("")
    const [snackVarient, setSnackVarient] = React.useState("")

    const metaMaskState = useSelector(selectMetaMaskState)


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    const handleDelete = () => {

    }

    const userFriendlyDate = (date) => {
        const humanReadableDate = date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        });
        return humanReadableDate
    }

    React.useEffect(() => {
        const fetchTitles = async () => {
            try {
                if (titleData?.length <= 0) {
                    setIsLoading(true)
                    const res = await dispatch(getAllTitles({ token: sessionStorage.getItem('token') })).unwrap();
                    const data = res.map((e) => createData(
                        e?.uuid,
                        e?.title,
                        userFriendlyDate(e?.createdAt),
                        userFriendlyDate(e?.updatedAt)
                    ));
                    setRows(data);
                } else {
                    const data = titleData.map((e) => createData(
                        e?.uuid,
                        e?.title,
                        userFriendlyDate(e?.createdAt),
                        userFriendlyDate(e?.updatedAt)
                    ));
                    setRows(data);
                }
            } catch (error) {
                console.error("Failed to fetch titles:", error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false)
                }, 2000)
            }
        };

        fetchTitles();
    }, []);

    React.useEffect(() => {
        const data = titleData.map((e) => createData(
            e?.uuid,
            e?.title,
            userFriendlyDate(e?.createdAt),
            userFriendlyDate(e?.updatedAt)
        ));
        setRows(data);
    }, [titleData]);

    const sortedRows = [...rows].sort(getComparator(order, orderBy));
    const visibleRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, padding: "1rem" }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    setDeleteDialog={setDeleteDialog}
                    setSnackOpen={setSnackOpen}
                    setSnackMessage={setSnackMessage}
                    setSnackVarient={setSnackVarient}
                    metaMaskState={metaMaskState}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        {isLoading ? (
                            <Box className="w-full h-full flex justify-center items-center" sx={{ height: 200 }}>
                                <CircularProgress size={70} color='primary' />
                            </Box>
                        ) : (
                            <>
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {visibleRows.map((row, index) => {
                                        const isItemSelected = selected.includes(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">{row.name}</TableCell>
                                                <TableCell align="left">{row.createdAt}</TableCell>
                                                <TableCell align="left">{row.updatedAt}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </>
                        )}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {deleteDialog && <ConfirmDialog open={deleteDialog} onClose={(() => setDeleteDialog(false))} handleConfirm={handleDelete} dialogText={"Are you sure You want to delete the Selected Titles"} />}

            <SharedSnackBar
                setSnackOpen={setSnackOpen}
                snackOpen={snackOpen}
                snackVarient={snackVarient}
                snackMessage={snackMessage}
            />
        </Box>
    );
}