
export const averagePrice = (fields, saldoQuantidade) => {

  // console.log("Operacao", JSON.stringify(fields));

    const somaPrecoMedio = fields.reduce((acc, val) => {

      let preco = 0;
      let qtd = 0;

      // console.log("somaPrecoMedio", val.operacao, typeof val.operacao);

      if(val.operacao === "1"){ // Se for compra faz a conta
        if (val.preco !== "") {
          preco = val.preco.replace(/[^0-9]/g, "") / 100;
        }

        if (val.quantidade !== "") {
          qtd = parseInt(val.quantidade);
        }
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
