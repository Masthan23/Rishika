(function (global) {
    'use strict';

    const config = {
        apiKey: 'AIzaSyBVzj3TbLuYR9Vp0OwD_VraZgJt60If-cg',
        authDomain: 'rishika-4cce7.firebaseapp.com',
        projectId: 'rishika-4cce7',
        storageBucket: 'rishika-4cce7.firebasestorage.app',
        messagingSenderId: '685424292528',
        appId: '1:685424292528:web:b87ad69b053a0dff2f0175',
        measurementId: 'G-3D01S01FQ6'
    };

    global.FIREBASE_CONFIG = config;
    global.firebaseConfig = config;

    const scriptGroups = [
        [
            'https://www.gstatic.com/firebasejs/12.7.0/firebase-app-compat.js',
            'https://www.gstatic.com/firebasejs/12.7.0/firebase-auth-compat.js'
        ],
        [
            'https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js',
            'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth-compat.js'
        ]
    ];

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const existing = Array.from(document.scripts || []).find(s => s.src === src);
            if (existing) {
                if (existing.dataset.loaded === '1') {
                    resolve();
                    return;
                }
                existing.addEventListener('load', () => resolve(), { once: true });
                existing.addEventListener('error', () => reject(new Error('Failed to load ' + src)), { once: true });
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            script.onload = function () {
                script.dataset.loaded = '1';
                resolve();
            };
            script.onerror = function () {
                reject(new Error('Failed to load ' + src));
            };
            document.head.appendChild(script);
        });
    }

    global.__firebaseCompatError = '';
    global.ensureFirebaseCompatLoaded = async function () {
        if (global.firebase && global.firebase.auth) return true;

        let lastError = null;
        for (const group of scriptGroups) {
            try {
                for (const src of group) {
                    await loadScript(src);
                }
                if (global.firebase && global.firebase.auth) return true;
            } catch (err) {
                lastError = err;
            }
        }

        global.__firebaseCompatError = lastError ? String(lastError.message || lastError) : 'Firebase SDK failed to load.';
        return false;
    };

    global.__firebaseCompatReady = global.ensureFirebaseCompatLoaded();
})(window);
