export interface IBoxWord {
  word: string;
  status?: "correct" | "incorrect" | "no-found" | "without-word";
  color?: string;
  type?: string;
}