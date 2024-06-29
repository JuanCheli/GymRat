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
  const [Maquinas, setMaquinas] = useState(null);


  useEffect(() => {
    async function BuscarMaquinas() {
      let data = await MaquinasService.Buscar();
      setMaquinas(data);
    }
    BuscarMaquinas();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await MaquinasService.Buscar(Nombre, ConStock, _pagina);
    modalDialogService.BloquearPantalla(false);

    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las paginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
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
    if (!item.ConStock) {
      modalDialogService.Alert("No puede modificarse una máquina sin stock.");
      return;
    }
    BuscarPorId(item, "M"); 
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdMaquina: 0,
      Nombre: "",
      Gimnasio: 0,
      Proveedor: 0,
      FechaCreacion: moment(new Date()).format("YYYY-MM-DD"),
      ConStock: true,
    });
    alert("preparando el alta...");
    console.log(Item);
  }

  function Imprimir() {
    alert("En desarrollo...");
  }

  async function ActivarDesactivarStock(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (item.ConStock ? "registrar como sin stock" : "registrar como con stock") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await MaquinasService.ActivarDesactivarStock(item);
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
        Maquinas <small>{TituloAccionABMC[AccionABMC]}</small>
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
            Imprimir,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
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
          {...{ AccionABMC, Maquinas, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}
export { Maquinas };
