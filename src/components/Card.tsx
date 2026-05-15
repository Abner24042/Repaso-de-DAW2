import { useState, useMemo } from "react";

export function cantStock(stock: number): string {
    if (stock < 25) return 'red'
    if (stock < 45) return 'orange'
    return 'green'
}

export function preciostock(stock: number, precio: number): number {
    return stock * precio
}


interface Props {
    items: {
        id: number;
        nombre: string;
        descripcion: string;
        precio: number;
        stock: number;
        tipo: string;
    }[]
    actualizar: (item: any) => void;
    eliminar: (id: number) => void;
}

function CardList({ items, actualizar, eliminar }: Props) {
    const [categoriaActiva, setCategoriaActiva] = useState<string>('todos');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const categorias = useMemo(() => {
        const categorias = Array.from(new Set(items.map(item => item.tipo)))
        return ['todos', ...categorias]
    }, [items])

    const productosFiltrados = useMemo(() => {
        let filtrados = items;

        if (categoriaActiva !== 'todos') {
            filtrados = filtrados.filter(item => item.tipo === categoriaActiva)
        }

        if (searchQuery.trim() !== '') {
            filtrados = filtrados.filter(item => item.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
        }

        return filtrados
    }, [items, categoriaActiva, searchQuery])

    if (!items || items.length === 0) {
        return <p className="text-gray-600">No hay nada bro :C</p>
    }

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Busca un producto"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="filterbar">
                {categorias.map(categoria => (
                    <button
                        key={categoria}
                        onClick={() => setCategoriaActiva(categoria)}
                        className={`filter-btn ${categoriaActiva === categoria ? 'filter-btn-active' : ''}`}
                    >
                        {categoria}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productosFiltrados.map(item => (
                    <div key={item.id}>
                        <h3>{item.nombre}</h3>
                        <p>{item.descripcion}</p>
                        <p>{item.precio}</p>
                        <p style={{ color: cantStock(item.stock), fontWeight: 900 }}>{item.stock}</p>
                        <p>{item.tipo}</p>
                        <p>Precio del Stock: $ {preciostock(item.stock, item.precio)}</p>
                        <button onClick={() => actualizar(item)} className="update-btn">Actualizar</button>
                        <button onClick={() => eliminar(item.id)} className="delete-btn">Eliminar</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CardList