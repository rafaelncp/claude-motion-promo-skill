// ConectaMF | DRE de 15 segundos, números exclusivamente fictícios.
// Projeto 9:16: preparado por prepare.mjs sobre motion-promo/template.
import {
  THREE, P, FACE, createStage, groundDisc, card, pop, ev,
  cameraRig, captions, run, canvasTex, rrect, font,
} from './lib.js';
import { inputs, result, brl } from './dre.mjs';

const DUR = 15;
const BPM = 96;
const [W, H] = [1080, 1920];
const stage = createStage({ W, H });
const { scene, camera } = stage;
const C = {
  dark: 0x194B75, blue: 0x3E799A, green: 0x14866D,
  red: 0xCB593C, gold: 0xE2B552, ground: 0xDEE5EC,
};

groundDisc(scene, { t0: 0.08 });

// O disco e os pedestais reforçam a estética de diorama tridimensional.
// A câmera permanece em movimento suave durante toda a explicação.
const base = new THREE.Mesh(
  new THREE.CylinderGeometry(3.6, 4.1, 0.34, 56),
  new THREE.MeshToonMaterial({ color: C.blue }),
);
base.position.copy(P(0, -0.8, 0.3));
base.castShadow = true;
base.receiveShadow = true;
scene.add(base);
pop(base, 0.12, { dur: 0.55, pitch: 1 });

const steps = [
  { at: 0.25, title: 'RECEITA LÍQUIDA', amount: inputs.receitaLiquida, text: 'Após deduções sobre vendas', color: C.blue, good: true },
  { at: 1.65, title: '(-) CPV / COGS', amount: -inputs.cpv, text: 'Custos dos produtos vendidos', color: C.red },
  { at: 3.00, title: '(=) LUCRO BRUTO', amount: result.lucroBruto, text: 'Receita líquida menos CPV', color: C.green, good: true },
  { at: 4.35, title: '(-) DESP. OPERACIONAIS', amount: -inputs.despesasOperacionaisSemDA, text: 'Sem depreciação e amortização', color: C.red },
  { at: 5.75, title: '(=) EBITDA', amount: result.ebitda, text: 'Resultado operacional gerencial', color: C.blue, good: true },
  { at: 7.10, title: '(-) DEPRECIAÇÃO / AMORT.', amount: -inputs.depreciacaoAmortizacao, text: 'Desgaste e amortização contábil', color: C.red },
  { at: 8.45, title: '(=) EBIT', amount: result.ebit, text: 'Resultado operacional após D&A', color: C.blue, good: true },
  { at: 9.80, title: '(+/-) RESULT. FINANCEIRO', amount: result.resultadoFinanceiro, text: '+20 mil receita / -70 mil despesa', color: C.red },
  { at: 11.15, title: '(-) IR + CSLL', amount: -inputs.irCsll, text: 'Tributos sobre o lucro', color: C.red },
  { at: 12.60, title: '(=) LUCRO LÍQUIDO', amount: result.lucroLiquido, text: 'Quanto sobrou no exemplo', color: C.gold, good: true },
];

for (let i = 0; i < steps.length; i++) {
  const entry = steps[i];
  const nextAt = i + 1 < steps.length ? steps[i + 1].at : DUR + 1;
  const colorHex = '#' + entry.color.toString(16).padStart(6, '0');
  const display = (entry.amount < 0 ? '- ' : '') + brl(entry.amount);

  const texture = canvasTex(1000, 500, (g, w, h) => {
    rrect(g, 8, 8, w - 16, h - 16, 46, '#FFFFFF', '#E2E8F0', 8);
    rrect(g, 22, 22, w - 44, 105, 24, colorHex);
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = '#FFFFFF';
    g.font = font(800, entry.title.length > 20 ? 46 : 58);
    g.fillText(entry.title, w / 2, 74);
    g.fillStyle = entry.good ? '#115E59' : '#B44331';
    g.font = font(900, 96);
    g.fillText(display, w / 2, 246);
    g.fillStyle = '#475569';
    g.font = font(500, 42);
    g.fillText(entry.text, w / 2, 375);
  });

  const panel = card(texture, 6.5, 3.25, { slab: entry.color, depth: 0.22 });
  panel.rotation.y = FACE;
  panel.position.copy(P(0, -0.4, 2.6));
  scene.add(panel);
  pop(panel, entry.at, {
    dur: 0.45,
    out: nextAt - 0.08,
    outDur: 0.23,
    pitch: i % 7,
  });
  ev(entry.at + 0.12, entry.good ? 'chime' : 'coin');

  // Barras 3D ilustrativas da dimensão do valor, uma por etapa.
  const height = Math.max(0.28, Math.min(2.9, Math.abs(entry.amount) / 360000));
  const bar = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, height, 0.72),
    new THREE.MeshToonMaterial({ color: entry.color }),
  );
  bar.position.copy(P(-3.5, 0.9, height / 2 + 0.6));
  bar.castShadow = true;
  scene.add(bar);
  pop(bar, entry.at + 0.11, { out: nextAt - 0.08, outDur: 0.2 });
}

const shots = cameraRig(camera, [
  { s: 0, tgt: [0, -0.7, 2.3], h: [8.2, 7.7], az: [8, 26], el: [37, 33] },
  { s: 4.2, tgt: [0, -0.5, 2.3], h: [7.7, 7.1], az: [26, 43], el: [33, 31] },
  { s: 8.4, tgt: [0, -0.5, 2.3], h: [7.1, 7.8], az: [43, 55], el: [31, 36] },
  { s: 12.6, tgt: [0, -0.5, 2.3], h: [7.8, 7.2], az: [55, 66], el: [36, 34] },
], { W, H, dur: DUR });

const cap = captions([
  { s: 0.15, e: 3.95, n: 1, t1: 'Receita e custos', t2: 'Da venda ao lucro bruto' },
  { s: 4.15, e: 8.95, n: 2, t1: 'Despesas e EBIT', t2: 'EBITDA menos depreciação' },
  { s: 9.15, e: 12.3, n: 3, t1: 'Financeiro e IR', t2: 'Receitas, despesas, IR e CSLL' },
  { s: 12.55, e: 14.9, n: 4, t1: 'Lucro líquido', t2: 'Resultado final ilustrativo' },
]);

run(stage, DUR, t => { shots(t); cap(t); }, { bpm: BPM });
