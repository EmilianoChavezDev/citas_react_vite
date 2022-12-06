import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPaciente from "./components/ListadoPaciente";

function App() {
  //useState
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  //obteniendo los pacientes del localStorage
  useEffect(() => {
    const obtenerStorage = () => {
      const getPacientesLS =
        JSON.parse(localStorage.getItem("pacientes")) ?? [];
      setPacientes(getPacientesLS);
    };

    obtenerStorage();
  }, []);

  //guardando pacientes en el localStorage
  useEffect(() => {
    if (pacientes.length > 0) {
      localStorage.setItem("pacientes", JSON.stringify(pacientes));
    }
  }, [pacientes]);

  //funcion para eliminar un paciente de la lista
  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(
      (paciente) => paciente.id !== id
    );
    setPacientes(pacientesActualizados);
    if (pacientesActualizados.length === 0) {
      localStorage.removeItem("pacientes");
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPaciente
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;
