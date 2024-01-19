import { white } from "../App";

export function ck_null(a, b) {
  return a ? a : b;
}

export function get_satuation(code) {
  if (!code.includes(".")) return white;
  return ck_null(code.split(".")[0], "white");
}

export function get_brightness(code) {
  if (!code.includes(".")) return white;
  return ck_null(parseInt(code.split(".")[1]), 50);
}

export function input_data(_state, _key, _value) {
  return { ..._state, _key: _value };
}
