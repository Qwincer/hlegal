const loadMore = document.getElementById('loadMore');
const loadLess = document.getElementById('loadLess');
const cards = document.querySelectorAll('.card-container');
const mainCardContainer = document.getElementById('cards');

'functions.js';

let tmpCards;
loadMore.addEventListener('click', (e) => {
   e.preventDefault();

   tmpCards = mainCardContainer.innerHTML;
   //add content
   mainCardContainer.insertAdjacentHTML('beforeend', mainCardContainer.innerHTML); // do konza
   mainCardContainer.style.animation = "fadeIn 2s ease-in";
   // hide more button
   loadMore.classList.add('is-hidden');

   //show less button
   loadLess.classList.remove('is-hidden');

   //scroll to button
   scrollToEl(loadLess.getBoundingClientRect().top + window.scrollY);



});

loadLess.addEventListener('click', (e) => {
   e.preventDefault();
   //add content
   mainCardContainer.innerHTML = tmpCards;// do konza

   // hide more button
   loadLess.classList.add('is-hidden');

   //show less button
   loadMore.classList.remove('is-hidden');

   //scroll to button
   scrollToEl(mainCardContainer.getBoundingClientRect().top + window.scrollY -150);
});

const scrollToEl = to => {
   const start = window.scrollY || window.pageYOffset
   const time = Date.now()
   const duration = Math.abs(start - to) / 3;
   const easeOutQuart = t => t*(2-t);

   (function step() {
       let dx = Math.min(1, (Date.now() - time) / duration)
       let pos = start + (to - start) * easeOutQuart(dx)

       window.scrollTo(0, pos)

       if (dx < 1) {
           window.requestAnimationFrame(step)
       }
   })()
};
