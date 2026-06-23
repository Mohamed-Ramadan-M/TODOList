import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const MySnackbar = ({openSnackbar, setOpenSnackbar, message}) => {
    

    const handleCloseSnackBar = () => {
        setOpenSnackbar(false);
    };
    
    return (
        <Snackbar open = { openSnackbar } autoHideDuration = { 3000} onClose = { handleCloseSnackBar } >
            <Alert
                onClose={handleCloseSnackBar}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar >
    );
}

export default MySnackbar;