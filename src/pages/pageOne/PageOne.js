import { useEffect, useState, useRef } from "react";
import { FileEarmarkArrowDownFill, Paperclip } from "react-bootstrap-icons";

// Funções
import { sumQuantity, averagePrice } from "../../functions";

//Componentes
import { Line } from "../../components";

const today = () => {
  var showdate = new Date();
  return showdate.getFullYear() + "-" + (showdate.getMonth() + 1) + "-" + showdate.getDate();
};

export const PageOne = () => {

  const inputRef = useRef(null);

  const [inputFields, setInputFields] = useState([
    {
      data: today(),
      operacao: "1",
      quantidade: "",
      saldoCotas: "",
      preco: "",
      taxas: "",
      totalInvestido: "",
      apuracao: ""
    }
  ]);

  const [qtdTotal, setQtdTotal] = useState("");
  const [precoMedio, setPrecoMedio] = useState("");

  useEffect(() => {
    const somaQuantidade = sumQuantity(inputFields);
    setQtdTotal(somaQuantidade);
    const precoMedio = averagePrice(inputFields, somaQuantidade, false);
    setPrecoMedio(precoMedio);
  }, [inputFields]);

  const addInputField = (
    date = today(),
    op = "1",
    qtd = "",
    price = "",
    rate = "",
    totalInvested = "",
    apuration = "",
  ) => {
    setInputFields([
      ...inputFields,
      {
        data: date,
        operacao: op,
        quantidade: qtd,
        preco: price,
        taxas: rate,
        totalInvestido: totalInvested,
        apuracao: apuration,
      }
    ]);
  };

  const removeInputField = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);

    setInputFields(rows);
  };

  const handleChange = (event, index, mascara) => {

    const { name, value } = event.target;

    const list = [...inputFields];

    list[index][name] = value;

    setInputFields(list);
  };

  const handleCalcular = () => {

    console.log("Calcular");
    const somaQuantidade = sumQuantity(inputFields);
    setQtdTotal(somaQuantidade);
    averagePrice(inputFields, somaQuantidade, true);
    const list = [...inputFields];
    setInputFields(list);
  };


  const handleSaveData = () => {
    const fileData = JSON.stringify(inputFields);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = "precomedio.json";
    link.href = url;
    link.click();
  };

  const handleOpenFile = (event) => {
    const fileObj = event.target.files[0];
    const reader = new FileReader();

    reader.readAsText(fileObj);

    reader.onload = (e) => {
      const { result } = e.target;
      const jsonFile = JSON.parse(result);
      setInputFields(jsonFile);
    };
  };

  const handleImportData = () => {
    inputRef.current.click();
  };

  return (
    <div className="page-one">
      <div className="container-fluid">
        {/* TITULO */}
        <div className="row text-center pt-2">
          <div className="col-sm-4 offset-sm-4 text-break" style={{
            paddingTop: 10,
            marginBottom: 10,
            fontSize: 30,
            color: 'lightskyblue'
          }}>
            Calculadora de Preço Médio
          </div>
        </div>

        {/* LINHAS */}
        <div className="row">
          <div className="col-sm-12">
            {inputFields.length !== 0 &&
              inputFields.map((data, index) => {
                return (
                  <div key={index.toString()}>
                    <div>
                      {index === 0 && (
                        <div className="row my-3">
                          <div className="col-1">
                          </div>
                          <div className="col-2">
                            Data
                          </div>
                          <div className="col-1">
                            Operação
                          </div>
                          <div className="col-1" style={{
                            minWidth: 150,
                          }}>
                            Quantidade
                          </div>
                          <div className="col-2">
                            Preço
                          </div>
                          <div className="col-2">
                            Taxas
                          </div>
                          <div className="col-1" style={{
                            minWidth: 180,
                          }}>
                            Lucro/Prejuízo
                          </div>
                          <div className="col-1">
                          </div>
                        </div>

                      )}
                    </div>
                    <div>
                      <Line
                        qtdregistros={inputFields.length}
                        registro={data}
                        index={index}
                        remove={() => removeInputField(index)}
                        add={() => addInputField()}
                        handleChange={(e, index, mascara) =>
                          handleChange(e, index, mascara)
                        }
                      />
                    </div>
                    <div>
                      {index === inputFields.length - 1 && (
                        <div className="row my-3">
                          <div className="col-1">
                          </div>
                          <div className="col-2">
                          </div>
                          <div className="col-1">
                          </div>
                          <div className="col-1" style={{
                            minWidth: 150,
                          }}>
                          </div>
                          <div className="col-2">
                          </div>
                          <div className="col-2">
                          </div>
                          <div className="col-1 text-center" style={{
                            minWidth: 135,
                          }}>
                            <button className="btn btn-outline-warning " onClick={() => handleCalcular()}>
                              Calcular
                            </button>
                          </div>
                          <div className="col-1">
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* DADOS */}
        <div className="row text-center" style={{
            marginBottom: 5,
            fontSize: 25,
            color: 'lightskyblue'
          }}>
          <div className="col-sm-4 offset-sm-4 text-break">
            Saldo Cotas: {qtdTotal}
          </div>
        </div>
        <div className="row text-center" style={{
            marginBottom: 5,
            fontSize: 25,
            color: 'lightskyblue'
          }}>
          <div className="col-sm-4 offset-sm-4 text-break">
            Preço Médio: {precoMedio}
          </div>
        </div>

        {/* BOTOES */}
        <div className="col-sm-12 text-center pt-3">
          <button
            className="btn btn-outline-primary"
            onClick={handleImportData}
          >
            <Paperclip size={35} className="pe-2" />
            Importar
          </button>

          <input
            ref={inputRef}
            className="hidden"
            multiple={false}
            type="file"
            accept=".json"
            onChange={(e) => handleOpenFile(e)}
          />

          <button
            className="btn btn-outline-success ms-2"
            onClick={() => handleSaveData()}
          >
            <FileEarmarkArrowDownFill size={35} className="pe-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
