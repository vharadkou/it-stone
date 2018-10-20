const clientArgs = ['run start -- --port 4200'];
const clientOpts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', clientArgs, clientOpts);

const serverArgs = ['run start'];
const serverOpts = { stdio: 'inherit', cwd: 'server', shell: true };
require('child_process').spawn('npm', serverArgs, serverOpts);