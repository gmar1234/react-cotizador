import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Mensaje = styled.p`
  padding: 1rem;
  text-align: center;
  background-color: rgb(127, 224, 237);
  margin-top: 2rem;
`;

const ResultadoCotizacion = styled.div`
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #26c6da;
  background-color: rgb(127, 224, 237);
  margin-top: 1rem;
  position: relative;
`;

const TextoCotizacion = styled.p`
  color: #00838f;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
`;

export const Resultado = ({ cotizacion }) => {
  return cotizacion === 0 ? (
    <Mensaje>Elige marca,año y tipo de seguro </Mensaje>
  ) : (
    <ResultadoCotizacion>
      <TransitionGroup component="span" className="resultado">
        <CSSTransition
          classNames="resultados"
          key={cotizacion}
          timeout={{ enter: 500, exit: 500 }}
        >
          <TextoCotizacion>
            El total es S/ <span>{cotizacion}</span>
          </TextoCotizacion>
        </CSSTransition>
      </TransitionGroup>
    </ResultadoCotizacion>
  );
};

Resultado.propTypes = {
  cotizacion: PropTypes.number.isRequired,
};
