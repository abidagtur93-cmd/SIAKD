import template from './template.json' with { type: 'json' };
import { AppError, requireValue } from './errors.js';
export const freshState = () => structuredClone(template);
import { equal, mergeState } from './merge.js';
export { equal, mergeState } from './merge.js';
const clone = value => value === undefined ? undefined : structuredClone(value);
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const allowed = ['identity', 'coa', 'items', 'members', 'employees', 'suppliers', 'journals', 'customYears'];
export function sanitizeState(input) {
  requireValue(isObject(input), 'Ruang kerja tidak valid.');
  const output = {};
  for (const key of allowed) output[key] = clone(input[key] ?? template[key]);
  requireValue(isObject(output.identity), 'Identitas koperasi tidak valid.');
  for (const key of allowed.slice(1)) requireValue(Array.isArray(output[key]), `Data ${key} harus berupa daftar.`);
  const seen = new WeakSet(); let count = 0;
  const inspect = (v, depth = 0) => {
    requireValue(depth <= 16 && ++count < 250000, 'Data terlalu kompleks.');
    if (typeof v === 'string') requireValue(v.length <= 20000, 'Teks data terlalu panjang.');
    if (typeof v === 'number') requireValue(Number.isFinite(v), 'Nilai angka tidak valid.');
    if (v && typeof v === 'object') {
      requireValue(!seen.has(v), 'Data berulang tidak valid.'); seen.add(v);
      for (const [k, val] of Object.entries(v)) {
        requireValue(!['__proto__', 'constructor', 'prototype'].includes(k), 'Properti data tidak valid.'); inspect(val, depth + 1);
      }
    }
  };
  inspect(output);
  for (const [key, id] of [['coa','code'], ['items','code'], ['members','code'], ['employees','id'], ['suppliers','code'], ['journals','id']]) {
    const list = output[key];
    requireValue(list.length < 20000, `Daftar ${key} terlalu besar untuk versi Blob ini.`);
    // Suppliers can contain several deliveries by the same supplier. They have a separate id when applicable.
    if (key === 'suppliers') continue;
    requireValue(list.every(row => isObject(row) && typeof row[id] === 'string' && row[id].length > 0), `Identitas baris ${key} tidak valid.`);
    requireValue(new Set(list.map(v => v[id])).size === list.length, `Identitas baris ${key} tidak boleh ganda.`);
  }
  for (const row of output.employees) for (const key of ['password','pwdHash','pHash','pEnc','passwordHash','newPassword','hasPassword']) delete row[key];
  return output;
}
export function validateLedger(state) {
  const groups = new Map();
  for (const row of state.journals) {
    requireValue(typeof row.docNo === 'string' && row.docNo.trim() && row.docNo.length <= 200, 'Nomor bukti jurnal wajib diisi.');
    requireValue(/^\d{4}-\d{2}-\d{2}$/.test(row.date || ''), 'Tanggal jurnal tidak valid.');
    requireValue(typeof row.debit === 'number' && typeof row.kredit === 'number' && Number.isFinite(row.debit) && Number.isFinite(row.kredit) && row.debit >= 0 && row.kredit >= 0 && !(row.debit > 0 && row.kredit > 0), 'Nilai debit/kredit tidak valid.');
    requireValue(state.coa.some(a => a.full === row.account), `Akun jurnal ${row.account} tidak ditemukan di COA.`);
    groups.set(row.docNo, (groups.get(row.docNo) || 0) + row.debit - row.kredit);
  }
  for (const [no, balance] of groups) requireValue(Math.abs(balance) < 0.01, `Jurnal ${no} tidak seimbang: debit dan kredit harus sama.`);
}
export function workspaceDocument(state = freshState()) {
  return { schema: 5, revision: 0, state, employeeAuth: {}, recentMutations: {} };
}
export function publicWorkspace(doc) {
  const state = sanitizeState(doc.state);
  for (const employee of state.employees) {
    delete employee.newPassword;
    employee.hasPassword = Boolean(doc.employeeAuth?.[employee.id]);
  }
  return state;
}
