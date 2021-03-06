import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './style.css'

import * as actions from '../store/actions/index';
import login from '../services/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    // const login = useSelector(state => state.authentication.login)
    const history = useHistory();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        history.push('/Home')

        setValidated(true);
    };

    useEffect(() => {
          handleValidatedForm()

    });

    async function handleValidatedForm() {
        const log = await login(email, password)
        console.log(log)

    }

    return (
        <div className="container">
            <div className="container-form" style={{ marginRight: '20%', marginTop: "15%" }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, ingrese correo electrónico
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, ingrese contraseña
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        //onClick={() => handleValidatedForm(email, password)}
                    >
                        Iniciar Sesión
                    </Button>
                </Form>
            </div>


        </div>

    );
}

export default Login