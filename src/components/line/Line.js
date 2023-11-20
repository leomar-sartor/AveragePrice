import IntlCurrencyInput from "react-intl-currency-input";
import {
  X,
  Plus
} from "react-bootstrap-icons";

const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    }
  }
};

export const Line = ({ qtdregistros, registro, index, remove, add, handleChange }) => {
  const { quantidade, preco } = registro;

  return (
    <div className="row my-3">
      <div className="col-1 text-end">
        {index >= 0 && qtdregistros > 1 && (
          <button
            className="btn btn-outline-danger"
            onClick={() => remove(index)}
          >
            <X size={23} className="" />
          </button>
        )}
      </div>

      <div className="col-5">
        <div className="form-group">
          <input
            type="number"
            onChange={handleChange}
            value={quantidade}
            name="quantidade"
            className="form-control"
            placeholder="Quantidade"
          />
        </div>
      </div>

      <div className="col-5">
        <div className="form-group">
          <IntlCurrencyInput
            className="form-control"
            value={preco}
            name="preco"
            currency="BRL"
            config={currencyConfig}
            onChange={handleChange}
          />
        </div>
      </div>

      {index + 1 === qtdregistros && (
        <div className="col-sm-1">
          <button className="btn btn-outline-primary" onClick={add}>
            <Plus size={24}  className="text-start" />
          </button>
        </div>
      )}
    </div>
  );
};

// https://www.brainstormcreative.co.uk/react-js/react-bootstrap-icons/