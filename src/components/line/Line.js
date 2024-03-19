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

  const { data, corretora, operacao, quantidade, preco } = registro;

  return (
    <div className="row my-3">
      {/* REMOVER */}
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

      {/* DATA */}
      <div className="col-2">
        <div className="form-group">
          <input
            type="date"
            name="data"
            value={data}
            className="form-control"
            // onChange={handleChange}
            onChange={(e, val, maskedValue) => {
              handleChange(e, index, maskedValue);
            }}
          />
        </div>
      </div>

      {/* CORRETORA */}
      <div className="col-2">
        <div className="form-group">
          <select
            name="corretora"
            className="form-select"
            aria-label="Default select example"
            value={corretora}
            // onChange={handleChange}
            onChange={(e, val, maskedValue) => {
              handleChange(e, index, maskedValue);
            }}
          >
            <option value="1">XP</option>
            <option value="2">CLEAR</option>
          </select>
        </div>
      </div>

      {/* OPERAÇÃO */}
      <div className="col-1">
        <div className="form-group">
          <select
            name="operacao"
            className="form-select"
            aria-label="Default select example"
            value={operacao}
            // onChange={handleChange}
            onChange={(e, val, maskedValue) => {
              handleChange(e, index, maskedValue);
            }}
          >
            <option value="1">C</option>
            <option value="2">V</option>
          </select>
        </div>
      </div>

      {/* QUANTIDADE */}
      <div className="col-2">
        <div className="form-group">
          <input
            type="number"
            value={quantidade}
            name="quantidade"
            className="form-control"
            placeholder="Quantidade"
            // onChange={handleChange}
            onChange={(e, val, maskedValue) => {
              handleChange(e, index, maskedValue);
            }}
          />
        </div>
      </div>

      {/* PREÇO */}
      <div className="col-3">
        <div className="form-group">
          <IntlCurrencyInput
            className="form-control"
            //Arrumar - faz bug com parseFloat
            //Seleciona o campo inteiro e digita
            //duas vez 1 (11 por exemplo)
            //acaba por zerar o valor
            //value={parseFloat(preco)}
            //Normal apresenta warning: `IntlCurrencyInput`, expected `number`.
            value={preco}
            // value={105.05} - TEM QUE SER ASSIM O PREÇO
            //Transformar o parametro de strin pra decimal
            name="preco"
            currency="BRL"
            config={currencyConfig}
            onChange={(e, val, maskedValue) => {
              //console.log("LINE");
              //console.log(val); // value without mask (ex: 1234.56)
              //console.log(maskedValue, typeof maskedValue); // masked value (ex: R$1234,56)
              handleChange(e, index, maskedValue);
            }}
          />
        </div>
      </div>

      {/* ADICIONAR */}
      {index + 1 === qtdregistros && (
        <div className="col-sm-1">
          <button className="btn btn-outline-primary" onClick={add}>
            <Plus size={24} className="text-start" />
          </button>
        </div>
      )}
    </div>
  );
};

// https://www.brainstormcreative.co.uk/react-js/react-bootstrap-icons/