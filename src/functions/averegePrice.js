
export const averagePrice = (fields, saldoQuantidade) => {

    const somaPrecoMedio = fields.reduce((acc, val) => {

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

    let PM = somaPrecoMedio / saldoQuantidade;
    if (Object.is(PM, Number.NaN)) PM = 0;
    
    let newPriceMiddle = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(PM);

    return newPriceMiddle;
};
