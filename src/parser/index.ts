import { parseLines } from "./parse-lines";

export const parse = ({ file, type }: { file: string; type: "TSP" }) => {
  const arrayOfLines = file.match(/[^\r\n]+/g);

  const parsed = parseLines(arrayOfLines);
  if (!parsed.type.startsWith(type)) {
    throw Error("Tipo de arquivo não suportado");
  }

  return parsed;
};
export * from "./types";
