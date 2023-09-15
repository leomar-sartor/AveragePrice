import { useEffect, useState } from "react";
import IntlCurrencyInput from "react-intl-currency-input";
import "./styles.css";

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

function AddRemoveInputField() {
  //   const money = 1234567.89;
  //   const res = new Intl.NumberFormat("pt-BR", {
  //     style: "currency",
  //     currency: "BRL"
  //   }).format(money);

  const [inputFields, setInputFields] = useState([
    {
      quantidade: "",
      preco: ""
    }
  ]);

  const [qtdTotal, setQtsTotal] = useState("");
  const [precoMedio, setPrecoMedio] = useState("");

  const addInputField = () => {
    setInputFields([...inputFields, { quantidade: "", preco: "" }]);
  };

  const removeInputField = (index) => {
    console.log("Clicou Remove Const => ", index);
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const handleChange = (index, e, val, maskedValue) => {
    const { name, value } = e.target;
    const list = [...inputFields];

    list[index][name] = value;
    setInputFields(list);
  };

  useEffect(() => {
    //Quantidade
    let somaQuantidade = inputFields.reduce((acc, val) => {
      let qtd = 0;
      if (val.quantidade !== "") {
        qtd = parseInt(val.quantidade);
      }
      return (acc += qtd);
    }, 0);

    setQtsTotal(somaQuantidade);

    //Preço médio
    let somaPrecoMedio = inputFields.reduce((acc, val) => {
      let preco = 0;
      if (val.preco !== "") {
        preco = val.preco.replace(/[^0-9]/g, "") / 100;
      }
      let qtd = 0;
      if (val.quantidade !== "") {
        qtd = parseInt(val.quantidade);
      }

      return (acc += preco * qtd);
    }, 0);

    let PM = (somaPrecoMedio / somaQuantidade);
    if (Object.is(PM, Number.NaN))
        PM = 0;

    let newPriceMiddle = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(PM);

    setPrecoMedio(newPriceMiddle);

  }, [inputFields]);

  return (
    <div className="page">
      <div className="page-one">
        <div className="container">
          <div className="row text-center">
            <div className="col-sm-4 offset-sm-4 text-break">Meus Projetos</div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              {inputFields.map((data, index) => {
                const { quantidade, preco } = data;

                return (
                  <div className="row my-3" key={index}>
                    <div className="col-1">
                      {inputFields.length !== 1 ? (
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => removeInputField(index)}
                        >
                          {" "}
                          Deletar{" "}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-5">
                      <div className="form-group">
                        <input
                          type="number"
                          onChange={(e) => handleChange(index, e)}
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
                          type="text"
                          className="form-control"
                          value={preco}
                          name="preco"
                          currency="BRL"
                          config={currencyConfig}
                          onChange={(e) => handleChange(index, e, e.target)}
                        />
                      </div>
                    </div>

                    {index === inputFields.length - 1 && (
                      <div className=" col-sm-1">
                        <button
                          className="btn btn-outline-success"
                          onClick={addInputField}
                        >
                          Novo
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="row text-center">
            <div className="col-sm-4 offset-sm-4 text-break">
              Quantidade: {qtdTotal}
            </div>
          </div>
          <div className="row text-center">
            <div className="col-sm-4 offset-sm-4 text-break">
              Preço Médio: {precoMedio}
            </div>
          </div>
        </div>
      </div>

      <div className="page-two text-center">Página 2</div>

      <div className="footer text-center">
        <p className="pt-4"> Desenvolvido por Leomar Vaz Sartor </p>
      </div>
    </div>
  );
}

export default AddRemoveInputField;
