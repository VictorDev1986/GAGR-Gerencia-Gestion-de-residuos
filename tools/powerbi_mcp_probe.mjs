import { spawn } from "node:child_process";
import readline from "node:readline";

const serverPath = "C:\\MCPServers\\PowerBIModelingMCP\\extension\\server\\powerbi-modeling-mcp.exe";
const child = spawn(serverPath, ["--start", "--readonly"], {
  stdio: ["pipe", "pipe", "pipe"],
  windowsHide: true,
});

const pending = new Map();
let nextId = 1;

function send(message) {
  child.stdin.write(`${JSON.stringify(message)}\n`);
}

function request(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    send({ jsonrpc: "2.0", id, method, params });
  });
}

const stdout = readline.createInterface({ input: child.stdout });
stdout.on("line", (line) => {
  let message;
  try {
    message = JSON.parse(line);
  } catch {
    process.stderr.write(`Non-JSON stdout: ${line}\n`);
    return;
  }
  if (message.id !== undefined && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  }
});

child.stderr.on("data", (chunk) => process.stderr.write(chunk));

const timeout = setTimeout(() => {
  process.stderr.write("Timed out waiting for the MCP server.\n");
  child.kill();
  process.exitCode = 1;
}, 30_000);

try {
  const initialized = await request("initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "codex-powerbi-probe", version: "1.0.0" },
  });
  send({ jsonrpc: "2.0", method: "notifications/initialized" });
  const tools = await request("tools/list");
  const connectionTool = tools.tools.find((tool) => tool.name === "connection_operations");
  const localInstances = await request("tools/call", {
    name: "connection_operations",
    arguments: { request: { operation: "ListLocalInstances" } },
  });
  console.log(JSON.stringify({
    initialized,
    toolNames: tools.tools.map((tool) => tool.name),
    connectionTool,
    localInstances,
  }, null, 2));
} catch (error) {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exitCode = 1;
} finally {
  clearTimeout(timeout);
  child.kill();
}
