let http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 8080;
global.myLet = 'mossa';
http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.readFile('data.json', 'utf8', (error, data) => {
        if (error) {
            res.statusCode = 500;
            res.end = "server error!";
            return;
        }
        const parse = JSON.parse(data);
        res.end(`
            <!DOCTYPE html>
            <html lang="fa">
            <head>
                <meta charset="UTF-8">
                <title>practice node.js</title>
            </head>
            <body>
            <div style="text-align:center;">
            <h1>Hi im ${global.myLet} and i started wrote node.js!!!</h1>
            <p>this is a json file ${parse.fullName.firstName}</p>
            </div>
            </body>
            </html>
            `);
    })

}).listen(PORT, () => console.log(`server is runing on port ${PORT}.`));

//CLI nod.js mean commend line interface
// # Run a JavaScript file
// node app.js
// # Run with additional arguments
// node app.js arg1 arg2
// # Run in watch mode (restarts on file changes)
// node --watch app.js

// REPL in node.js mean read-eval-print-loop
// start with node
// const name = 'Node.js';
// > console.log(`Hello, ${name}!`);
// > .help // Show available commands
// > .exit // Exit REPL

// args.js:
// console.log('All arguments:', process.argv);
// console.log('First argument:', process.argv[2]);
// console.log('Second argument:', process.argv[3]);
// Example usage:
// node args.js hello world
// Output:
// All arguments: ['/path/to/node', '/path/to/args.js', 'hello', 'world']
// First argument: hello
// Second argument: world

// Environment Variables:
// env.js
// console.log('Environment:', process.env.NODE_ENV || 'not exist'); //development or production or test
// console.log('Custom variable:', process.env.MY_VARIABLE || 'not exist');
// console.log('Database URL:', process.env.DATABASE_URL || 'Not set');
// Example usage with environment variables:
// NODE_ENV=production MY_VARIABLE=test node env.js

// Basic Debugging Commands:
// # Start with inspector (listens on default port 9229)
// node --inspect app.js
// # Break on first line of application
// node --inspect-brk app.js
// # Specify a custom port
// node --inspect=9222 app.js
// # Enable remote debugging (be careful with this in production)
// node --inspect=0.0.0.0:9229 app.js
// Using Chrome DevTools for Debugging:
// Start your application with node --inspect app.js
// Open Chrome and navigate to chrome://inspect
// Click on "Open dedicated DevTools for Node"
// Set breakpoints and debug your application

// Node Version Manager (nvm):
// # Install and use different Node.js versions
// nvm install 18.16.0 # Install specific version
// nvm use 18.16.0 # Switch to version
// nvm ls # List installed versions
// nvm alias default 18.17.1 #set default version

// npm (Node Package Manager):
// # Common npm commands
// npm init # Initialize a new project
// npm install # Install dependencies
// npm update # Update packages
// npm audit # Check for vulnerabilities
// npm audit fix # fixing vulnerabilities

// Common Command Line Flags:
// # Show Node.js version
// node --version # or -v
// # Show V8 version
// node --v8-options
// # Show command-line help
// node --help

// Runtime Behavior:
// # Check syntax without executing
// node --check app.js
// find src -name "*.js" -exec node --check {} \; #تمام فایل های جی اس را چک می کند. این دستور بیشتر بدانید است
// # Show stack traces for warnings
// node --trace-warnings app.js
// # Set max memory (in MB)
// node --max-old-space-size=4096 app.js
// # Preload a module before execution
// node --require dotenv/config app.js
// # Enable ES module loader
// node --experimental-modules app.mjs
// # Enable experimental features
// node --experimental-repl-await
// # Enable experimental worker threads
// node --experimental-worker

// Show the V8 engine version used by your Node.js installation
// console.log(`V8 version: ${process.versions.v8}`);

// Get information about V8's heap memory usage
// const v8 = require('v8');
// const heapStats = v8.getHeapStatistics();
// console.log('Heap size limit:', (heapStats.heap_size_limit / 1024 / 1024).toFixed(2), 'MB');
// console.log('Total heap size:', (heapStats.total_heap_size / 1024 / 1024).toFixed(2), 'MB');
// console.log('Used heap size:', (heapStats.used_heap_size / 1024 / 1024).toFixed(2), 'MB');

// the priority order: sync code > nextTick > Promises > Timers > I/O callbacks > setImmediate > Check phase.
// process.nextTick(() => console.log('2. Next tick'));
// Promise.resolve().then(() => console.log('3. Promise'));
// setImmediate(() => console.log('5. Immediate'));

// node promises:
// Instance Methods:
// then(onFulfilled, onRejected) # Handles fulfillment or rejection
// catch(onRejected) # Handles rejections
// finally(onFinally) # Runs after promise settles
// Static Methods:
// Promise.all(iterable) # Waits for all promises to resolve
// Promise.race(iterable) # Waits for first promise to settle
// Promise.allSettled(iterable) # Waits for all to settle
// Utility Methods:
// Promise.resolve(value) # Creates a resolved promise
// Promise.reject(reason) # Creates a rejected promise

// Convert callback-based function to Promise-based:
// const util = require('util');
// const fs = require('fs');
// const readFile = util.promisify(fs.readFile);
// Convert
// async function readFileContents() {
//   const data = await readFile('file.txt', 'utf8');
//   return data;
// }
// module wrapper function:
// (function(exports, require, module, __filename, __dirname)) { etc }

// Node.js Error Handling:
// 1. Error-First Callback:

// const fs = require('fs');

// function readConfigFile(filename, callback) {
//     fs.readFile(filename, 'utf8', (err, data) => {
//         if (err) {
//             // Handle specific error types
//             if (err.code === 'ENOENT') {
//                 return callback(new Error(`Config file ${filename} not found`));
//             } else if (err.code === 'EACCES') {
//                 return callback(new Error(`No permission to read ${filename}`));
//             }
//             // For all other errors
//             return callback(err);
//         }

//         // Process data if no error
//         try {
//             const config = JSON.parse(data);
//             callback(null, config);
//         } catch (parseError) {
//             callback(new Error(`Invalid JSON in ${filename}`));
//         }
//     });
// }

// // Usage
// readConfigFile('config.json', (err, config) => {
//     if (err) {
//         console.error('Failed to read config:', err.message);
//         // Handle the error (e.g., use default config)
//         return;
//     }
//     console.log('Config loaded successfully:', config);
// });

// 2. try/catch with Async/Await

// const fs = require('fs').promises;

// async function loadUserData(userId) {
//     try {
//         const data = await fs.readFile(`user/${userId}.json`, 'utf8');
//         const user = JSON.parse(data);
//         if(!user.email) {
//             throw new Error('Invalid user data: missing email!');
//         }
//         return user;
//     } catch (error) {
//         // Handle different error types
//         if(error.code === 'ENOENT') {
//             throw new Error(`User ${userId} not found!`);
//         } else if(error.code === 'EACCES') {
//             throw new Error(`No permission to read ${userId}.`);
//         }else if(error instanceof SyntaxError) {
//             throw new Error(`Invalid user data format.`);
//         }
//         // Re-throw other errors
//         throw error;
//     } finally {
//         // Cleanup code that runs whether successful or not
//         console.log(`Finished processing user ${userId}`);
//     }
// }
// // Usage
// (async () => {
//     try {
//         const user = await loadUserData(123);
//         console.log('User loaded: ', user);
//     } catch (error) {
//         console.log('Failed to load user: ', error.message);
//         // Handle error (e.g., show to user, retry, etc.)
//     }
// })();

// Path core module:
// const fullPath = path.join(__dirname, 'images', 'logo.png'); // خروجی: /home/user/project/images/logo.png
// const fileName = path.basename('/home/user/file.txt'); // خروجی: file.txt
// const ext = path.extname('file.txt'); // خروجی: .txt
// const absolute = path.resolve('docs', 'readme.md'); // خروجی: /home/user/project/docs/readme.md
// const dir = path.dirname('/home/user/file.txt'); // خروجی: /home/user

// const url = new URL (input, [base]);
// const searchParams = new URLSearchParams(str)

// const ext = path.extname(filePath).toLowerCase();
// const contentType = {
//     '.html': 'text/html',
//     '.js': 'application/javascript',
//     '.css': 'text/css',
//     '.json': 'application/json',
//     '.png': 'image/png',
//     '.jpg': 'image/jpeg',
//     '.jpeg': 'image/jpeg'
// }[ext] || 'application/octet-stream';

// fs.readFile(filePath, (err, data) => {
//     // 4.1 خطای فایل پیدا نشد
//     if (err && err.code === 'ENOENT') {
//         const notFoundPage = path.join(PUBLIC_DIR, '404.html');
//         return fs.readFile(notFoundPage, (nfErr, nfData) => {
//             res.writeHead(404, { 'Content-Type': 'text/html' });
//             res.end(nfData || '<h1>404 Not Found</h1>');
//         });
//     }

//     // 4.2 خطای داخلی سرور
//     if (err) {
//         res.writeHead(500, { 'Content-Type': 'text/plain' });
//         return res.end(`Server Error: ${err.message}`);
//     }

//     if (method === 'GET') {
//         // 4.3 ارسال موفق پاسخ
//         res.writeHead(200, {
//             'Content-Type': contentType,
//             'Content-Length': Buffer.byteLength(data),
//             // 'transfer-encoding': 'chunked',  //اگر نوع ارتباط به صورت استریم باشد یا مقدار دیتا به صورت لحظه ای تغییر کند به جای کانتنت لنز از این استیتمنت استفاده می کنیم
//             'Cache-Control': 'public, max-age=86400',
//             'X-Powered-By': 'node.js',  //توصیه می شود که این بخش در بخش پروداکشن نباشد چون اطلاعاتی مفیدی به هکر می دهد که حمله ی هدفمند انجام دهد
//             'Set-Cookie': 'sessionid=abc123; HttpOnly; Secure; SameSite=Strict; Max-Age=3600'
//         });
//         res.end(data);
//     }
// });