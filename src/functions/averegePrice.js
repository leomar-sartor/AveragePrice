
export const averagePrice = (fields, saldoQuantidade) => {

  var saldoCotas = 0;
  var precoMedio = 0;
  var totalInvestido = 0;

  fields.forEach(function(field, indice, array){
    //console.log("============================ ARRAY ", array);
    //console.log("============================ START FIELD " +  indice + " => ", field);

    let primeiraEntrada = indice === 0;
    let quantidadeOperacao = 0;
    let precoOperacao = 0;
    let taxasOperacao = 0;
    let totalOperacao = 0;

    if (field.apuracao !== "") 
       field.apuracao = parseInt(field.apuracao);

    if (field.quantidade !== "") 
      quantidadeOperacao = parseInt(field.quantidade);

    if (field.preco !== ""){
      precoOperacao = field.preco.replace(/[^0-9]/g, "") / 100;
    }

    if (field.taxas !== ""){
      taxasOperacao = field.taxas.replace(/[^0-9]/g, "") / 100;
    }
      
    if(field.operacao === "1"){
      totalOperacao = (precoOperacao * quantidadeOperacao) + taxasOperacao;

      saldoCotas += quantidadeOperacao;

      if(primeiraEntrada){
        totalInvestido = totalOperacao;
        precoMedio = totalInvestido/saldoCotas;
      }else{
        totalInvestido = (totalInvestido + totalOperacao);
        precoMedio = totalInvestido/saldoCotas;
      }
    }

    if(field.operacao === "2" && !primeiraEntrada){
      totalOperacao = (precoOperacao * quantidadeOperacao) - taxasOperacao;
      saldoCotas -= quantidadeOperacao;
      totalInvestido = saldoCotas * precoMedio;
      let lucro = precoOperacao > precoMedio;

      if(lucro){
        field.apuracao = (totalOperacao / quantidadeOperacao - precoMedio) * quantidadeOperacao;
      }
      else{
        field.apuracao = (totalOperacao / quantidadeOperacao - precoMedio) * quantidadeOperacao;
      }
    }

    //console.log("============================ END FLD => " +  indice, field);
  });

  if (Object.is(precoMedio, Number.NaN)){
    precoMedio = 0;
  } 
    
  let newPriceMiddle = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(precoMedio);

  return newPriceMiddle;
};