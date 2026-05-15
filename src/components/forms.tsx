import { useState, useEffect } from "react";
import type { Medicamento } from "../hooks/useData";

interface Props {
    insertarMedicamento: (nombre: string, descripcion: string, precio: number, stock: number, tipo: string) => void;
    actualizarMedicamento: (id: number, nombre: string, descripcion: string, precio: number, stock: number, tipo: string) => void;
    registroEditando: Medicamento | null;
    setRegistroEditando: (medicamento: Medicamento | null) => void;
}

function Formulario({ insertarMedicamento, actualizarMedicamento, registroEditando, setRegistroEditando }: Props) {
    const [nombre, setNombre] = useState(registroEditando ? registroEditando.nombre : '');
    const [descripcion, setDescripcion] = useState(registroEditando ? registroEditando.descripcion : '');
    const [precio, setPrecio] = useState(registroEditando ? String(registroEditando.precio) : '');
    const [stock, setStock] = useState(registroEditando ? String(registroEditando.stock) : '');
    const [tipo, setTipo] = useState(registroEditando ? registroEditando.tipo : '');

    const manejarSubmit = () => {
        if (registroEditando) {
            actualizarMedicamento(registroEditando.id, nombre, descripcion, Number(precio), Number(stock), tipo);
            setRegistroEditando(null)
        } else {
            insertarMedicamento(nombre, descripcion, Number(precio), Number(stock), tipo);
        }

        setNombre('');
        setDescripcion('');
        setPrecio('');
        setStock('');
        setTipo('');
    }
    const cancelarEdicion = () => {
        setRegistroEditando(null);
    }

    useEffect(() => {
        if (registroEditando) {
            setNombre(registroEditando.nombre)
            setDescripcion(registroEditando.descripcion)
            setPrecio(String(registroEditando.precio))
            setStock(String(registroEditando.stock))
            setTipo(registroEditando.tipo)
        }
    }, [registroEditando])

    return (
        <div>
            <form>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" placeholder="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                <label htmlFor="descripcion">Descripción</label>
                <input type="text" placeholder="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

                <label htmlFor="precio">Precio</label>
                <input type="text" placeholder="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />

                <label htmlFor="stock">Stock</label>
                <input type="text" placeholder="stock" value={stock} onChange={(e) => setStock(e.target.value)} />

                <label htmlFor="tipo">Tipo</label>
                <input type="text" placeholder="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />

                <button type="button" onClick={manejarSubmit} className="submit-btn">{registroEditando ? 'Actualizar' : 'Insertar'}</button>
                {registroEditando && <button type="button" onClick={cancelarEdicion}>Cancelar</button>}
            </form>
        </div>
    )
}

export default Formulario