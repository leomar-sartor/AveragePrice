import "./App.css";
import React, { useState } from "react";

import { Button, Form, Input, Row, Col, Label, CloseButton } from "reactstrap";

const App = () => {
  const [linhas, setLinhas] = useState([]);
  
  const addRowInput = (e) => {
    e.preventDefault();
    setLinhas([...linhas, ""]);
  };
  
  const removeRowInput = (position) => {
    //e.preventDefault();
    setLinhas([...linhas.filter((_, index) => index !== position)]);
  };

  return (
    <div className="container-fluid">
      <Form method="POST" action="teste">
        <Row className="mt-3">
          <Col md={1}>
            <CloseButton />
          </Col>
          <Col md={5}>
            <Label className="visually-hidden" for="exampleEmail">
              {" "}
              Email{" "}
            </Label>
            <Input
              id="exampleEmail"
              name="number"
              placeholder="Quantidade"
              type="number"
            />
          </Col>
          <Col md={5}>
            <Label className="visually-hidden" for="examplePassword">
              Password
            </Label>
            <Input
              id="examplePassword"
              name="number"
              placeholder="R$ 0,00"
              type="number"
            />
          </Col>
          <Col md={1}>
            <Button color="success" onClick={addRowInput}>
              Novo
            </Button>
          </Col>
        </Row>

        {linhas.map((line, index) => (
          <Row key={index} className="mt-3">
            <Col md={1}>
              <CloseButton onClick={ () => { removeRowInput(index) }}/>
            </Col>
            <Col md={5}>
              <Input
                id=""
                name="number"
                placeholder="Quantidade"
                type="number"
              />
            </Col>
            <Col md={5}>
              <Input id="" name="number" placeholder="Preco" type="number" />
            </Col>
            <Col md={1}>
              <Button color="success" onClick={addRowInput}>
                Novo
              </Button>
            </Col>
          </Row>
        ))}

        <Row className="text-center mt-3">
          <Col>
            <Button color="primary" type="submit">
              Processar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default App;
