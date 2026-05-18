const target = process.argv[2] || "http://localhost:8080/api/products/";
const count = Number(process.argv[3] || 100);

const run = async () => {
  const start = Date.now();
  let ok = 0;
  for (let i = 0; i < count; i++) {
    const r = await fetch(target);
    if (r.ok) ok++;
  }
  const elapsed = (Date.now() - start) / 1000;
  console.log(JSON.stringify({ target, requests: count, success: ok, rps: count / elapsed }, null, 2));
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
