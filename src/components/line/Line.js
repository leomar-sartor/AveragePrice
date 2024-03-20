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

  const { data, operacao, quantidade, preco, taxas, apuracao } = registro;

  let apuracaocomLucro = apuracao > 0;
  let apuracaocomPrejuizo = apuracao < 0;

  let cor = "";
  if(apuracaocomLucro)
    cor = "lightgreen";
  if(apuracaocomPrejuizo)
    cor = "lightcoral";

  const firsLine = index === 0;

  return (
    <div className="row my-3" key={index}>
      {/* REMOVER */}
      <div className="col-1 text-end">
        {!firsLine && qtdregistros > 1 && (
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
            onChange={(e, val, maskedValue) => {
              handleChange(e, index, maskedValue);
            }}
          />
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
            disabled={firsLine}
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
      <div className="col-1" style={{
        minWidth: 150,
      }}>
        <div className="form-group">
          <input
            type="number"
            value={quantidade}
            name="quantidade"
            className="form-control"
            placeholder="0"
            onChange={(e, val, maskedValue) => {
              handleChange(e, index, maskedValue);
            }}
          />
        </div>
      </div>

      {/* PREÇO */}
      <div className="col-2">
        <div className="form-group">
          <IntlCurrencyInput
            className="form-control"
            value={preco}
            //value={parseFloat(preco)}
            name="preco"
            currency="BRL"
            config={currencyConfig}
            onChange={(e, val, maskedValue) => {
              handleChange(e, index, maskedValue);
            }}
          />
        </div>
      </div>

      {/* TAXA */}
      <div className="col-2">
        <div className="form-group">
          <IntlCurrencyInput
            className="form-control"
            value={taxas}
            //value={parseFloat(taxas)}
            name="taxas"
            currency="BRL"
            config={currencyConfig}
            onChange={(e, val, maskedValue) => {
              handleChange(e, index, maskedValue);
            }}
          />
        </div>
      </div>

      {/* APURAÇÃO */}
      <div className="col-1" style={{
        minWidth: 135,
      }}>
        <div className="form-group"
        >
          <IntlCurrencyInput
            className="form-control readonly"
            style={{ backgroundColor: cor }}
            value={apuracao}
            //value={parseFloat(apuracao)}
            name="apuracao"
            disabled={true}
            currency="BRL"
            config={currencyConfig}
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