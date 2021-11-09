import { Button,Box,TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import './MercadoPagoStyle.css';
import {useDispatch} from "react-redux";
import CartProductCheckout from "./CartProductCheckout";
import PrecioTotal from "../PrecioTotal"; 
import { checkout } from "../../Redux/actions/cartAction";

function validate(input){
    // const contenedor = document.querySelector(".contenedor")
    let error = {};
    if(!input.nombre){
        error.nombre = ' * Campo Requerido';
    }
    if(!input.apellido){
        error.apellido = ' * Campo Requerido';
    }
    if(!input.codigo){
        error.codigo = ' * Campo Requerido';
    }
    if(!input.telefono ){
        error.telefono = ' * Campo Requerido';
    }
    if(!input.codigoPostal){
        error.codigoPostalo = ' * Campo Requerido';
    }
    if(!input.calle){
        error.calle = ' * Campo Requerido';
    }
    if(!input.altura){
        error.altura = ' * Campo Requerido';
    }
    if(!input.email || !input.email.includes('@')|| !input.email.includes('.') || input.email.length < 6 || input.email.split('@') < 2 ){
        error.email = ' email no valido';
    }
    return error;
}

export default function MercadoPago(){
 
    const dispatch=useDispatch()

const [payer, setPayer] = useState({ nombre:"", apellido:"", codigo:"", telefono:"", codigoPostal:"", calle:"", altura:"",  } )

const [error, setError] = useState({})

const { cartItems } = useSelector((state) => state.cart);


function handleChange(e) {
    setPayer({
        ...payer,
        [e.target.name]: e.target.value

    })

    setError(validate({
        ...payer,
        [e.target.name]: e.target.value
    }))
}

        const items= cartItems.map(producto => {
            return(
                    {
                        title: producto.nombre,
                        unit_price: producto.precio,
                        quantity: producto.qty,
                               
                    }
                ) 
            }
        )
        
        const handleOnSubmit=(e )=>{
            e.preventDefault()
            dispatch(checkout(payer, items))
        } 
       
        
    return (
        <div className="contenedorMercadoGral">
            <div>
                <form  onSubmit={handleOnSubmit} >
                    <Box>
                        <TextField error={error.nombre}  className="input-buyer" onChange={handleChange} value={payer.nombre} name="nombre" type="text" label="Nombre" variant="filled" color="success"/><br/><br/>
                        <TextField error={error.apellido}  className="input-buyer" onChange={handleChange} value={payer.apellido} name="apellido" type="text" label="Apellido" variant="filled" color="success"/><br/><br/>

                        <TextField error={error.codigo}  className="input-buyer-short" onChange={handleChange} value={payer.codigo} name="codigo" type="number" label="Codigo Area (sin 0)" variant="filled" color="success"/>
                        <TextField error={error.telefono}  className="input-buyer-phone" onChange={handleChange} value={payer.telefono} name="telefono" type="number" label="Telefono (sin 15)" variant="filled" color="success"/><br/><br/>

                        <TextField error={error.codigoPostal}  className="input-buyer-short" onChange={handleChange} value={payer.codigoPostal} name="codigoPostal" type="text" label="Codigo Postal" variant="filled" color="success"/>
                        <TextField error={error.calle}  className="input-buyer-adress" onChange={handleChange} value={payer.calle} name="calle" type="text" label="Calle" variant="filled" color="success"/>
                        <TextField error={error.altura}  className="input-buyer-short" onChange={handleChange} value={payer.altura} name="altura" type="integer" label="Altura" variant="filled" color="success"/><br/><br/>

                        <TextField  error={error.email} helperText={error.email} className="input-buyer" onChange={handleChange} value={payer.email} name="email" type="text" label="Email" variant="filled" color="success"/><br/><br/>
                    
                        <Button  sx={{justifySelf:"center"}} variant="contained" color="success" type="submit">Finalizar Compra</Button>
                        
                    </Box>
                </form>
            </div>
            <div>       
                {cartItems && cartItems.map((producto) => {
                    return (
                     <CartProductCheckout
                            key={producto.id}
                            imagen={producto.imagen}
                            nombre={producto.nombre}
                            precio={producto.precio}
                            quantity={producto.qty}
                        />
                    );
                })}
                    <PrecioTotal cartItems={cartItems}/>
            </div>        
        </div>
    )
}

