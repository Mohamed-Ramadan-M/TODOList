import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext.jsx'
import { useToast } from '../contexts/ToastContext.jsx'



const ToDo = ({ todo, showModal }) => {
    const { dispach } = useContext(TodoContext)
    const { handleOpenSnackBar } = useToast()

    function handelCheckButton() {
        dispach({ type: "toggelCheck", payload: { todo } })
        if (todo.isCompleted === false) {
            handleOpenSnackBar("The task removed from completed area")
        } else {
            handleOpenSnackBar("The task is completed")
        }
    }
    function handleDeleteButton() {

        dispach({ type: 'deleted', payload: todo })
        handleOpenSnackBar('Task Deleted successfully')

    }
    function handleEditClick() {
        showModal(todo)
    }

    return (
        <>
            <Card sx={{ minWidth: 275, marginTop: 2 }} >
                <CardContent >
                    <Grid container spacing={1} >
                        <Grid size={8} className=' p-2' key={todo.id}>
                            <Typography gutterBottom variant="h6" component="div">
                                {todo.task}
                            </Typography>
                            <hr />
                            <Typography variant="span" component="div">
                                {todo.details}
                            </Typography>
                        </Grid>
                        <Grid size={4} className="d-flex justify-content-around align-items-center">
                            {/*check button */}
                            <IconButton onClick={handelCheckButton} sx={{ color: todo.isCompleted ? "white" : "green", backgroundColor: todo.isCompleted ? "green" : "white", }} className=" rounded-circle p-1 border border-1 border-success ">
                                <CheckIcon />
                            </IconButton>
                            {/* check button */}
                            <IconButton onClick={handleEditClick} color="primary" className=" rounded-circle p-1 border border-1 border-primary" >
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={handleDeleteButton} color="error" className=" rounded-circle p-1 border border-1 border-danger">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default ToDo;