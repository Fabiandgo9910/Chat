import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { addMyUser } from '../redux/myUserSlice';
import { db } from '../database';


const Login = ({socket}) => {
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const userId = uuidv4();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        /***************************API de AUTH******************************** */

        let response = await fetch("http://localhost:3001/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => {
                return res.json();
            })

            .then((data) => {
                if (data.code === 1) {
                    setname(data.name)
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("email", email)
                    localStorage.setItem("name",data.name)
                    localStorage.setItem('userId', userId)

                    socket.emit('newUser', { name: data.name, socketID: socket.id, userId });
                    navigate('/chat');

                    if (data.admin) {
                        localStorage.setItem("admin", data.admin)
                        window.location.href = "index.html";
                    }
                    else {
                        navigate('/chat');
                    }
                }

                else if (data.code === 2) {
                    alert("Contrasena incorrecta");
                }
                else if (data.code === 3) {
                    alert("Correo incorrecto, no existe")
                }
            });

        /***************************API de AUTH******************************** */
        const payload = {
            'name': name,
            'userId': userId
        }
        dispatch(addMyUser(payload))

        db.open().catch((error) => {
            console.error('Error al abrir la base de datos', error);
        });

    socket.emit('newUser', { name, socketID: socket.id, userId });
    navigate('/chat');
    };
    return (
        <div className='home'>

            <form className="home__container" onSubmit={handleSubmit}>
                <h2 className="home__header">Introduce el usuario para chatear</h2>
                <label htmlFor="username">Correo</label>
                <input
                    type="email"
                    minLength={6}
                    name="username"
                    className="username__input"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />
                <label htmlFor="username">Password</label>
                <input
                    type="password"
                    minLength={6}
                    name="username"
                    className="username__input"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />
                <label htmlFor="username">Usuario</label>
                <button className="home__cta">Acceder</button>
            </form>
            <button className="login" onClick={() => (navigate('/'))}>Registrarme</button>
        </div>
    );
};

export default Login;