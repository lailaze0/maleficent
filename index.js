console.log('🕒 Starting Meleficent . . .');
import path, {
   dirname
} from 'path'
import {
   spawn
} from 'child_process'
import {
   fileURLToPath
} from 'url'
import { 
   __on
} from 'maleficent-bot/lib/__on.js'; 
process.on('uncaughtException', console.log);
const __dirname = dirname(fileURLToPath(import.meta.url));
const start = () => {
   let args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)]
   let p = spawn(process.argv[0], args, {
      stdio: ['inherit', 'inherit', 'inherit', 'ipc']
   })
   .on('message', data => {
      if (data == 'reset') {
         console.log('🕒 Restarting Meleficent . . .')
         p.kill();
      }
      if (data == 'uptime') {
         p.send(process.uptime())
      }
   })
   .on('exit', code => {
      console.error('Exited with code:', code)
      p.kill(); __on(); start();                  
   })
};
__on(); start();
