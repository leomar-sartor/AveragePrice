import { useEffect, useState, useRef } from "react";
import { FileEarmarkArrowDownFill, Paperclip, } from "react-bootstrap-icons";

import "./styles.css";

// Funções
import { sumQuantity, averagePrice } from "./functions";

//Componentes
import { Line } from "./components";

//Pages
import { PageTwo, PageThree, Footer } from "./pages";

function Aplicacao() {

  const inputRef = useRef(null);

  const [inputFields, setInputFields] = useState([
    {
      quantidade: "",
      preco: ""
    }
  ]);

  const [qtdTotal, setQtsTotal] = useState("");
  const [precoMedio, setPrecoMedio] = useState("");

  const addInputField = (qtd = "", price = "") => {
      setInputFields([...inputFields, { quantidade: qtd, preco: price}]);
  };

  const removeInputField = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);

    setInputFields(rows);
  };

  const handleChange = (event, index) => {

    const { name, value } = event.target;
    const list = [...inputFields];

    list[index][name] = value;
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
      }
  }

  const handleImportData = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    const somaQuantidade = sumQuantity(inputFields);
    setQtsTotal(somaQuantidade);
    const precoMedio = averagePrice(inputFields, somaQuantidade);
    setPrecoMedio(precoMedio);

  }, [inputFields]);

  return (
    <div className="page">
      <div className="page-one">
        <div className="container">
          <div className="row text-center pt-2">
            <div className="col-sm-4 offset-sm-4 text-break">
              Calculadora de Preço Médio
            </div>
          </div>

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
                        handleChange={(e) => handleChange(e, index)}
                      />
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

      {/* <PageTwo /> */}
      {/* <PageThree /> */}
      <Footer />
    </div>
  );
}

export default Aplicacao;
