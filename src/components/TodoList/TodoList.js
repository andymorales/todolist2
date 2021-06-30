import React, { Component } from 'react';

class TodoList extends Component {
    
    constructor(props) {
        console.log('En el constructor')
        super(props);
        this.state = {
            newTodo: '',
            items: [
                {id: 0, value: 'tarea 1', checked: true}, 
                {id: 1, value: 'tarea 1', checked: false}
            ]
        }
    }

    // Cambia el valor de newTodo al valor del input cuando se escribe
    // event hace referencia al elemento que cambia
    changeNewTodoValue = (event) => {
        this.setState({newTodo: event.target.value})
    }

    addNewTodo = (e) => {
        e.preventDefault() //evita que el formulario recargue
        if(!this.state.newTodo){ //no hace nada si newTodo es falso
            return
        }
        let todos = this.state.items //le da el valor de items a todos
        let newTodo = { // le da formato a newTodo como objeto
            id: todos.length,
            value: this.state.newTodo,
            checked: false
        } 
        todos.push(newTodo)
        this.setState({ items: todos, newTodo: '' }) //le da valor a items con todos y deja newTodo en blanco

        
    }

    changeChecked = (e) => {
        const idInput = Number(e.target.id) //convierte a número el id
        const item = this.state.items.find(item => item.id === idInput) // encuentra la coincidencia del id en el array items
        item.checked = !item.checked // niega el valor inicial y pone el contrario
        this.setState({items: this.state.items}) // cambia de estado para volver a renderizar
    }

    initState = () => { //manda a traer la key stateTodoList y la parsea en un json en una variable
        const savedState = JSON.parse(window.localStorage.getItem('stateTodoList'))
        console.log(savedState);
        this.setState(savedState)
    }

    saveState = () => { //crear el item stateTodoList en localStorage y le da el valor string de lo que tiene this state
        window.localStorage.setItem('stateTodoList', 
            JSON.stringify(this.state)
        ) // guarda informacion local
    }

    componentDidMount(){
        console.log('el método componentDidMount');
        this.initState()
    }

    componentDidUpdate(){
        console.log('el método componentDidUpdate');
        this.saveState()
    }

    render() { 
        return (
            <div>
                <p>Soy el componente TodoList</p>
                <form>
                    <input type="text" onChange={this.changeNewTodoValue} value={this.state.newTodo} placeholder="Add a task" />
                    <button onClick={this.addNewTodo}>Add</button>
                </form>
                {/* <p>{this.state.newTodo}</p> */}

                <ul>
                    {
                        this.state.items.map(
                            (item, i) => 
                            <li key={i}>
                                <input type='checkbox' id={item.id} onChange={this.changeChecked} checked={item.checked}  />
                                {item.value}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}
 
export default TodoList;