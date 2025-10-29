// إدارة المصادقة
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // في بيئة حقيقية، هذا سيتصل بخادم
            if (username === 'omar' && password === 'omar') {
                localStorage.setItem('adminAuthenticated', 'true');
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('اسم المستخدم أو كلمة المرور غير صحيحة');
            }
        });
    }
    
    // حماية الصفحات
    if (window.location.pathname.includes('admin')) {
        const isAuthenticated = localStorage.getItem('adminAuthenticated');
        if (!isAuthenticated && !window.location.pathname.includes('admin-login')) {
            window.location.href = 'admin-login.html';
        }
    }
});

// تسجيل الخروج
function logout() {
    localStorage.removeItem('adminAuthenticated');
    window.location.href = 'admin-login.html';
}