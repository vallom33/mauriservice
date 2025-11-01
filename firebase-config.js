// firebase-config.js
// تهيئة Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC3qL5dzdOvIv7raaEd3xWOOraCiRks0h0",
    authDomain: "mauri-services.firebaseapp.com",
    projectId: "mauri-services",
    storageBucket: "mauri-services.firebasestorage.app",
    messagingSenderId: "324986363643",
    appId: "1:324986363643:web:803453b8ff2681b51d1a5e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// نظام تتبع الزوار المحسن
class VisitorTracker {
    constructor() {
        this.trackVisit();
    }

    async trackVisit() {
        try {
            const page = window.location.pathname.split('/').pop() || 'index.html';
            const visitorData = {
                page: page,
                timestamp: new Date(),
                referrer: document.referrer || 'direct',
                userAgent: navigator.userAgent,
                screenResolution: `${screen.width}x${screen.height}`,
                language: navigator.language
            };

            await db.collection('visitors').add(visitorData);
            
            // تحديث إحصائيات اليوم
            await this.updateDailyStats();
            
        } catch (error) {
            console.log('⚠️ تتبع الزوار غير متاح حالياً');
        }
    }

    async updateDailyStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayVisitors = await db.collection('visitors')
            .where('timestamp', '>=', today)
            .get();
            
        const dailyStats = {
            date: today,
            visitorCount: todayVisitors.size,
            lastUpdated: new Date()
        };
        
        await db.collection('daily_stats').doc(today.toISOString().split('T')[0]).set(dailyStats, { merge: true });
    }
}

// نظام المصادقة
class AuthSystem {
    constructor() {
        this.initAuthStateListener();
    }

    initAuthStateListener() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('✅ User logged in:', user.email);
                this.updateUIForLoggedInUser(user);
            } else {
                console.log('❌ No user logged in');
                this.updateUIForLoggedOutUser();
            }
        });
    }

    updateUIForLoggedInUser(user) {
        // إضافة عناصر واجهة المستخدم للمستخدم المسجل
        const authElements = document.getElementById('authElements');
        if (authElements) {
            authElements.innerHTML = `
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span>مرحباً، ${user.displayName || user.email}</span>
                    <button onclick="authSystem.logout()" class="btn-primary" style="padding: 0.5rem 1rem;">
                        تسجيل الخروج
                    </button>
                </div>
            `;
        }
    }

    updateUIForLoggedOutUser() {
        const authElements = document.getElementById('authElements');
        if (authElements) {
            authElements.innerHTML = `
                <button onclick="showLoginModal()" class="btn-primary" style="padding: 0.5rem 1rem;">
                    تسجيل الدخول
                </button>
                <button onclick="showSignupModal()" class="btn-outline" style="padding: 0.5rem 1rem;">
                    إنشاء حساب
                </button>
            `;
        }
    }

    async login(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async signup(email, password, name, phone) {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({
                displayName: name
            });

            // حفظ بيانات إضافية في Firestore
            await db.collection('users').doc(userCredential.user.uid).set({
                name: name,
                phone: phone,
                email: email,
                role: 'user',
                createdAt: new Date(),
                status: 'active'
            });

            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async logout() {
        try {
            await auth.signOut();
            window.location.reload();
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    async resetPassword(email) {
        try {
            await auth.sendPasswordResetEmail(email);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// تهيئة الأنظمة
const visitorTracker = new VisitorTracker();
const authSystem = new AuthSystem();

// وظائف مساعدة للواجهة
function showLoginModal() {
    // سيتم تنفيذها في الخطوة التالية
    alert('نظام تسجيل الدخول - قم بتطبيق الواجهة المناسبة');
}

function showSignupModal() {
    // سيتم تنفيذها في الخطوة التالية
    alert('نظام إنشاء حساب - قم بتطبيق الواجهة المناسبة');
}