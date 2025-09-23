async function fetchPostMethod(url, postData, options = {}) {
    const {
        method = 'POST',
        headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(postData),
            'User-Agent': 'MySecureApp/1.0',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
        },
        requestTimeoutMs = 10000,        // تایم‌اوت کل درخواست
        maxRetries = 2,                  // تعداد دفعات تلاش مجدد در صورت خطا
        retryDelayMs = 300               // فاصله بین تلاش‌های مجدد (میلی‌ثانیه)
    } = options;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const controller = new AbortController;
        const { signal } = controller;
        let requestTimer = setTimeout(() => {
            controller.abort(new Error('Request timed out after ' + requestTimeoutMs + 'ms'));
        }, requestTimeoutMs);
        try {
            const res = await fetch(url, {
                method,
                headers,
                signal,
                redirect: 'manual',
                body: postData
            });
            clearTimeout(requestTimer);
            if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
                url = new URL(res.headers.get('location'), url).toString();
                continue;
            }
            if (res.status < 200) {
                throw new Error('HTTP error: ' + res.status);
            }
            const contentType = res.headers.get('content-type') || '';
            if (!contentType.startsWith('application/json')) {
                throw new Error('Invalid content-type: ' + contentType);
            }
            return await res.json();
        } catch (err) {
            clearTimeout(requestTimer);
            if (err.name === 'AbortError') {
                console.log('⏱️ Timeout or manual abort:', err.message);
            } else {
                console.log('❌ Fetch error:', err.message);
            }
            if (attempt < maxRetries) {
                await new Promise(r => setTimeout(r, retryDelayMs));
                continue;
            }
            throw err;
        }
    }
}
module.exports = { fetchPostMethod };
// نحوه ی استفاده
// Request data
const data = JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1
});

(async () => {
    try {
        const postData = await fetchPostMethod('https://jsonplaceholder.typicode.com/posts', data);
        console.log('✅ Response:', postData);
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
})();