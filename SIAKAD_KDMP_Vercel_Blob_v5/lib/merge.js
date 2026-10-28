import { AppError } from './errors.js';
const clone = v => v === undefined ? undefined : structuredClone(v);
export function equal(a, b) {
  if (a === b) return true;
  if (a === undefined || b === undefined || a === null || b === null || typeof a !== typeof b) return false;
  if (Array.isArray(a) || Array.isArray(b)) return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((v, i) => equal(v, b[i]));
  if (typeof a === 'object') { const keys = Object.keys(a).sort(), other = Object.keys(b).sort(); return equal(keys, other) && keys.every(k => equal(a[k], b[k])); }
  return false;
}
const isObject = v => v !== null && typeof v === 'object' && !Array.isArray(v);
function conflict(path) { throw new AppError(409, `Data ${path} telah diubah perangkat lain. Draf Anda dipertahankan; muat versi terbaru sebelum mengulang perubahan.`, 'EDIT_CONFLICT', { path }); }
function keyForArrays(lists) {
  const rows = lists.flat();
  if (!rows.length || rows.some(v => !isObject(v))) return null;
  for (const key of ['id', 'code', 'uid']) {
    if (rows.every(v => typeof v[key] === 'string' && v[key]) && lists.every(arr => new Set(arr.map(v => v[key])).size === arr.length)) return key;
  }
  return null;
}
// Three-way merging is based on the last confirmed server state, never just a timestamp.
export function mergeState(base, wanted, current, path = 'ruang kerja') {
  if (equal(base, wanted)) return clone(current);
  if (equal(base, current) || equal(wanted, current)) return clone(wanted);
  if (isObject(base) && isObject(wanted) && isObject(current)) {
    const result = {};
    for (const key of new Set([...Object.keys(base), ...Object.keys(wanted), ...Object.keys(current)])) {
      if (['__proto__', 'constructor', 'prototype'].includes(key)) throw new AppError(400, 'Properti data tidak valid.');
      const value = mergeState(base[key], wanted[key], current[key], `${path}.${key}`);
      if (value !== undefined) result[key] = value;
    }
    return result;
  }
  if (Array.isArray(base) && Array.isArray(wanted) && Array.isArray(current)) {
    // All lines sharing a document number are one accounting transaction.
    if (path.endsWith('.journals')) {
      const group = arr => Object.fromEntries([...new Set(arr.map(v => v.docNo))].map(k => [k, arr.filter(v => v.docNo === k)]));
      const b = group(base), w = group(wanted), c = group(current), out = [];
      for (const key of new Set([...Object.keys(c), ...Object.keys(w), ...Object.keys(b)])) {
        if (!equal(b[key], w[key]) && !equal(b[key], c[key]) && !equal(w[key], c[key])) conflict(`jurnal ${key}`);
        out.push(...(equal(b[key], w[key]) ? c[key] || [] : w[key] || []));
      }
      return clone(out);
    }
    const key = keyForArrays([base, wanted, current]);
    if (key) {
      const map = arr => Object.fromEntries(arr.map(row => [row[key], row]));
      const merged = mergeState(map(base), map(wanted), map(current), path);
      return [...new Set([...current.map(v => v[key]), ...wanted.map(v => v[key])])].filter(id => merged[id] !== undefined).map(id => merged[id]);
    }
    if (path.endsWith('.customYears')) {
      const keep = new Set(current.filter(v => !base.includes(v) || wanted.includes(v)));
      for (const v of wanted) if (!base.includes(v)) keep.add(v);
      return [...keep].sort();
    }
  }
  return conflict(path);
}
