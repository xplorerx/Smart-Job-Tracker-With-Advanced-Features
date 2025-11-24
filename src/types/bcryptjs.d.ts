mkdir -p src/types
cat > src/types/bcryptjs.d.ts <<'TS'
declare module "bcryptjs";
TS
