// یک تابع برای ست کردن کوکی از دبلیو تری اسکول
function setPersistentCookie(cname, cvalue, exdays, path, domain) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + `;path=/${path}; domain=.${domain}; secure; HttpOnly; SameSite=Strict`;
}

// تابعی برای تنظیم یک سشن کوکی
function setSessionCookie(name, value) {
    // ساختار کوکی: name=value; path=/;
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/;";
}

// تابعی برای خواندن یک کوکی
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}



// تابعی برای حذف یک کوکی
function deleteCookie(cname) {
    // ساختار کوکی برای حذف: cname=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT
    document.cookie = cname + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
}