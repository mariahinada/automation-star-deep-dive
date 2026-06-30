const { spawn } = require('child_process');
const http = require('http');

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.API_BASE_URL || `http://localhost:${PORT}`;

function waitForServer(retries = 30) {
  return new Promise((resolve, reject) => {
    const attempt = (remaining) => {
      http
        .get(`${BASE_URL}/api/health`, (res) => {
          if (res.statusCode === 200) {
            resolve();
            return;
          }

          if (remaining > 0) {
            setTimeout(() => attempt(remaining - 1), 250);
            return;
          }

          reject(new Error('Server health check failed'));
        })
        .on('error', () => {
          if (remaining > 0) {
            setTimeout(() => attempt(remaining - 1), 250);
            return;
          }

          reject(new Error('Server did not start in time'));
        });
    };

    attempt(retries);
  });
}

function runMocha() {
  return new Promise((resolve) => {
    const mocha = spawn(
      'npx',
      [
        'mocha',
        'test/pathCoverage/**/*.test.js',
        '--reporter',
        'mochawesome',
        '--reporter-options',
        'reportDir=mochawesome-report,reportFilename=path-coverage-report',
        '--timeout',
        '10000',
      ],
      { stdio: 'inherit', shell: true, env: process.env }
    );

    mocha.on('close', (code) => resolve(code ?? 1));
  });
}

async function main() {
  const server = spawn('node', ['src/server.js'], {
    stdio: 'inherit',
    env: process.env,
  });

  let exitCode = 1;

  try {
    await waitForServer();
    exitCode = await runMocha();
  } catch (error) {
    console.error(error.message);
    exitCode = 1;
  } finally {
    server.kill();
  }

  process.exit(exitCode);
}

main();
