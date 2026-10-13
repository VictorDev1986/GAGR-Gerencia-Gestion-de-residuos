import { spawn } from "node:child_process";
import readline from "node:readline";

const serverPath = "C:\\MCPServers\\PowerBIModelingMCP\\extension\\server\\powerbi-modeling-mcp.exe";
const child = spawn(serverPath, ["--start", "--readonly"], { stdio: ["pipe", "pipe", "ignore"], windowsHide: true });
const pending = new Map();
let nextId = 1;
const send = (message) => child.stdin.write(`${JSON.stringify(message)}\n`);
const request = (method, params = {}) => new Promise((resolve, reject) => {
  const id = nextId++;
  pending.set(id, { resolve, reject });
  send({ jsonrpc: "2.0", id, method, params });
});
readline.createInterface({ input: child.stdout }).on("line", (line) => {
  try {
    const message = JSON.parse(line);
    if (message.id !== undefined && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result);
    }
  } catch {}
});
const call = (name, body) => request("tools/call", { name, arguments: { request: body } });
const unwrap = (result) => JSON.parse(result.content.find((item) => item.type === "text").text);

await request("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "codex-powerbi-ird", version: "1.0.0" } });
send({ jsonrpc: "2.0", method: "notifications/initialized" });
const instances = unwrap(await call("connection_operations", { operation: "ListLocalInstances" })).data;
const ird = instances.find((item) => /^IRD$/i.test(item.parentWindowTitle ?? ""));
if (!ird) throw new Error("No se encontró una instancia abierta de Power BI Desktop titulada IRD.");
const connected = unwrap(await call("connection_operations", { operation: "Connect", dataSource: `localhost:${ird.port}` }));
const connectionName = connected.data;
await call("connection_operations", { operation: "SetLastUsed", connectionName });
console.log(JSON.stringify({ ready: true, connectionName, port: ird.port, processId: ird.processId }));

const input = readline.createInterface({ input: process.stdin });
input.on("line", async (line) => {
  if (!line.trim()) return;
  try {
    const command = JSON.parse(line);
    const result = await call(command.tool, command.request);
    console.log(JSON.stringify({ ok: true, result: unwrap(result) }));
  } catch (error) {
    console.log(JSON.stringify({ ok: false, error: String(error) }));
  }
});
process.on("SIGINT", () => { child.kill(); process.exit(0); });
