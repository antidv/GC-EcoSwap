import Recolectado from "../assets/recolectado.png"
import Transportado from "../assets/transportado.png";
import Entregado from "../assets/entregado.png";

const listaEstados = [
  {
    id: "1",
    imagen: Recolectado,
    nombre: "Recolectado/En Preparación",
    descripcion: "El insumo ha sido empaquetado y cargado en el transporte.",
  },
  {
    id: "2",
    imagen: Transportado,
    nombre: "En Tránsito",
    descripcion: "El camión está en la ruta hacia la planta recicladora.",
  },
  {
    id: "3",
    imagen: Entregado,
    nombre: "Entregado",
    descripcion: "El insumo fue recibido y validado por la empresa.",
  },
];

export default listaEstados;
