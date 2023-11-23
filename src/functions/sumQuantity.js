export const sumQuantity = (fields) => {
  const somaQuantidade = fields.reduce((acc, val) => {
    let qtd = 0;
    
    if(val.operacao === "1"){
      // Se for compra considera a quantidade

      if (val.quantidade !== "") {
        qtd = parseInt(val.quantidade ?? 0);
      }
    }

    return (acc += qtd);
  }, 0);

  return somaQuantidade;
};