import React from 'react';
import { Form, Container } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
import './CreateAccount.css';
import { AuthContext } from '../../context.js';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


class CreateAccount extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        // initialize username and password so form is controlled
        this.state =
        {
            email: '',
            username: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    // neat trick to handle all changes to both forms
    // from React tutorial on forms
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleFormSubmit(event) {
        console.log(this.state.email)
        console.log(this.state.password)
        console.log(this.state.username)
  
        //create the account
        fetch('/UserCreateAccount',
          {
            method: 'POST',
            headers: { "Content-Type": "application/json",
              'Accept': 'application/json'
            },
            body: JSON.stringify({ email: this.state.email, password: this.state.password,
                                username: this.state.username }),
          }) .then((response) => response.json())
  
          .then((result) => {
            console.log('Success:', result.loginStatus);
            if (!result.loginStatus)
            {
  
            }
            else {
            //  switchToMainPage()
             console.log(this.props)
              this.props.setLoginState(true)
            }
          })
          .catch((error) => {
            console.log("Noo")
            console.error('Error:', error);
          });


        //then login the user
          fetch('/UserLogIn',
        {
          method: 'POST',
          headers: { "Content-Type": "application/json",
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email: this.state.email, password: this.state.password }),
        }) .then((response) => response.json())

        .then((result) => {
          console.log('Success:', result.loginStatus);
          if (!result.loginStatus)
          {

          }
          else {
          //  switchToMainPage()
            this.props.setLoginState(result.username)
          }
        })
        .catch((error) => {
          console.log("Noo")
          console.error('Error:', error);
        });
      }


    render() {
      const disabledIf = (!this.state.email.length || !this.state.username.length || !this.state.password.length)
        return (
          <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}> 
            <div className='login-background-frame'>
              <h1>Sign Up</h1>
                  <h3>Join the petwork</h3>
                  <Container className='createAccountContainer' fluid>
                      <div>
                          <Form className="createAccountForm">
                              <Form.Group className="mb-1">
                                  <TextField id="outlined-basic"
                                  label="Username"
                                  name="username"
                                  margin = "normal"
                                  value={this.state.username}
                                  onChange={this.handleInputChange} />
                              </Form.Group>
                              <Form.Group className="mb-1">
                                  <TextField id="outlined-basic"
                                  label="Email"
                                  name="email"
                                  margin = "normal"
                                  value={this.state.email}
                                  onChange={this.handleInputChange} />
                              </Form.Group>
                              <Form.Group className="mb-1">
                                  <TextField id="outlined-password-input"
                                  label="Password"
                                  name="password"
                                  type="password"
                                  margin = "normal"
                                  value={this.state.password}
                                  onChange={this.handleInputChange} />
                              </Form.Group>
                              <Button variant="contained"
                              component={Link}
                              to={`/MoreInfoCreate/${this.state.username}`}
                              color="success"
                              size="large"
                              sx={{ fontWeight: 'bold' }}
                              disabled={disabledIf}
                                onClick={this.handleFormSubmit}>
                                  Sign Up
                              </Button>
                          </Form>
                      </div>
                  </Container>
                  <Divider variant="middle" sx={{ m: -0.5, mb: 3 }}/>
                  <Button variant={disabledIf ? "contained" : "outlined"}
                  component={Link}
                  to="/"
                  color="success"
                  size="string"
                  sx={{ fontWeight: 'bold' }}>
                      Go back to login
                  </Button>
            </div>
          </div>
        );
    }
};
export default CreateAccount;
