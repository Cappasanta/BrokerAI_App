const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const langSelector = document.getElementById('lang-selector');

// Diccionario de idiomas
const i18n = {
    es: {
        welcome: "Un cordial saludo. Soy su Agente Senior en Riesgos. Para iniciar el dictamen técnico: ¿Qué necesita asegurar y en qué provincia reside?",
        expertPrefix: "ANÁLISIS TÉCNICO:",
        simplePrefix: "EN CRIOLLO:",
        analyzing: "Cruzando datos con solvencia de aseguradoras nacionales...",
        cta: "OBTENER MI POLIZA CON DESCUENTO",
        finalTitle: "VERDICTO PROFESIONAL",
        inputPlaceholder: "Ej: Auto en Mendoza..."
    },
    en: {
        welcome: "Greetings. I am your Senior Risk Analyst. To begin the technical evaluation: What would you like to insure and what is your location in Argentina?",
        expertPrefix: "TECHNICAL ANALYSIS:",
        simplePrefix: "PLAIN ENGLISH:",
        analyzing: "Syncing data with national insurance solvency rates...",
        cta: "GET MY POLICY (APPLIED DISCOUNT)",
        finalTitle: "PROFESSIONAL VERDICT",
        inputPlaceholder: "Ex: Travel Insurance/Home..."
    }
};

let currentLang = 'es';

langSelector.addEventListener('change', () => {
    currentLang = langSelector.value;
    userInput.placeholder = i18n[currentLang].inputPlaceholder;
    resetChat();
});

function resetChat() {
    chatBox.innerHTML = '';
    appendMessage('ai', i18n[currentLang].welcome);
}

sendBtn.addEventListener('click', processMessage);

function processMessage() {
    const text = userInput.value;
    if(!text) return;

    appendMessage('user', text);
    userInput.value = '';

    setTimeout(() => {
        appendMessage('ai', i18n[currentLang].analyzing);
        setTimeout(showFinalVerdict, 2000);
    }, 1000);
}

function appendMessage(sender, text) {
    const div = document.createElement('div');
    div.className = sender === 'ai' ? 'ai-msg flex items-start' : 'user-msg flex flex-row-reverse';
    
    const content = sender === 'ai' 
        ? `<div class="bg-slate-700 p-4 rounded-3xl rounded-tl-none border-l-4 border-blue-500 italic max-w-[90%]">${text}</div>`
        : `<div class="bg-blue-600 p-3 rounded-2xl rounded-tr-none max-w-[80%]">${text}</div>`;
        
    div.innerHTML = content;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showFinalVerdict() {
    const results = document.getElementById('results-area');
    document.getElementById('res-title').innerText = i18n[currentLang].finalTitle;
    document.getElementById('cta-button').innerText = i18n[currentLang].cta;
    
    const verdict = currentLang === 'es' 
        ? `<strong>Análisis Técnico:</strong> Cobertura sugerida con cláusula de ajuste del 30% ante inflación. Recomendamos Federación Patronal o Sancor.<br><br><strong>Simple:</strong> Te conviene esta porque si aumenta el valor del auto, el seguro te acompaña y no te quedás corto con la plata.`
        : `<strong>Technical View:</strong> Inflation-adjusted coverage suggested. Best providers: San Cristobal or Allianz.<br><br><strong>Simple:</strong> Choose this so your claim payout matches real repair costs even if prices rise.`;

    document.getElementById('res-text').innerHTML = verdict;
    results.classList.remove('hidden');
    results.scrollIntoView({ behavior: 'smooth' });
}

// Iniciar bienvenida
resetChat();