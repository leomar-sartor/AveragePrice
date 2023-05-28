import { useState, useEffect } from "react";
import "./styles.css";
import { Button, Form, Row, Col } from "reactstrap";
import { LineComponent } from "../../Componentes/Line";

export const Home = () => {
  const [lines, setLines] = useState([]);

  const handleCalcular = (e) => {
    const { value } = e.target;

    console.log("Calculando:", e.target);
  };

  const handleRemoveLine = (e) => {
    const { value } = e.target;

    let sequencial = parseInt(e.target.getAttribute("data-seq"));
    lines.splice(sequencial, 1);

    setLines([...lines]);
  };

  const handleAddLine = (e) => {
    let sequencial = parseInt(e.target.getAttribute("data-seq"));
    sequencial += 1;

    setLines([
      ...lines,
      <LineComponent
        sequencial={sequencial}
        handleAddLine={handleAddLine}
        handleRemoveLine={handleRemoveLine}
      ></LineComponent>
    ]);

    console.log("Adicionando:", sequencial);
  };

  useEffect(() => {
    console.log("Construindo HOME");

    setLines([
      ...lines,
      <LineComponent
        sequencial={0}
        handleAddLine={handleAddLine}
        handleRemoveLine={handleRemoveLine}
      ></LineComponent>
    ]);

    console.log("Adicionou a primeira linha.");
  }, []);

  return (
    <div className="container-fluid">
      <Form method="POST" action="teste">
        {lines.length > 0 &&
          lines.map((line, index) => (
            <LineComponent
              key={index}
              sequencial={index}
              val={line.val}
              handleAddLine={handleAddLine}
              handleRemoveLine={handleRemoveLine}
              numberOfLines={lines.length - 1}
            />
          ))}

        <Row className="text-center mt-3">
          <Col>
            <Button color="primary" onClick={handleCalcular}>
              CALCULAR
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
