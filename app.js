const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const proposalBox = document.getElementById('proposal-box');
const aiResponseText = document.getElementById('ai-response-text');

let memory = { category: '', priority: '', duration: '' };

sendBtn.addEventListener('click', analyzeRequest);
userInput.addEventListener('keypress', (e) => e.key === 'Enter' && analyzeRequest());

function analyzeRequest() {
    const text = userInput.value.trim().toLowerCase();
    if(!text) return;

    appendMsg('user', text);
    userInput.value = '';

    setTimeout(() => {
        // LÓGICA DE DETECCIÓN MULTIRIESGO
        if (text.includes('art') || text.includes('trabaj') || text.includes('obr') || text.includes('pintor')) {
            processRisk('laboral', text);
        } else if (text.includes('vid') || text.includes('falleci')) {
            processRisk('vida', text);
        } else if (text.includes('auto') || text.includes('camioneta') || text.includes('uber')) {
            processRisk('automotor', text);
        } else {
            processRisk('general', text);
        }
    }, 1200);
}

function processRisk(type, originalText) {
    let responseExpert = "";
    let responseSimple = "";

    switch(type) {
        case 'laboral':
            responseExpert = "Detecto una necesidad de cobertura bajo la Ley 24.557 de Riesgos de Trabajo. Para plazos breves (1 a 5 días), sugiero una Póliza de Accidentes Personales con cláusula de no repetición.";
            responseSimple = "Basicamente, si necesitás asegurar a alguien para laburar pocos días, te conviene una póliza 'por día'. Es más barata y te cubre lo mismo ante un accidente.";
            break;
        case 'automotor':
            responseExpert = "Análisis detecta riesgo vehicular en zona urbana. Se recomienda Cobertura B1 con reposición de cristales ilimitada ante tasa creciente de vandalismo.";
            responseSimple = "Che, fijate de ponerle 'Terceros Completo' que te incluya los vidrios, porque hoy cambiarlos sale una fortuna y esta cobertura los cubre al 100%.";
            break;
        case 'vida':
            responseExpert = "Estimación actuarial sugiere Seguro de Vida Term con capital garantizado según inflación del BCRA.";
            responseSimple = "Es un seguro que cuida a los tuyos por poca plata mensual, y el monto se actualiza para que no pierda valor con la inflación.";
            break;
        default:
            responseExpert = "Riesgo técnico detectado. Se requiere un relevamiento de capital asegurable y tasa de siniestralidad zonal.";
            responseSimple = "Explicame un poquito más qué querés asegurar, así te digo exacto cuál es la aseguradora que menos te cobra y mejor paga.";
    }

    appendMsg('ai', responseExpert + "<br><br>" + responseSimple);
    
    // Mostramos la caja de oferta (MONETIZACION)
    setTimeout(() => {
        proposalBox.classList.remove('hidden');
        proposalBox.classList.add('scale-100', 'opacity-100');
        document.getElementById('ai-response-text').innerHTML = `<strong>Técnico:</strong> ${responseExpert}<br><br><strong>Simple:</strong> ${responseSimple}`;
    }, 500);
}

function appendMsg(sender, text) {
    const div = document.createElement('div');
    div.className = sender === 'ai' ? 'flex flex-col gap-1 ai-msg max-w-[85%]' : 'flex flex-col gap-1 items-end ml-auto max-w-[85%]';
    
    const style = sender === 'ai' 
        ? 'bg-white border-2 border-blue-50 p-5 rounded-3xl rounded-tl-none shadow-sm'
        : 'bg-blue-600 text-white p-5 rounded-3xl rounded-tr-none shadow-md font-semibold italic';

    div.innerHTML = `<div class="${style}">${text}</div>`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Botón instalar PWA
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-btn').classList.remove('hidden');
});

function instalarPWA() {
    deferredPrompt.prompt();
    document.getElementById('install-btn').classList.add('hidden');
}