const https = require("https");
const fs = require("fs");
const path = require("path");
const next = require("next");

const app = next({ dev: true });
const handle = app.getRequestHandler();

// 프로젝트 루트 기준 절대경로 직접 지정
const projectRoot = __dirname; // 여기가 문제를 해결하는 핵심
const certDir = path.join(projectRoot, "cert");
const certPath = path.join(certDir, "localhost.pem");
const keyPath = path.join(certDir, "localhost-key.pem");

app.prepare().then(() => {
  https
    .createServer(
      {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      },
      (req, res) => handle(req, res)
    )
    .listen(3000, "0.0.0.0", () => {
      console.log("✅ HTTPS Next.js dev server running");
      console.log("👉 https://localhost:3000");
    });
});
