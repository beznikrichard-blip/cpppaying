// انتظر حتى يتم تحميل كل محتوى الصفحة
document.addEventListener('DOMContentLoaded', () => {

    // ============================================================================
    // ================ قسم الإعدادات الرئيسي (تم إصلاحه) ========================
    // ============================================================================
    const lockerConfigs = {
        'roblox': {
            // ## ROBLOX LOCKER CODE ##
            configHTML: 'var kXbnA_JCC_UGnaLc={"it":4597825,"key":"49cf2"};',
            scriptURL: 'https://d1qt1z4ccvak33.cloudfront.net/b1269f0.js',
            triggerFunc: function() { _Ew(); }
        },
        'amazon': {
            // ## AMAZON LOCKER CODE ##
            configHTML: 'var THeut_VJg_puVYEc={"it":4597827,"key":"6642c"};',
            scriptURL: 'https://d3v3431sr9puku.cloudfront.net/0dbb4ec.js',
            triggerFunc: function() { _Ew(); }
        },
        'playstation': {
            // ## PLAYSTATION LOCKER CODE ##
            configHTML: 'var wwrLJ_Czk_BkzjQc={"it":4597831,"key":"40925"};',
            scriptURL: 'https://d1qt1z4ccvak33.cloudfront.net/e1ac279.js',
            triggerFunc: function() { _Ew(); }
        },
        'steam': {
            // ## STEAM LOCKER CODE ## var wwrLJ_Czk_BkzjQc={"it":4597831,"key":"40925"}; https://d1qt1z4ccvak33.cloudfront.net/e1ac279.js
            configHTML: 'var ozIiD_JkQ_TqBwPc={"it":4597829,"key":"c6b9e"};',
            scriptURL: 'https://d1qt1z4ccvak33.cloudfront.net/0646420.js',
            triggerFunc: function() { _Ew(); }
        },
        'xbox': {
            // ## XBOX LOCKER CODE ##
            configHTML: 'var RriOW_BkL_ABlvtc={"it":4597907,"key":"f90cf"};',
            scriptURL: 'https://d1qt1z4ccvak33.cloudfront.net/315d59d.js',
            triggerFunc: function() { _Ew(); }
        },
        'apple': {
            // ## APPLE LOCKER CODE ##
            configHTML: 'var RriOW_BkL_ABlvtc={"it":4597909,"key":"93bea"};',
            scriptURL: 'https://d1qt1z4ccvak33.cloudfront.net/315d59d.js',
            //  <<<<< تم إصلاح هذا السطر بإضافة الأقواس والأقواس المعقوفة الناقصة >>>>>
            triggerFunc: function() { _Ew(); } 
        }
    };
    // ============================================================================
    // =========== لا تعدل أي شيء تحت هذا الخط (الكود البرمجي) ===================
    // ============================================================================

    const allCards = document.querySelectorAll('.card');
    const modalOverlay = document.getElementById('modal-locker');
    const closeModalButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const lockerPlaceholder = document.querySelector('.content-locker-placeholder');

    function openModal(cardType) {
        const config = lockerConfigs[cardType];
        
        if (!config || !config.scriptURL) {
            console.error(`Locker configuration for "${cardType}" not found.`);
            alert(`Sorry, an offer for "${cardType}" is not available at the moment.`);
            return;
        }

        const formattedCardName = cardType.charAt(0).toUpperCase() + cardType.slice(1);
        modalTitle.textContent = `Special Offer for ${formattedCardName} Card`;
        
        lockerPlaceholder.innerHTML = '';
        
        const configScript = document.createElement('script');
        configScript.type = 'text/javascript';
        configScript.innerHTML = config.configHTML;
        
        const mainScript = document.createElement('script');
        mainScript.src = config.scriptURL;
        
        mainScript.onload = function() {
            try {
                config.triggerFunc();
            } catch (e) {
                console.error("Locker trigger function failed:", e);
                lockerPlaceholder.innerHTML = 'An error occurred while loading the offer.';
            }
        };
        mainScript.onerror = function() {
             console.error("Failed to load the main locker script.");
             lockerPlaceholder.innerHTML = 'Could not load the offer. Please try again later.';
        };

        lockerPlaceholder.appendChild(configScript);
        lockerPlaceholder.appendChild(mainScript);
        
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    allCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardType = card.dataset.card; 
            openModal(cardType);
        });
    });

    closeModalButton.addEventListener('click', () => {
        closeModal();
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
});