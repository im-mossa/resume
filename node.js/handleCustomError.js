const http = require('http');

class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
        this.statusCode = 400;
    }
}

class NotFoundError extends Error {
    constructor(resource) {
        super(`${resource} not found`);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

// نمونه دیتای فرضی
const users = [
    { id: 1, name: 'Ali' },
    { id: 2, name: 'Sara' }
];

// تابع نمونه برای استفاده از خطاها
function getUser(id) {
    if (!id) {
        throw new ValidationError('User ID is required', 'id');
    }

    const user = users.find(u => u.id === Number(id));
    if (!user) {
        throw new NotFoundError('User');
    }

    return user;
}

// ساخت سرور
const server = http.createServer((req, res) => {
    try {
        if (req.url.startsWith('/user')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const id = url.searchParams.get('id');
            const user = getUser(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            throw new NotFoundError('Route');
        }
    } catch (err) {
        // هندلر خطا
        res.writeHead(err.statusCode || 500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: err.statusCode,
            error: err.name,
            message: err.message,
            field: err.field || null
        }));
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
