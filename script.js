// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

/* =========================================================
   HOME HERO ANIMATION
========================================================= */

const homeHero = document.querySelector('.home-hero');

if (homeHero) {

    const cean = homeHero.querySelector('.wordmark-cean');
    const hsuan = homeHero.querySelector('.wordmark-hsuan');

    const oceanScene =
        homeHero.querySelector('.home-ocean-scene');

    const glowScene =
        homeHero.querySelector('.home-glow-scene');

    const process =
        homeHero.querySelector('.home-process');


    if (cean && hsuan && oceanScene && glowScene && process) {

        // Initial state
        cean.classList.remove('fade-out');
        hsuan.classList.remove('visible');

        oceanScene.classList.remove('fade-out');
        glowScene.classList.remove('visible');

        process.classList.remove('visible');


        // Reduced motion: show final state immediately
        const reduceMotion =
            window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches;

        if (reduceMotion) {

            cean.classList.add('fade-out');
            hsuan.classList.add('visible');

            oceanScene.classList.add('fade-out');
            glowScene.classList.add('visible');

            process.classList.add('visible');

        } else {

            // 01 — O,cean
            // Keep the ocean opening visible briefly.


            // 02 — cean fades out
            // Ocean waves fade out.
            // Original glow background fades in.

            setTimeout(() => {

                cean.classList.add('fade-out');

                oceanScene.classList.add('fade-out');
                glowScene.classList.add('visible');

            }, 1400);


            // 03 — hsuan appears after cean fades

            setTimeout(() => {

                hsuan.classList.add('visible');

            }, 2300);


            // Show Listen — Understand — Build

            setTimeout(() => {

                process.classList.add('visible');

            }, 4100);

        }

    }
}


/* =========================================================
   HOME HERO — SCROLL STORY
   ========================================================= */

const hero = document.querySelector('.home-hero');
const process = document.querySelector('.home-process');
const wordmark = document.querySelector('.home-wordmark');

if (hero && process) {

    const items =
        process.querySelectorAll('.home-process-item');

    const dashes =
        process.querySelectorAll('.process-dash');

    const descriptions =
        process.querySelectorAll('.home-process-item p');


    function updateHeroProcess() {

        const rect = hero.getBoundingClientRect();

        const scrollDistance =
            hero.offsetHeight - window.innerHeight;

        const progress =
            Math.min(
                Math.max(-rect.top / scrollDistance, 0),
                1
            );


        /* =================================================
           NAME

           Fade out as the L-U-B starts moving.
           ================================================= */

        if (wordmark) {

            const nameFade =
                Math.min(progress / 0.2, 1);

            wordmark.style.opacity =
                1 - nameFade;
        }


        /* =================================================
           STAGE 1
           
           L-U-B slowly spreads sideways
           and moves downward.
           ================================================= */

        const spreadProgress =
            Math.min(progress / 0.65, 1);


       
         const processWidth = process.clientWidth;
         
         const firstItemWidth = items[0].offsetWidth;
         const lastItemWidth = items[2].offsetWidth;
         
         let maxSideDistance;
         
         if (window.innerWidth <= 420) {
             maxSideDistance = 45;
         } else if (window.innerWidth <= 650) {
             maxSideDistance = 70;
         } else if (window.innerWidth <= 900) {
             maxSideDistance = 120;
         } else {
             maxSideDistance = 220;
         }
         
         const sideDistance = Math.max(
             20,
             Math.min(
                 maxSideDistance,
                 (processWidth - firstItemWidth - lastItemWidth - 80) / 2
             )
         );


       
        let scrollUpDistance;

            if (window.innerWidth <= 420) {
                scrollUpDistance = 75;
            } else if (window.innerWidth <= 650) {
                scrollUpDistance = 100;
            } else if (window.innerWidth <= 900) {
                scrollUpDistance = 130;
            } else {
                scrollUpDistance = 150;
            }
            
            const verticalPosition =
                -scrollUpDistance * spreadProgress;


       
        if (items.length === 3) {

             // Listen — stay in original position
             items[0].style.transform = 'translate(0, 0)';
         
             // Understand — move upward
             items[1].style.transform =
                 `translate(
                     0,
                     ${-scrollUpDistance * spreadProgress}px
                 )`;
         
             // Build — stay in original position
             items[2].style.transform = 'translate(0, 0)';
         }


        /* =================================================
           DASHES

           Slowly disappear as L-U-B spreads.
           ================================================= */

         const dashProgress =
             Math.min(progress / 0.12, 1);
         
         const dashOpacity =
             0.5 * (1 - dashProgress);
         
         dashes.forEach(dash => {
             dash.style.opacity = dashOpacity;
         });


        /* =================================================
           STAGE 2
           
           Explanation appears AFTER L-U-B has mostly
           finished spreading.
           ================================================= */

        const revealProgress =
            Math.min(
                Math.max(
                    (progress - 0.50) / 0.25,
                    0
                ),
                1
            );


        descriptions.forEach(description => {

            if (revealProgress > 0) {

                description.style.display =
                    'block';

                description.style.opacity =
                    revealProgress;

                description.style.transform =
                    `translate(
                        -50%,
                        ${10 - revealProgress * 10}px
                    )`;

            } else {

                description.style.display =
                    'none';
            }
        });
    }


    window.addEventListener(
        'scroll',
        updateHeroProcess,
        { passive: true }
    );

    updateHeroProcess();
}


/* =========================================================
   BACK TO TOP
   ========================================================= */

const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {

  function toggleBackToTop() {
    backToTopBtn.classList.toggle(
      'is-visible',
      window.scrollY > 300
    );
  }

  window.addEventListener(
    'scroll',
    toggleBackToTop,
    { passive: true }
  );

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  toggleBackToTop();
}

});
