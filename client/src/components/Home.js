import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        /***************************API de AUTH******************************** */

        let response = await fetch("http://localhost:3001/api/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                displeyName:name,
                email: email,
                password: password,


            }),
        })
            .then((res) => {
                console.log(res.status);
                if (res.status === 200) {

                    alert("usuario creado")
                    navigate('/login');

                }
                if (res.status === 403) {
                    alert("ya existe el usuario ")

                }
                if (res.status === 500) {
                    alert("Error al crear usuario por algun motivo ")

                }
                return res;
            })

        /***************************API de AUTH******************************** */
    };
    return (
        <div className='home'>
            <form className="home__container" onSubmit={handleSubmit}>
                <h2 className="home__header">Introduce el usuario para chatear</h2>
                <label htmlFor="username">Nombre</label>
                <input
                    type="text"
                    minLength={6}
                    name="username"
                    className="username__input"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                />
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
            <button className="login" onClick={()=>(navigate('/login'))}>Ya tengo cuenta</button>
        </div>
    );
};

export default Home;