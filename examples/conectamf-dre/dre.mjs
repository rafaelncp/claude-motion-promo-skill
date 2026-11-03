// Valores fictícios, em reais, para um exemplo gerencial de DRE.
// Receita líquida já é líquida de deduções sobre a receita bruta.
export const inputs = Object.freeze({
  receitaLiquida: 1000000,
  cpv: 400000,
  despesasOperacionaisSemDA: 250000,
  depreciacaoAmortizacao: 50000,
  receitasFinanceiras: 20000,
  despesasFinanceiras: 70000,
  irCsll: 85000,
});
export const result = Object.freeze({
  lucroBruto: inputs.receitaLiquida - inputs.cpv,
  ebitda: inputs.receitaLiquida - inputs.cpv - inputs.despesasOperacionaisSemDA,
  ebit: inputs.receitaLiquida - inputs.cpv - inputs.despesasOperacionaisSemDA - inputs.depreciacaoAmortizacao,
  resultadoFinanceiro: inputs.receitasFinanceiras - inputs.despesasFinanceiras,
  lucroAntesIR: inputs.receitaLiquida - inputs.cpv - inputs.despesasOperacionaisSemDA - inputs.depreciacaoAmortizacao + inputs.receitasFinanceiras - inputs.despesasFinanceiras,
  lucroLiquido: inputs.receitaLiquida - inputs.cpv - inputs.despesasOperacionaisSemDA - inputs.depreciacaoAmortizacao + inputs.receitasFinanceiras - inputs.despesasFinanceiras - inputs.irCsll,
});
export const brl = value => 'R$ ' + Math.abs(value).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
