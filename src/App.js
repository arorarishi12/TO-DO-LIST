import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { ThemeProvider } from "./ThemeContext.";

class App extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            userName: "", // To store the user's name
            userInput: "",
            list: [],
            showToDoList: false, // To control the display of To-Do list
            theme: 'light', // Default theme is 'light'
        };
    }

    // Set a user input value
    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    // Set user name
    setUserName(value) {
        this.setState({
            userName: value,
        });
    }

    // Confirm name and proceed to To-Do list
    confirmName() {
        if (this.state.userName.trim() !== "") {
            this.setState({
                showToDoList: true,
            });
        }
    }

    // Add item if user input is not empty
    addItem() {
        if (this.state.userInput !== "") {
            const userInput = {
                // Add a random id which is used to delete
                id: Math.random(),

                // Add a user value to list
                value: this.state.userInput,

                // Default status
                status: "Done",
            };

            // Update list
            const list = [...this.state.list];
            list.push(userInput);

            // Reset state
            this.setState({
                list,
                userInput: "",
            });
        }
    }

    // Function to delete item from list using id
    deleteItem(key) {
        const list = [...this.state.list];

        // Filter values and remove the one to delete
        const updateList = list.filter((item) => item.id !== key);

        // Update list in state
        this.setState({
            list: updateList,
        });
    }

    // Function to edit a todo item
    editItem = (index) => {
        const todos = [...this.state.list];
        const editedTodo = prompt("Edit the todo:");
        if (editedTodo !== null && editedTodo.trim() !== "") {
            let updatedTodos = [...todos];
            updatedTodos[index].value = editedTodo;
            this.setState({
                list: updatedTodos,
            });
        }
    };

    // Function to change the status of a task
    changeStatus = (index, newStatus) => {
        const list = [...this.state.list];
        list[index].status = newStatus;
        this.setState({
            list,
        });
    };

    // Function to toggle theme between 'light' and 'dark'
    toggleTheme = () => {
        const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
        this.setState({ theme: newTheme });
        document.documentElement.setAttribute('data-theme', newTheme);
    }

    render() {
        return (
            <Container>
                {!this.state.showToDoList ? (
                    <Row
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                            textAlign: "center",
                        }}
                    >
                        <Col md={{ span: 6, offset: 3 }}>
                            <h1>Welcome to the To-Do App</h1>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Enter your name..."
                                    size="lg"
                                    value={this.state.userName}
                                    onChange={(e) =>
                                        this.setUserName(e.target.value)
                                    }
                                    aria-label="Enter your name"
                                />
                                <InputGroup>
                                    <Button
                                        variant="dark"
                                        className="mt-2"
                                        onClick={() => this.confirmName()}
                                    >
                                        Start
                                    </Button>
                                </InputGroup>
                            </InputGroup>
                        </Col>
                    </Row>
                ) : (
                    <>
                        <Row
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "2rem",
                                fontWeight: "bolder",
                                textAlign: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <Col md={{ span: 12 }}>
                                <span>Hi {this.state.userName}, welcome to your To-Do List!</span>
                                <Button
                                    variant="outline-secondary"
                                    onClick={this.toggleTheme}
                                    style={{ marginLeft: '20px' }}
                                >
                                    Toggle Theme
                                </Button>
                            </Col>
                        </Row>

                        <hr />
                        <Row>
                            <Col md={{ span: 5, offset: 4 }}>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Add item..."
                                        size="lg"
                                        value={this.state.userInput}
                                        onChange={(item) =>
                                            this.updateInput(item.target.value)
                                        }
                                        aria-label="Add something"
                                        aria-describedby="basic-addon2"
                                    />
                                    <InputGroup>
                                        <Button
                                            variant="dark"
                                            className="mt-2"
                                            onClick={() => this.addItem()}
                                        >
                                            ADD
                                        </Button>
                                    </InputGroup>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 5, offset: 4 }}>
                                <ListGroup>
                                    {/* Map over and print items with task numbers */}
                                    {this.state.list.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <ListGroup.Item
                                                    variant="dark"
                                                    action
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <span>
                                                        <strong>
                                                            {index + 1}. {item.value}
                                                        </strong>{" "}
                                                        -{" "}
                                                        <em>
                                                            {item.status}
                                                        </em>
                                                    </span>
                                                    <span>
                                                        <Dropdown>
                                                            <Dropdown.Toggle
                                                                variant="secondary"
                                                                id="dropdown-basic"
                                                                size="sm"
                                                            >
                                                                Status
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item
                                                                    onClick={() =>
                                                                        this.changeStatus(
                                                                            index,
                                                                            "Done"
                                                                        )
                                                                    }
                                                                >
                                                                    Done
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    onClick={() =>
                                                                        this.changeStatus(
                                                                            index,
                                                                            "In Progress"
                                                                        )
                                                                    }
                                                                >
                                                                    In Progress
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        <Button
                                                            style={{
                                                                marginRight:
                                                                    "10px",
                                                                marginLeft:
                                                                    "10px",
                                                            }}
                                                            variant="light"
                                                            onClick={() =>
                                                                this.deleteItem(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Button
                                                            variant="light"
                                                            onClick={() =>
                                                                this.editItem(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </Button>
                                                    </span>
                                                </ListGroup.Item>
                                            </div>
                                        );
                                    })}
                                </ListGroup>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        );
    }
}

export default App;
