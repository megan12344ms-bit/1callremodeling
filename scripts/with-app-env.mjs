#!/usr/bin/env node
import { execSync } from 'child_process';

// Execute the command passed as arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: with-app-env.mjs <command> [args...]');
  process.exit(1);
}

try {
  execSync(args.join(' '), { 
    stdio: 'inherit',
    shell: true 
  });
} catch (error) {
  process.exit(error.status || 1);
}
