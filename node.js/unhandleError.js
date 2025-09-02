const http = require('http');

// یک سرور ساده برای تست ایجاد می‌کنیم
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end('Server is running...');
});

// شروع به گوش دادن روی پورت 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// زمانی که یک ارور خارج از ترای کچ ایجاد می شود و مدیریت نشده از این دو رویداد زیر استفاده می شود
// Handle uncaught exceptions (synchronous errors)
process.on('uncaughtException', (error) => {
    console.error('UNCAUGHT EXCEPTION! Shutting down...');
    console.error(error.name, error.message);

    // Perform cleanup (close database connections, etc.)
    server.close(() => {
        console.log('Process terminated due to uncaught exception');
        process.exit(1); // Exit with failure
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION! Shutting down...');
    console.error('Unhandled Rejection at:', promise, 'Reason:', reason);

    // Close server and exit
    server.close(() => {
        process.exit(1);
    });
});

// Example of an unhandled promise rejection
Promise.reject(new Error('Something went wrong'));

// Example of an uncaught exception
setTimeout(() => {
    throw new Error('Uncaught exception after timeout');
}, 1000);
