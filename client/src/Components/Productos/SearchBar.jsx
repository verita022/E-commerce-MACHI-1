import "../../Styles/SearchBar.css"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts, setNombre  } from "../../Redux/actions/productAction"

export default function SearchBar() {
   const [input, setInput] = useState("")
    const dispatch = useDispatch()
  
    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(getProducts({ pagina: 1, nombre:input, categoria:"", ordenamiento:"" }))
        dispatch(setNombre(input))
        setInput("")
    }

    return (
        <form className="search" onSubmit={onSubmit}>
            <div><input className="input" type="text" placeholder="Busca un producto" onChange={handleInputChange} value={input} /></div>
            <div><button className="lupa" type="submit">🔍</button></div>
        </form>
    )
}