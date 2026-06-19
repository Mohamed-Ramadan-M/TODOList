import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useState } from 'react';
import { todocontext } from './contextcom.jsx'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';


const ToDo = ({ todo }) => {
    const { todos, setTodos } = useContext(todocontext)
    const [open, setopen] = useState(false)
    const [taskTitleEdited, setTaskTitleEdited] = useState(todo.task)
    const [taskDetailsEdited, setTaskDetailsEdited] = useState(todo.details)
    // console.log(todo.task)
    function handelcheckbutton() {
        const updateTodo = todos.map((t) => {
            if (t.id == todo.id) {
                t.isCompleted = !t.isCompleted
            }
            return t
        })

        setTodos(updateTodo)
        localStorage.setItem("todos", JSON.stringify(updateTodo))

    }
    function handleDeleteButton() {
        const deletedTask = todos.filter((t) => {
            return t.id == todo.id ? false : true
        })
        setTodos(deletedTask)
        localStorage.setItem("todos", JSON.stringify(deletedTask))


    }
    function handleClose() {
        setopen(false)
    }
    function handleEditeClick() {
        setopen(true)
    }
    function handleEditeConfermaion() {
        // console.log(taskTitleEdited , taskDetailsEdited)x
        const editedTask = todos.map((t) => {
            if (t.id == todo.id) {
                return { ...t, task: taskTitleEdited, details: taskDetailsEdited }
            } else {
                return t
            }
        })

        setTodos(editedTask)
        localStorage.setItem("todos", JSON.stringify(editedTask))
        setopen(false)
    }
    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" className='mb-5'>
                            EDITE YOUR TASK
                        </Typography>
                        <Grid size={8} className=' p-2'>

                            <TextField
                                value={taskTitleEdited} onChange={(e) => {
                                    setTaskTitleEdited(e.target.value)
                                }} id="outlined-basic" label="Task title" variant="standard" sx={{ width: 1, marginBottom: 4 }} />
                        </Grid>

                        <Grid size={8} className=' p-2'>

                            <TextField
                                value={taskDetailsEdited} onChange={(e) => {
                                    setTaskDetailsEdited(e.target.value)
                                }} id="outlined-basic" label="Task Details" variant="standard" sx={{ width: 1 }} />
                        </Grid>

                        <Grid container spacing={1} className="mt-3" >
                            <Grid size={6} >
                                <Button variant="outline" onClick={handleEditeConfermaion} sx={{ width: 1, height: 1, fontSize: 16, fontWeight: 800 }}>Confirm Edits</Button>
                            </Grid>
                            <Grid size={6} >
                                <Button variant="outline" onClick={handleClose} sx={{ width: 1, height: 1, fontSize: 18, fontWeight: 800 }}>Close</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div >
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
                            <IconButton onClick={handelcheckbutton} sx={{ color: todo.isCompleted ? "white" : "green", backgroundColor: todo.isCompleted ? "green" : "white", }} className=" rounded-circle p-1 border border-1 border-success ">
                                <CheckIcon />
                            </IconButton>
                            {/* check button */}
                            <IconButton onClick={handleEditeClick} color="primary" className=" rounded-circle p-1 border border-1 border-primary" >
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