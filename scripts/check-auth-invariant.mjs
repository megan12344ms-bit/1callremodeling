#!/usr/bin/env node
/**
 * Checks that auth configuration matches app expectations.
 * Validates Better Auth secrets and OAuth provider configuration.
 */

const requiredEnvVars = [
  'BETTER_AUTH_SECRET',
  'BETTER_AUTH_URL'
];

const optionalEnvVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET'
];

console.log('[check-auth] Validating auth configuration...\n');

let hasErrors = false;

console.log('Required environment variables:');
for (const envVar of requiredEnvVars) {
  const value = process.env[envVar];
  if (value) {
    console.log(`  ✓ ${envVar}`);
  } else {
    console.log(`  ✗ ${envVar} (missing)`);
    hasErrors = true;
  }
}

console.log('\nOptional OAuth providers:');
const providers = [
  { id: 'GOOGLE_CLIENT_ID', secret: 'GOOGLE_CLIENT_SECRET', name: 'Google' },
  { id: 'GITHUB_CLIENT_ID', secret: 'GITHUB_CLIENT_SECRET', name: 'GitHub' }
];

for (const provider of providers) {
  const hasId = !!process.env[provider.id];
  const hasSecret = !!process.env[provider.secret];
  
  if (hasId && hasSecret) {
    console.log(`  ✓ ${provider.name} OAuth configured`);
  } else if (hasId || hasSecret) {
    console.log(`  ⚠ ${provider.name} partially configured (both ID and SECRET required)`);
  } else {
    console.log(`  - ${provider.name} OAuth not configured`);
  }
}

if (hasErrors) {
  console.error('\n✗ Auth configuration incomplete. Set missing environment variables.');
  process.exit(1);
} else {
  console.log('\n✓ Auth configuration valid');
  process.exit(0);
}
