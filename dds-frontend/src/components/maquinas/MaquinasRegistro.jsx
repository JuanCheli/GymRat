import React from "react";
import { useForm } from "react-hook-form";
import {config} from "../../config.js"

export default function MaquinasRegistro({
  AccionABMC,
  Gimnasios,
  Proveedores,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });
  const onSubmit = (data) => {
    Grabar(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>
          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label text-light" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre", {
                  required: { value: true, message: "El nombre es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Nombre ? "is-invalid" : "")
                }
              />
              {errors?.Nombre && touchedFields.Nombre && (
                <div className="invalid-feedback">
                  {errors?.Nombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Gimnasio */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label text-light" htmlFor="IdGimnasio">
                Gimnasio<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("IdGimnasio", {
                  required: { value: true, message: "Gimnasio es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.IdGimnasio ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Gimnasios?.map((x) => (
                  <option value={x.IdGimnasio} key={x.IdGimnasio}>
                    {x.Nombre}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.IdGimnasio?.message}
              </div>
            </div>
          </div>

          {/* campo Proveedor */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label text-light" htmlFor="IdProveedor">
                Proveedor<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("IdProveedor", {
                  required: { value: true, message: "Proveedor es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.IdProveedor ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Proveedores?.map((x) => (
                  <option value={x.IdProveedor} key={x.IdProveedor}>
                    {x.Nombre}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.IdProveedor?.message}
              </div>
            </div>
          </div>

          {/* campo FechaCreacion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label text-light" htmlFor="FechaCreacion">
                Fecha Creacion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaCreacion", {
                  required: {
                    value: true,
                    message: "Fecha Creacion es requerido",
                  },
                })}
                className={
                  "form-control " + (errors?.FechaCreacion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaCreacion?.message}
              </div>
            </div>
          </div>

          {/* campo ConStock */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label text-light" htmlFor="ConStock">
                Con Stock<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("ConStock")}
                className="form-control"
                disabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="button-64 h-100">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="button-64 h-100"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}
      </div>
    </form>
  );
}
