export class AppError extends Error {
  constructor(status, message, code = 'REQUEST_FAILED', details) {
    super(message); this.status = status; this.code = code; this.details = details;
  }
}
export function requireValue(condition, message, status = 400, code = 'INVALID_INPUT') {
  if (!condition) throw new AppError(status, message, code);
}
