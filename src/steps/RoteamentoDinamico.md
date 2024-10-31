>> Roteamento dinâmico
-- index.ts
const routesDir = path.join(__dirname, "routes");

fs.readdirSync(routesDir).forEach((file) => {
  handleDynamicRoute(routesDir, file, path, app);
});