import { spawn } from "node:child_process";
import readline from "node:readline";

const serverPath = "C:\\MCPServers\\PowerBIModelingMCP\\extension\\server\\powerbi-modeling-mcp.exe";
const child = spawn(serverPath, ["--start", "--readonly"], { stdio: ["pipe", "pipe", "pipe"], windowsHide: true });
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
child.stderr.on("data", (chunk) => process.stderr.write(chunk));

const call = (name, requestBody) => request("tools/call", { name, arguments: { request: requestBody } });
const unwrap = (result) => JSON.parse(result.content.find((item) => item.type === "text").text);

try {
  await request("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "codex-powerbi-identify", version: "1.0.0" } });
  send({ jsonrpc: "2.0", method: "notifications/initialized" });
  const tools = await request("tools/list");
  const wanted = tools.tools.filter((tool) => ["connection_operations", "database_operations", "model_operations"].includes(tool.name));
  const instances = unwrap(await call("connection_operations", { operation: "ListLocalInstances" })).data;
  const results = [];
  for (const instance of instances) {
    try {
      process.stderr.write(`Connecting ${instance.connectionString}\n`);
      const connected = unwrap(await call("connection_operations", { operation: "Connect", dataSource: `localhost:${instance.port}` }));
      process.stderr.write(`Connected ${JSON.stringify(connected)}\n`);
      const connectionName = connected.connectionName ?? connected.data?.connectionName ?? connected.data?.name;
      const connections = unwrap(await call("connection_operations", { operation: "ListConnections" }));
      results.push({ instance, connected, connections });
    } catch (error) {
      results.push({ instance, error: String(error) });
    }
  }
  console.log(JSON.stringify({ schemas: wanted, results }, null, 2));
} finally {
  child.kill();
}
