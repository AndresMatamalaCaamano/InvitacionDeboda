        // Animaciones de Entrada Inicial
        window.addEventListener('load', () => {
            const overlay = document.getElementById('pre-intro-overlay');
            const pulseGroup = document.getElementById('intro-pulse-group');

            setTimeout(() => {
                pulseGroup.classList.add('circle-expand');
                
                setTimeout(() => {
                    overlay.classList.add('fade-out-overlay');
                    
                    setTimeout(() => document.getElementById('intro-presentation').classList.add('show'), 100);
                    setTimeout(() => document.getElementById('wedding-announcement').classList.add('show'), 600);
                    setTimeout(() => document.getElementById('wax-seal').classList.add('show'), 1000);
                    
                    setTimeout(() => {
                        document.getElementById('floral-left')?.classList.add('show');
                        document.getElementById('floral-right')?.classList.add('show');
                        document.getElementById('guest-label').classList.add('show');
                    }, 1400); 

                    setTimeout(() => document.getElementById('instruction-wrapper').classList.add('show'), 2000);
                    
                    setTimeout(() => {
                        overlay.style.display = 'none';
                    }, 1000); 

                }, 500); 

            }, 1000); 
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

            seal.classList.add('open');
            guestLabel.classList.add('open');
            textInstr.classList.remove('show');
            announcement.style.opacity = '0';
            fakeShadow.style.opacity = '0';

            spawnEffects();

            setTimeout(() => {
                flap.classList.add('open');
                setTimeout(() => { flap.style.zIndex = '15'; }, 400); 
            }, 250);

            setTimeout(() => { letter.classList.add('open'); }, 1000);

            setTimeout(() => {
                window.location.href = 'info.html';
            }, 3000);
        }

        // Función generadora de Brillos (Optimizada para Móviles y adaptada al zoom global)
        function spawnEffects() {
            const seal = document.getElementById('wax-seal');
            const rect = seal.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const isMobile = window.innerWidth < 680;
            
            // Leemos el zoom maestro de CSS para ajustar también el tamaño de los brillos
            const rootStyles = getComputedStyle(document.documentElement);
            const zoomValue = parseFloat(rootStyles.getPropertyValue('--zoom-celular')) || 0.75;
            const mobileScale = isMobile ? zoomValue : 1;

            const distanceMultiplier = (isMobile ? 0.6 : 1) * mobileScale;
            const sizeMultiplier = (isMobile ? 0.8 : 1) * mobileScale;


            const countMultiplier = isMobile ? 0.5 : 1; 

            const fragment = document.createDocumentFragment();

            const svgs = {
                sparkle: `<svg viewBox="0 0 24 24" fill="#d4af37"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/></svg>`,
                petal1: `<svg viewBox="0 0 24 24" class="w-full h-full"><defs><radialGradient id="grad-p1" cx="50%" cy="100%" r="100%"><stop offset="0%" stop-color="#8c445a" /><stop offset="40%" stop-color="#dca0b1" /><stop offset="100%" stop-color="#ffffff" /></radialGradient></defs><path d="M12 22C8 20 2 14 3 9C4 5 9 4 11 6C11.5 5.5 12.5 5.5 13 6C15 4 20 5 21 9C22 14 16 20 12 22Z" fill="url(#grad-p1)" stroke="#000" stroke-width="0.2"/><g stroke="#000" stroke-width="0.27" opacity="0.7" fill="none"><path d="M12 21.5 Q12 14 12 7" /><path d="M12 21.5 Q9 16 7 10"/><path d="M12 21.5 Q15 16 17 10"/></g></svg>`,
                petal2: `<svg viewBox="0 0 24 24" class="w-full h-full"><defs><radialGradient id="grad-p2" cx="50%" cy="100%" r="100%"><stop offset="0%" stop-color="#8c445a" /><stop offset="50%" stop-color="#dca0b1" /><stop offset="100%" stop-color="#fdf2f0" /></radialGradient></defs><path d="M8 22C4 20 2 14 5 7C8 2 13 4 16 8C19 12 17 18 8 22Z" fill="url(#grad-p2)" stroke="#000" stroke-width="0.2"/><g stroke="#000" stroke-width="0.27" opacity="0.7" fill="none"><path d="M8.5 21.5 Q10 14 13 8"/><path d="M8.5 21.5 Q 7 15 6 10"/></g></svg>`,
                petal3: `<svg viewBox="0 0 24 24" class="w-full h-full"><defs><radialGradient id="grad-p3" cx="50%" cy="100%" r="100%"><stop offset="0%" stop-color="#8c445a"/><stop offset="100%" stop-color="#fff"/></radialGradient></defs><path d="M12 22C10 21 5 14 6 7C7 2 12 1 12 6C12 1 17 2 18 7C19 14 14 21 12 22Z" fill="url(#grad-p3)" stroke="#000" stroke-width="0.2"/><path d="M12 21.5 L12 7" stroke="#000" stroke-width="0.27" opacity="0.6" fill="none"/></svg>`,
                petal4: `<svg viewBox="0 0 24 24" class="w-full h-full"><defs><radialGradient id="grad-p4" cx="50%" cy="100%" r="100%"><stop offset="0%" stop-color="#8c445a"/><stop offset="100%" stop-color="#fdf2f0"/></radialGradient></defs><path d="M12 22C8 21 4 15 4 8C4 4 10 3 12 5C14 3 20 4 20 8C20 15 16 21 12 22Z" fill="url(#grad-p4)" stroke="#000" stroke-width="0.2"/><g stroke="#000" stroke-width="0.27" opacity="0.7" fill="none"><path d="M12 21.5 Q10.5 15 11 8"/><path d="M12 21.5 Q13.5 15 14 8"/></g></svg>`,
                petal5: `<svg viewBox="0 0 24 24" class="w-full h-full"><defs><radialGradient id="grad-p5" cx="50%" cy="100%" r="100%"><stop offset="0%" stop-color="#8c445a"/><stop offset="100%" stop-color="#fff"/></radialGradient></defs><path d="M6 22C4 20 2 12 8 6C12 2 18 4 21 9C23 15 18 21 6 22Z" fill="url(#grad-p5)" stroke="#000" stroke-width="0.2"/><path d="M6.5 21.5 Q 12 16 16.5 10.5" stroke="#000" stroke-width="0.27" fill="none" opacity="0.5"/></svg>`,
                petal6: `<svg viewBox="0 0 24 24" class="w-full h-full"><defs><radialGradient id="grad-p6" cx="50%" cy="100%" r="100%"><stop offset="0%" stop-color="#8c445a"/><stop offset="100%" stop-color="#fdf2f0"/></radialGradient></defs><path d="M12 20C9 18 6 14 6 9C6 6 10 5 12 7C14 5 18 6 18 9C18 14 15 18 12 20Z" fill="url(#grad-p6)" stroke="#000" stroke-width="0.2"/><path d="M12 19.5Q12 13 12 9" stroke="#000" stroke-width="0.27" fill="none" opacity="0.6"/></svg>`,
                leaf: `<svg viewBox="0 0 24 24" class="w-full h-full" overflow="visible"><path d="M12 22 L12 24" stroke="#8ba696" stroke-width="1.5" stroke-linecap="round"/><path d="M12 22.5 C14.5 21 16.5 18 15.5 15 C17.5 13 17.5 9 14.5 6 C14.5 4 13.5 2 12 1 C10.5 2 9.5 4 9.5 6 C6.5 9 6.5 13 8.5 15 C7.5 18 9.5 21 12 22.5 Z" fill="#8ba696" stroke="#000" stroke-width="0.2"/><path d="M12 22.5 Q12.5 12 12 1.5 M12.2 20 Q14 19.5 14.5 18 M12.1 20.5 Q10 20 9.5 18.5 M12.4 17.5 Q14.5 16 15.5 14 M12.3 18 Q9.5 16.5 8.5 14.5 M12.6 14.5 Q15 12 15.5 10 M12.4 15 Q9 12.5 8.5 10.5 M12.5 11.5 Q14 9.5 13.8 7.5 M12.5 12 Q10 10 10.2 8 M12.4 8.5 Q13.5 7 13.2 5 M12.3 9 Q10.5 7.5 10.8 5.5 M12.2 5.5 Q13 4.5 12.8 3 M12.1 6 Q11 5 11.2 3.5" stroke="#000" stroke-width="0.27" fill="none" stroke-linecap="round"/></svg>`
            };

            const createParticle = (type, amount) => {
                for (let i = 0; i < amount; i++) {
                    const el = document.createElement('div');
                    el.innerHTML = svgs[type];
                    el.className = 'effect-particle anim-particle';
                    
                    const angle = Math.random() * Math.PI * 2;
                    const distance = (type === 'sparkle') 
                        ? (Math.random() * 250 + 270) * distanceMultiplier 
                        : (Math.random() * 450 + 255) * distanceMultiplier;
                    
                    const tx = Math.cos(angle) * distance;
                    const ty = Math.sin(angle) * distance - (isMobile ? 90 : 120);
                    
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

            createParticle('sparkle', Math.floor(40 * countMultiplier));
            createParticle('petal1', Math.floor(40 * countMultiplier)); 
            createParticle('petal2', Math.floor(40 * countMultiplier));
            createParticle('petal3', Math.floor(40 * countMultiplier));
            createParticle('petal4', Math.floor(40 * countMultiplier));
            createParticle('petal5', Math.floor(40 * countMultiplier));
            createParticle('petal6', Math.floor(40 * countMultiplier));
            createParticle('leaf', Math.floor(40 * countMultiplier)); 

            document.body.appendChild(fragment);
        }