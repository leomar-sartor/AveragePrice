import "./styles.css";
import { Button, Input, Row, Col, CloseButton } from "reactstrap";

export const LineComponent = ({
  sequencial,
  val,
  handleAddLine,
  handleRemoveLine,
  numberOfLines
}) => {
  return (
    <Row key={sequencial} d={`line-${sequencial}`} className="mt-3">
      <Col md={1}>
      {(numberOfLines >= 1) && (
        <CloseButton data-seq={sequencial} onClick={(e) => handleRemoveLine(e)} />
      )}
      </Col>
      <Col md={5}>
        <Input
          id={`qtd-${sequencial}`}
          name="number"
          value={val}
          placeholder={sequencial}
          type="number"
        />
      </Col>
      <Col md={5}>
        <Input
          id={`prc-${sequencial}`}
          name="number"
          placeholder="R$ 0,00"
          type="number"
        />
      </Col>
      <Col md={1}>
        {(sequencial === numberOfLines) && (
        <Button
          id={`btn-new-${sequencial}`}
          data-seq={sequencial}
          color="success"
          onClick={(e) => handleAddLine(e)}
        >
          Novo
        </Button>
        )} 
      </Col>
    </Row>
  );
};
