import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import modalDialogService from "../services/modalDialog.services";

function ModalDialog() {
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");
  const [boton1, setBoton1] = useState("");
  const [boton2, setBoton2] = useState("");
  const [accionBoton1, setAccionBoton1] = useState(null);
  const [accionBoton2, setAccionBoton2] = useState(null);
  const [tipo, setTipo] = useState("");

  const handleAccionBoton1 = () => {
    if (accionBoton1) {
      accionBoton1();
    }
    setMensaje((x) => (x = ""));
  };
  const handleAccionBoton2 = () => {
    if (accionBoton2) {
      accionBoton2();
    }
    setMensaje((x) => (x = ""));
  };

  const handleClose = () => {
    setMensaje((x) => (x = ""));
  };

  function Show(
    // cuidado en esta funcion cuando se invoca desde el servicio modalDialogService
    //   NO tiene las variables de state del componente, ej mensaje, titulo, boton1....
    //   pero SI a las funciones setMensaje, setTitulo, setBoton1....
    _mensaje,
    _titulo,
    _boton1,
    _boton2,
    _accionBoton1,
    _accionBoton2,
    _tipo
  ) {
    setMensaje((x) => (x = _mensaje));
    setTitulo((x) => (x = _titulo));
    setBoton1((x) => (x = _boton1));
    setBoton2((x) => (x = _boton2));
    setAccionBoton1(() => _accionBoton1);
    setAccionBoton2(() => _accionBoton2);
    setTipo((x) => (x = _tipo));
  }

  useEffect(() => {
    //suscribirse al servicio modalDialogService al iniciar el componente
    modalDialogService.subscribeShow(Show);
    return () => {
      //desuscribirse al servicio modalDialogService al desmontar el componente
      modalDialogService.subscribeShow(null);
    };
  }, []);

  let classHeader = "";
  let faIcon = "";
  switch (tipo) {
    case "success":
      classHeader = "bg-success";
      faIcon = "fa-solid fa-thumbs-up";
      break;
    case "danger":
      classHeader = "bg-danger";
      faIcon = "fa-solid fa-circle-exclamation";
      break;
    case "info":
      classHeader = "bg-info";
      faIcon = "fa-solid fa--info";
      break;
    case "warning":
      classHeader = "bg-warning";
      faIcon = "fa-regular fa-triangle-exclamation";
      break;
    default:
      classHeader = "bg-success";
      break;
  }

  if (mensaje === "") return null;

  return (
    <>
      <Modal
        show
        onHide={handleClose}
        backdrop="static"
        keyboard={mensaje === "BloquearPantalla" ? false : true}
      >
        <Modal.Header
          className={classHeader}
          closeButton={mensaje !== "BloquearPantalla"}
        >
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ fontSize: "1.2em" }}>
          {mensaje === "BloquearPantalla" ? (
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ flex: "1" }}
              ></div>
            </div>
          ) : (
            <p>
              <i
                style={{ fontSize: "1.6em", margin: "0.5em" }}
                className={faIcon}
              ></i>
              {mensaje}
            </p>
          )}
        </Modal.Body>

        <Modal.Footer>
          {boton1 !== "" && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAccionBoton1}
            >
              {boton1}
            </button>
          )}
          {boton2 !== "" && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAccionBoton2}
            >
              {boton2}
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { ModalDialog };
