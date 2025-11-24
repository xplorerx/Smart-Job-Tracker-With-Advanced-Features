import crypto from "crypto";
export function generateAliasLocal(email: string) {
  const base = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
  const suffix = crypto.randomBytes(3).toString("hex");
  return `${base}-${suffix}`.toLowerCase();
}
export function aliasAddress(aliasLocal: string, domain: string) {
  return `${aliasLocal}+apply@${domain}`;
}
