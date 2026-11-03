import test from 'node:test';
import assert from 'node:assert/strict';
import { inputs, result } from './dre.mjs';

test('ponte da receita líquida ao lucro líquido fecha', () => {
  assert.equal(result.lucroBruto, 600000);
  assert.equal(result.ebitda, 350000);
  assert.equal(result.ebit, 300000);
  assert.equal(result.resultadoFinanceiro, -50000);
  assert.equal(result.lucroAntesIR, 250000);
  assert.equal(result.lucroLiquido, 165000);
  assert.equal(result.lucroLiquido, result.lucroAntesIR - inputs.irCsll);
});

test('não subtrair tributos sobre vendas de receita já líquida', () => {
  assert.equal(result.lucroBruto, inputs.receitaLiquida - inputs.cpv);
  assert.equal(result.ebitda, result.lucroBruto - inputs.despesasOperacionaisSemDA);
  assert.equal(result.ebit, result.ebitda - inputs.depreciacaoAmortizacao);
});
