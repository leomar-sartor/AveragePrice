import { useEffect, useState, useRef } from "react";
import { FileEarmarkArrowDownFill, Paperclip } from "react-bootstrap-icons";

// Funções
import { sumQuantity, averagePrice } from "../../functions";

//Componentes
import { Line } from "../../components";

const today = () => {
  var showdate = new Date();
  var format =
    showdate.getFullYear() +
    "-" +
    (showdate.getMonth() + 1) +
    "-" +
    showdate.getDate();
  return format;
};

export const PageOne = () => {
  
  const inputRef = useRef(null);

  const [inputFields, setInputFields] = useState([
    {
      data: today(),
      corretora: "1",
      operacao: "1",
      quantidade: "",
      preco: ""
    }
  ]);

  const [qtdTotal, setQtdTotal] = useState("");
  const [precoMedio, setPrecoMedio] = useState("");

  useEffect(() => {
    const somaQuantidade = sumQuantity(inputFields);
    setQtdTotal(somaQuantidade);
    const precoMedio = averagePrice(inputFields, somaQuantidade);
    setPrecoMedio(precoMedio);
  }, [inputFields]);

  const addInputField = (
    date = today(),
    corretora = "1",
    op = "1",
    qtd = "",
    price = ""
  ) => {
    console.log("ADD NEW LINE");

    setInputFields([
      ...inputFields,
      {
        data: date,
        corretora: corretora,
        operacao: op,
        quantidade: qtd,
        preco: price
      }
    ]);
  };

  const removeInputField = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);

    setInputFields(rows);
  };

  const handleChange = (event, index, mascara) => {
    console.log("Change Event", event.target);
    console.log("Change Index", index);
    console.log("Change maskedValue", mascara);

    const { name, value } = event.target;

    console.log("Change Name", name);
    console.log("Change Value", value);

    const list = [...inputFields];

    list[index][name] = value;

    console.log("Change List", JSON.stringify(list));

    setInputFields(list);
  };

  const handleSaveData = () => {
    console.log("Salvando Dados");

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
        <div className="container">
          {/* TITULO */}
          <div className="row text-center pt-2">
            <div className="col-sm-4 offset-sm-4 text-break">
              Calculadora de Preço Médio
            </div>
          </div>

          {/* LINHAS */}
          <div className="row">
            <div className="col-sm-12">
              {inputFields.length !== 0 &&
                inputFields.map((data, index) => {
                  return (
                    <div key={index}>
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
                  );
                })}
            </div>
          </div>

          {/* DADOS */}
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
