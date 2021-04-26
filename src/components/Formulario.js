import { useState } from "react";

import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from "../helper";

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;
const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  --webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Button = styled.button`
  background-color: #00838f;
  font-size: 18px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
  &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({ guardarResumen, guardarCargando }) => {
  const [datos, guardarDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, guardarError] = useState(false);

  // extraer valores;
  const { marca, year, plan } = datos;

  //leear datos

  const obtenerInformacion = (e) => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = (e) => {
    e.preventDefault();

    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      guardarError(true);
      return;
    }

    guardarError(false);

    //base de operacion

    let resultado = 2000;

    //diferencia de años

    const diferencia = obtenerDiferenciaYear(year);

    //por cada año hya que restar el 3%
    resultado -= (diferencia * 3 * resultado) / 100;

    //americano 15
    //asiatico 5#
    //europeo 30

    resultado = calcularMarca(marca) * resultado;

    const incrementoPlan = obtenerPlan(plan);

    resultado = parseFloat(incrementoPlan * resultado.toFixed(2));

    guardarCargando(true);

    setTimeout(() => {
      guardarCargando(false);
      guardarResumen({
        cotizacion: Number(resultado),
        datos,
      });
    }, 3000);

    //basuco 20
    //completo

    //total
  };

  return (
    <form onSubmit={cotizarSeguro}>
      {error ? <Error> Todo los campos son obligatorios </Error> : null}
      <Campo>
        <Label>Marca</Label>
        <Select name="marca" value={marca} onChange={obtenerInformacion}>
          <option value="">-- Seleccione --</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiático</option>
        </Select>
      </Campo>

      <Campo>
        <Label>Año</Label>
        <Select name="year" value={year} onChange={obtenerInformacion}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>

      <Campo>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={obtenerInformacion}
        />
        Básico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={obtenerInformacion}
        />
        Completo
      </Campo>

      <Button type="submit">Cotizar</Button>
    </form>
  );
};

Formulario.propTypes = {
  guardarResumen: PropTypes.func.isRequired,
  guardarCargando: PropTypes.func.isRequired,
};

export default Formulario;
