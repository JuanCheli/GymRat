import React, { useState, useEffect } from "react";
import moment from "moment";
import MaquinasBuscar from "./MaquinasBuscar";
import MaquinasListado from "./MaquinasListado";
import MaquinasRegistro from "./MaquinasRegistro";
import { MaquinasService } from "../../services/maquinas.services";
import modalDialogService from "../../services/modalDialog.services";

function Maquinas() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [ConStock, setConStock] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); 
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);
  const [Gimnasios, setGimnasios] = useState([]);
  const [Proveedores, setProveedores] = useState([]);

  useEffect(() => {
    BuscarGimnasios();
    BuscarProveedores();
  }, []);
  
  async function BuscarGimnasios() {
    try {
      const data = await MaquinasService.BuscarGimnasios();
      setGimnasios(data);
    } catch (error) {
      console.log("¡Error! No se pudo buscar datos de gimnasios en el servidor.");
    }
  }

  async function BuscarProveedores() {
    try {
      const data = await MaquinasService.BuscarProveedores();
      setProveedores(data);
    } catch (error) {
      console.log("¡Error! No se pudo buscar datos de proveedores en el servidor.");
    }
  }

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    try {
      console.log("Buscando con Nombre:", Nombre, "ConStock:", ConStock, "Página:", _pagina);
      const data = await MaquinasService.Buscar(Nombre, ConStock, _pagina);
      console.log("Datos recibidos:", data);
      modalDialogService.BloquearPantalla(false);
      setItem(data.Item);
      setItems(data.Items);
      setRegistrosTotal(data.totalItems);
      // Generar array de las páginas para mostrar en select del paginador
      const arrPaginas = [];
      for (let i = 1; i <= data.totalPages; i++) {
        arrPaginas.push(i);
      }
      setPaginas(arrPaginas);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  }
  
  

  async function BuscarPorId(item, accionABMC) {
    const data = await MaquinasService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C");
  }

  function Modificar(item) {
    if (item.ConStock) {
      modalDialogService.Alert("No puede modificarse una máquina con stock.");
      return;
    }
    if (item.Eliminado) {
      modalDialogService.Alert("No puede modificarse una máquina desactivada.");
      return;
    }
    BuscarPorId(item, "M"); 
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdMaquina: 0,
      Nombre: "",
      IdGimnasio: 0,
      IdProveedor: 0,
      FechaCreacion: moment(new Date()).format("YYYY-MM-DD"),
      ConStock: true,
      Eliminado: false
    });
    alert("Preparando el alta de la máquina...");
    console.log(Item);
  }

  function Imprimir() {
    alert("En desarrollo...");
  }

  async function ActivarDesactivarStock(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (item.ConStock ? "registrar como sin stock" : "registrar como con stock") +
        " a la máquina??",
      undefined,
      undefined,
      undefined,
      async () => {
        await MaquinasService.ActivarDesactivarStock(item);
        await Buscar();
      }
    );
  }

  async function ActivarDesactivarMaquina(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (!item.Eliminado ? "desactivar" : "activar") +
        " a la máquina?",
      undefined,
      undefined,
      undefined,
      async () => {
        await MaquinasService.ActivarDesactivarMaquina(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    try {
      await MaquinasService.Grabar(item);
    } catch (error) {
      alert(error?.response?.data?.message ?? error.toString());
      return;
    }
    await Buscar();
    Volver();

    setTimeout(() => {
      alert(
        "Maquina " +
          (AccionABMC === "A" ? "agregada" : "modificada") +
          " correctamente."
      );
    }, 0);
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Máquinas <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <MaquinasBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          ConStock={ConStock}
          setConStock={setConStock}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <MaquinasListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivarStock,
            ActivarDesactivarMaquina,
            Imprimir,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
            Gimnasios, // Asegurarse de pasar los gimnasios
            Proveedores // Asegurarse de pasar los proveedores
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron maquinas...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <MaquinasRegistro
          {...{ AccionABMC, Gimnasios, Proveedores, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}
export { Maquinas };
