import { useState } from "react";
import Formulario from "./components/forms";
import useData from "./hooks/useData";
import type { Medicamento } from "./hooks/useData";
import CardList from "./components/Card";

export default function App() {
  const { datos, insertarDatos, actualizarDatos, eliminarDatos } = useData();
  const [registroEditando, setRegistroEditando] = useState<Medicamento | null>(null);

  const handleActualizar = (registro: Medicamento) => {
    setRegistroEditando(registro);
  }

  const handleCancelarEdicion = () => {
    setRegistroEditando(null);
  }

  return (
    <div>
      <h1>Farmacia</h1>
      <Formulario
        insertarMedicamento={insertarDatos}
        actualizarMedicamento={actualizarDatos}
        registroEditando={registroEditando}
        setRegistroEditando={handleCancelarEdicion}
      />
      <CardList
        items={datos}
        actualizar={handleActualizar}
        eliminar={eliminarDatos}
      />
    </div>
  )
}