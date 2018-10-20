const args = ['install'];

const appOpts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, appOpts);

const parserOpts = { stdio: 'inherit', cwd: 'linkedInParser', shell: true };
require('child_process').spawn('npm', args, parserOpts);

const serverOpts = { stdio: 'inherit', cwd: 'server', shell: true };
require('child_process').spawn('npm', args, serverOpts);