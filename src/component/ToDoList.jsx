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
import { useContext } from 'react';
import { todocontext } from './contextcom.jsx'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';




export default function ToDoList() {
    const { todos, setTodos } = useContext(todocontext)
    const [tasktitle, setTaskTitle] = useState("")
    const [buttonValue , setButtonValue]=useState("all")
    const completedTodos = todos.filter((t)=>{
        return t.isCompleted
    })
    const nonCompletedTodos = todos.filter((t)=>{
        return !t.isCompleted
    })

    const allTodos = todos

    let todosToBeRender = allTodos

    if(buttonValue == "all"){
        todosToBeRender = allTodos
    }else if(buttonValue == "completed"){
        todosToBeRender = completedTodos
    }else if(buttonValue == "non-completed"){
        todosToBeRender = nonCompletedTodos
    }

    const todomap = todosToBeRender.map((t) => {
        return (
            <ToDo key={t.id} todo={t} />
        )
    })
    function handelAdd() {
        if (!tasktitle.trim()) return;

        const newTask = {
            id: uuidv4(),
            task: tasktitle,
            details: "",
            isCompleted: false
        }
        const data = [...todos, newTask]
        setTodos(data)
        setTaskTitle("")

    }
    useEffect(()=>{
        setTodos(JSON.parse(localStorage.getItem("todos")) ?? [])
    },[])
    
    function handleButtonChange(e){
        setButtonValue(e.target.value)
    }
    return (
        <>

            <Container className='con' maxWidth="sm" sx={{boxShadow:"0px 0px 100px -20px #ff9" , borderRadius:"20px"}}>
                    <Card sx={{ minWidth: 275 }} style={{maxHeight:"100vh", overflow:"scroll"}}>
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
                            onChange={(e)=>{handleButtonChange(e)}}
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

                        {todomap}

                        <Grid container spacing={1} className="mt-2">
                            <Grid size={8} className=' p-2'>
                                <TextField
                                    value={tasktitle}
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
