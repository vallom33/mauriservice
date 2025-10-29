// ترجمة النصوص
const translations = {
    ar: {
        // التنقل
        home: "الرئيسية",
        services: "الخدمات", 
        pricing: "الأسعار",
        about: "من نحن",
        contact: "اتصل بنا",
        
        // الهيرو
        heroTitle: "ودع الطوابير للأبد",
        heroSubtitle: "خدمات استخراج الوثائق الرسمية بسرعة واحترافية في نواكشوط",
        orderNow: "اطلب خدمتك الآن",
        viewPrices: "تعرف على الأسعار",
        happyClients: "عميل راضي",
        documentsProcessed: "وثيقة مستخرجة", 
        support: "دعم عملاء",
        
        // الخدمات
        ourServices: "خدماتنا الأكثر طلباً",
        birthCertificate: "شهادات الميلاد",
        birthCertificateDesc: "استخراج وتجديد شهادات الميلاد",
        drivingLicense: "رخص القيادة", 
        drivingLicenseDesc: "تجديد واستخراج رخص القيادة",
        residenceCertificate: "شهادات الإقامة",
        residenceCertificateDesc: "استخراج شهادات الإقامة الرسمية",
        startingFrom: "ابتداءً من",
        
        // كيفية العمل
        howItWorks: "كيف تعمل خدمتنا؟",
        step1Title: "اتصل بنا",
        step1Desc: "اتصل أو راسلنا على الواتساب",
        step2Title: "أرسل المستندات", 
        step2Desc: "أرسل صور المستندات المطلوبة",
        step3Title: "نحن ننجز المهمة",
        step3Desc: "نقوم باستخراج الوثيقة نيابة عنك",
        step4Title: "التسليم",
        step4Desc: "نسلم لك الوثيقة في مكانك",
        
        // الاتصال
        readyToStart: "مستعد للبدء؟",
        contactUsNow: "اتصل بنا الآن واحصل على وثيقتك بدون عناء",
        contactWhatsApp: "واتساب: 12345678",
        callUs: "اتصال: 12345678",
        
        // الفوتر
        footerDesc: "شركتك الموثوقة لاستخراج الوثائق الرسمية في موريتانيا",
        quickLinks: "روابط سريعة",
        contactInfo: "معلومات الاتصال"
    },
    
    fr: {
        // Navigation
        home: "Accueil",
        services: "Services",
        pricing: "Tarifs", 
        about: "À propos",
        contact: "Contact",
        
        // Hero
        heroTitle: "Dites adieu aux files d'attente",
        heroSubtitle: "Services d'obtention de documents officiels rapides et professionnels à Nouakchott",
        orderNow: "Commandez votre service maintenant",
        viewPrices: "Voir les tarifs",
        happyClients: "clients satisfaits",
        documentsProcessed: "documents traités",
        support: "support client",
        
        // Services
        ourServices: "Nos services les plus demandés",
        birthCertificate: "Certificats de naissance",
        birthCertificateDesc: "Obtention et renouvellement de certificats de naissance",
        drivingLicense: "Permis de conduire",
        drivingLicenseDesc: "Renouvellement et obtention de permis de conduire", 
        residenceCertificate: "Certificats de résidence",
        residenceCertificateDesc: "Obtention de certificats de résidence officiels",
        startingFrom: "À partir de",
        
        // How it works
        howItWorks: "Comment fonctionne notre service?",
        step1Title: "Contactez-nous",
        step1Desc: "Appelez ou contactez-nous sur WhatsApp",
        step2Title: "Envoyez les documents",
        step2Desc: "Envoyez les photos des documents requis",
        step3Title: "Nous faisons le travail",
        step3Desc: "Nous obtenons le document pour vous",
        step4Title: "Livraison", 
        step4Desc: "Nous vous livrons le document à votre lieu",
        
        // Contact
        readyToStart: "Prêt à commencer?",
        contactUsNow: "Contactez-nous maintenant et obtenez votre document sans tracas",
        contactWhatsApp: "WhatsApp: 12345678",
        callUs: "Appel: 12345678",
        
        // Footer
        footerDesc: "Votre entreprise de confiance pour l'obtention de documents officiels en Mauritanie",
        quickLinks: "Liens rapides", 
        contactInfo: "Informations de contact"
    }
};

// تبديل اللغة
let currentLang = 'ar';

function switchLanguage() {
    currentLang = currentLang === 'ar' ? 'fr' : 'ar';
    document.getElementById('currentLang').textContent = currentLang === 'ar' ? 'FR' : 'AR';
    
    // تغيير اتجاه الصفحة
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    // تطبيق الترجمات
    applyTranslations();
    
    // حفظ التفضيل
    localStorage.setItem('preferredLanguage', currentLang);
}

function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
}

// التهيئة
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
        document.getElementById('currentLang').textContent = currentLang === 'ar' ? 'FR' : 'AR';
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    }
    
    applyTranslations();
    
    // إضافة حدث للزر
    document.getElementById('languageSwitch').addEventListener('click', switchLanguage);
});