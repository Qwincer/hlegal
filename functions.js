/**
 * smooth scrolling to a y-value
 * using window.requestAnimationFrame()
 * based on https://stackoverflow.com/a/54971309/710921
 * @param {number} to
 */
 export const scrollTo = to => {
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

/**
* based on https://lowrey.me/load-external-javascript-with-es6-promises/
* @param url
*/
export const loadScript = (url) => {
   return new Promise((resolve, reject) => {
       let script = document.createElement('script');
       script.type = 'text/javascript';
       script.src = url;
       script.addEventListener('load', () => resolve(script), false);
       script.addEventListener('error', () => reject(script), false);
       document.body.appendChild(script);
   });
};

/**
* based on https://ourcodeworld.com/articles/read/630/how-to-detect-if-the-webp-image-format-is-supported-in-the-browser-with-javascript
* @return {Promise<boolean>}
*/
export const webPSupported = async () => {
   // if the browser doesn't has the method createImageBitmap, you can't display webp format
   if (!self.createImageBitmap) return false;

   // base64 representation of a white point image
   const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';

   // retrieve the image in blob format
   const blob = await fetch(webpData).then(r => r.blob());

   // if the createImageBitmap method succeeds, return true, otherwise false
   return createImageBitmap(blob).then(() => true, () => false);
};