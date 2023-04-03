import { cp } from "node:fs/promises";

export const copyFiles = async (src, dest) => {
  const res = await cp(src, dest, { recursive: true });
  return res;
};
