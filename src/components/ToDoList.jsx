import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToDo from './ToDo.jsx';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMemo, useState, useContext, useEffect } from 'react';
import { TodoContext } from '../contexts/TodoContext.jsx'
import { useToast } from '../contexts/ToastContext.jsx'




export default function ToDoList() {
    const { todos, dispach } = useContext(TodoContext)
    const { handleOpenSnackBar } = useToast()
    const [todo, setTodo] = useState({})
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDetails, setTaskDetails] = useState("")
    const [buttonValue, setButtonValue] = useState("all")
    const [openModal, setOpenModal] = useState(false)
    const completedTodos = useMemo(() => {
        return todos.filter((t) => {
            return t.isCompleted
        })
    }, [todos])
    const nonCompletedTodos = useMemo(() => {
        return todos.filter((t) => {
            return !t.isCompleted
        })
    }, [todos])
    let todosToBeRender = todos

    if (buttonValue == "all") {
        todosToBeRender = todos
    } else if (buttonValue == "completed") {
        todosToBeRender = completedTodos
    } else if (buttonValue == "non-completed") {
        todosToBeRender = nonCompletedTodos
    }

    useEffect(() => {
        dispach({ type: "getData" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //* todoList handlers

    function handelAdd() {
        dispach({ type: 'added', payload: { title: taskTitle } })
        setTaskTitle("")
        handleOpenSnackBar("Task Added successfully")
    }
    function handleButtonChange(e) {
        setButtonValue(e.target.value)
    }
    //* ==============todoList handlers===============

    //* Modal handlers
    function showEditModal(todoInfo) {
        setTaskTitle(todoInfo.task)
        setTaskDetails(todoInfo.details)
        setTodo(todoInfo)
        setOpenModal(true)

    }
    function handleClose() {
        setOpenModal(false)
    }
    function handleEditConfirmation() {

        dispach({ type: 'updated', payload: { todo, taskDetails } })
        handleOpenSnackBar("Task Edited successfully")
        setOpenModal(false)
    }
    //* ================Modal handlers===============

    const todoMap = todosToBeRender.map((t) => {
        return (
            <ToDo key={t.id} todo={t} showModal={showEditModal} />
        )
    })

    return (
        <>
            {/* Edit Modal */}
            <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
                        EDIT YOUR TASK
                    </Typography>
                    <Grid size={8} className=' p-2'>

                        <TextField
                            value={taskTitle} onChange={(e) => {
                                setTaskTitle(e.target.value)
                            }} id="outlined-basic" label="Task title" variant="standard" sx={{ width: 1, marginBottom: 4 }} />
                    </Grid>

                    <Grid size={8} className=' p-2'>
                        <TextField
                            value={taskDetails} onChange={(e) => {
                                setTaskDetails(e.target.value)
                            }} id="outlined-basic" label="Task Details" variant="standard" sx={{ width: 1 }} />
                    </Grid>

                    <Grid container spacing={1} className="mt-3" >
                        <Grid size={6} >
                            <Button variant="outlined" onClick={handleEditConfirmation} sx={{ width: 1, height: 1, fontSize: 16, fontWeight: 800 }}>Confirm Edits</Button>
                        </Grid>
                        <Grid size={6} >
                            <Button variant="outlined" onClick={handleClose} sx={{ width: 1, height: 1, fontSize: 18, fontWeight: 800 }}>Close</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            {/* ===========Edit Modal============ */}
            <Container className='con' maxWidth="sm" sx={{ boxShadow: "0px 0px 100px -20px #ff9", borderRadius: "20px" }}>
                <Card sx={{ minWidth: 275 }} style={{ maxHeight: "100vh", overflow: "scroll" }}>
                    <CardContent sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            TODO LIST APP
                        </Typography>
                        <Typography variant="h3" component="div" className='fw-bold' >
                            <Divider>TASKS</Divider>
                        </Typography>
                        <ToggleButtonGroup
                            value={buttonValue}
                            exclusive
                            aria-label="text alignment"
                            onChange={(e) => { handleButtonChange(e) }}
                        >
                            <ToggleButton value="all" aria-label="left aligned">
                                ALL
                            </ToggleButton>
                            <ToggleButton value="completed" aria-label="centered" >
                                COMPLETED
                            </ToggleButton>
                            <ToggleButton value="non-completed" aria-label="right aligned">
                                PENDING
                            </ToggleButton>
                        </ToggleButtonGroup>
                        {todoMap}
                        <Grid container spacing={1} className="mt-2">
                            <Grid size={8} className=' p-2'>
                                <TextField
                                    value={taskTitle}
                                    onChange={
                                        (e) => {
                                            setTaskTitle(e.target.value)
                                        }
                                    }
                                    id="outlined-basic" label="Task" variant="outlined" sx={{ width: 1 }} />
                            </Grid>
                            <Grid size={4} className="d-flex justify-content-around align-items-center">
                                <Button onClick={handelAdd} variant="contained" sx={{ width: 1, height: 0.7, fontSize: 24, fontWeight: 800 }}  >ADD</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
