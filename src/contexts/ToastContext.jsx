import { createContext, useState, useContext } from "react";
import MySnackbar from '../components/MySnackbar'


let ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('')
    const handleOpenSnackBar = (msg) => {
        setOpenSnackbar(true);
        setMessage(msg)
    };

    return (
        <ToastContext.Provider value={{ handleOpenSnackBar }}>
            <MySnackbar openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} message={message} />
            {children}
        </ToastContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
    return useContext(ToastContext)
}