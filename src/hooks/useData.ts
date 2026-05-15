import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export interface Medicamento {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    tipo: string;
}

function useData() {
    const [datos, setDatos] = useState<Medicamento[]>([])

    const traerDatos = async () => {
        const { data } = await supabase.from('medicamentos').select('*');
        if (data) {
            setDatos(data)
        }
    }

    const insertarDatos = async (item: any) => {
        try {
            const { error } = await supabase.from('medicamentos').insert([item]);
            if (error) {
                console.log(error);
            }
            await traerDatos();
        }
        catch (error) {
            console.log(error)
        }
    }

    const actualizarDatos = async (item: any) => {
        try {
            const { error } = await supabase.from('medicamentos').update(item).eq('id', item.id);
            if (error) {
                console.log(error);
            }
            await traerDatos();
        }
        catch (error) {
            console.log(error)
        }
    }
    const eliminarDatos = async (id: number) => {
        try {
            const { error } = await supabase.from('medicamentos').delete().eq('id', id);
            if (error) {
                console.log(error);
            }
            await traerDatos();
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        traerDatos();
    }, [])

    return { datos, setDatos, traerDatos, insertarDatos, actualizarDatos, eliminarDatos }
}

export default useData
