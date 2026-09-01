#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const pidFile = path.resolve(projectRoot, '.preview.pid');

const command = process.argv[2];

function getPid() {
  try {
    return fs.readFileSync(pidFile, 'utf-8').trim();
  } catch {
    return null;
  }
}

function setPid(pid) {
  fs.writeFileSync(pidFile, pid.toString());
}

function deletePid() {
  try {
    fs.unlinkSync(pidFile);
  } catch {}
}

if (command === 'restart') {
  const pid = getPid();
  if (pid) {
    try {
      process.kill(pid);
      console.log(`[preview] Stopped process ${pid}`);
    } catch {
      console.log(`[preview] Process ${pid} already stopped`);
    }
  }
  deletePid();
  
  const child = spawn('npm', ['run', 'preview'], {
    cwd: projectRoot,
    detached: true,
    stdio: 'ignore'
  });
  setPid(child.pid);
  child.unref();
  console.log(`[preview] Preview server restarted (PID: ${child.pid})`);
} else if (command === 'stop') {
  const pid = getPid();
  if (pid) {
    try {
      process.kill(pid);
      deletePid();
      console.log(`[preview] Stopped process ${pid}`);
    } catch (error) {
      console.log(`[preview] Could not stop process: ${error.message}`);
    }
  } else {
    console.log('[preview] No preview process running');
  }
} else {
  console.error('Usage: preview.mjs [restart|stop]');
  process.exit(1);
}
