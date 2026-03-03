// Animaciones de Entrada Inicial
        window.addEventListener('load', () => {
            setTimeout(() => document.getElementById('intro-presentation').classList.add('show'), 100);
            setTimeout(() => document.getElementById('wedding-announcement').classList.add('show'), 600);
            setTimeout(() => document.getElementById('wax-seal').classList.add('show'), 1000);
            setTimeout(() => document.getElementById('guest-label').classList.add('show'), 1400);
            setTimeout(() => document.getElementById('instruction-wrapper').classList.add('show'), 2000);
        });

        let isOpened = false;

        function openEnvelope() {
            if (isOpened) return;
            isOpened = true;

            const seal = document.getElementById('wax-seal');
            const guestLabel = document.getElementById('guest-label');
            const flap = document.getElementById('envelope-flap');
            const fakeShadow = document.getElementById('flap-fake-shadow');
            const letter = document.getElementById('envelope-letter');
            const textInstr = document.getElementById('instruction-wrapper');
            const announcement = document.getElementById('wedding-announcement');
            const pageWrapper = document.getElementById('page-wrapper');

            // 1. Ocultar UI exterior
            seal.classList.add('open');
            guestLabel.classList.add('open');
            textInstr.classList.remove('show');
            announcement.style.opacity = '0';
            
            // Ocultar sombra falsa antes de rotar para evitar bugs en iOS
            fakeShadow.style.opacity = '0';

            // 2. Disparar los brillos
            spawnEffects();

            // 3. Abrir solapa
            setTimeout(() => {
                flap.classList.add('open');
                
                // FIX iOS: Cambiar Z-Index por JS a la mitad del giro en lugar de CSS
                setTimeout(() => {
                    flap.style.zIndex = '15';
                }, 400); // Casi a la mitad de los 0.9s de la transición

            }, 250);

            // 4. Sacar carta
            setTimeout(() => {
                letter.classList.add('open');
            }, 1000);

            // 5. Redireccionar a la siguiente página HTML
            setTimeout(() => {
                // Reemplaza 'invitacion_principal.html' con el nombre real de tu archivo destino
                window.location.href = 'informacion.html';
            }, 3500); // Espera 3.5 segundos en total antes de redirigir
        }

        // Función generadora de Brillos (Optimizada para Móviles)
        function spawnEffects() {
            const seal = document.getElementById('wax-seal');
            const rect = seal.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // FIX DE RENDIMIENTO: Detección de celular para reducir la carga de memoria
            const isMobile = window.innerWidth < 640;
            const distanceMultiplier = isMobile ? 0.6 : 1;
            const sizeMultiplier = isMobile ? 0.8 : 1;
            
            // Reducimos las partículas un 60% en móviles para mantener los 60fps intactos
            const countMultiplier = isMobile ? 0.4 : 1; 

            const fragment = document.createDocumentFragment();

            const svgs = {
                sparkle: `<svg viewBox="0 0 24 24" fill="#d4af37"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/></svg>`,
                flower1: `<svg viewBox="0 0 24 24" fill="#f4c2d0"><path d="M12 2c0 0-3 4-3 8s3 6 3 6 3-2 3-6-3-8-3-8z"/><path d="M12 22c0 0 3-4 3-8s-3-6-3-6-3 2-3 6 3 8 3 8z"/><path d="M2 12c0 0 4-3 8-3s6 3 6 3-2 3-6 3-8-3-8-3z"/><path d="M22 12c0 0-4 3-8 3s-6-3-6-3 2-3 6-3 8 3 8 3z"/></svg>`,
                flower2: `<svg viewBox="0 0 24 24" fill="#ffffff" stroke="#eab6c4" stroke-width="1"><circle cx="12" cy="12" r="3" fill="#d4af37" stroke="none"/><circle cx="12" cy="5" r="4"/><circle cx="12" cy="19" r="4"/><circle cx="5" cy="12" r="4"/><circle cx="19" cy="12" r="4"/><circle cx="7" cy="7" r="4"/><circle cx="17" cy="17" r="4"/><circle cx="7" cy="17" r="4"/><circle cx="17" cy="7" r="4"/></svg>`,
                leaf: `<svg viewBox="0 0 24 24" fill="#8ba696"><path d="M12 22c0 0-8-4-8-12 0-3 2-5 5-6 2-1 4 0 5 1 1-1 3-2 5-1 3 1 5 3 5 6 0 8-8 12-8 12z"/></svg>`
            };

            const createParticle = (type, amount) => {
                for (let i = 0; i < amount; i++) {
                    const el = document.createElement('div');
                    el.innerHTML = svgs[type];
                    el.className = 'effect-particle anim-particle';
                    
                    const angle = Math.random() * Math.PI * 2;
                    const distance = (type === 'sparkle') 
                        ? (Math.random() * 250 + 100) * distanceMultiplier 
                        : (Math.random() * 450 + 150) * distanceMultiplier;
                    
                    const tx = Math.cos(angle) * distance;
                    const ty = Math.sin(angle) * distance - (isMobile ? 80 : 120);
                    
                    const rot = Math.random() * 720;
                    const scale = (type === 'sparkle') 
                        ? (Math.random() * 1.2 + 0.8) * sizeMultiplier 
                        : (Math.random() * 2.0 + 1.2) * sizeMultiplier;
                    const duration = Math.random() * 1.5 + 1.5;
                    const size = (type === 'sparkle') ? 22 : 36;

                    el.style.left = `${centerX - size/2}px`;
                    el.style.top = `${centerY - size/2}px`;
                    el.style.width = `${size}px`;
                    el.style.height = `${size}px`;
                    el.style.setProperty('--tx', `${tx}px`);
                    el.style.setProperty('--ty', `${ty}px`);
                    el.style.setProperty('--rot', `${rot}deg`);
                    el.style.setProperty('--scale', scale);
                    el.style.setProperty('--duration', `${duration}s`);

                    fragment.appendChild(el);
                    setTimeout(() => el.remove(), duration * 1000);
                }
            };

            // Cantidades adaptadas
            createParticle('sparkle', Math.floor(90 * countMultiplier));
            createParticle('flower1', Math.floor(40 * countMultiplier));
            createParticle('flower2', Math.floor(40 * countMultiplier));
            createParticle('leaf', Math.floor(40 * countMultiplier));

            document.body.appendChild(fragment);
        }