import { atom } from "jotai";

export const generationState = atom<"generate" | "pause" | "disabled">(
  "disabled"
);

export const gridState = atom("");
export const inputValueState = atom<string | null>(null);
export const codeState = atom({
  value: "",
  firstChar: "",
  secondChar: "",
  seconds: 0,
  firstVal: 0,
  lastVal: 0,
  grid: "",
});
