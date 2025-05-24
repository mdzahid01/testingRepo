const debouncebtn = document.getElementById('debounce')
const throttlingbtn = document.getElementById('throttling')

/**
 * Returns a function that will execute the given function `func` after `delay` milliseconds
 * after the last time it was invoked. Useful for preventing excessive calls to a function
 * when an event is rapidly triggered.
 * @param {function} func The function to execute.
 * @param {number} delay The delay time in milliseconds.
 * @returns {function} A function that can be called repeatedly, with the original function
 *   executed after the given delay.
 */
function debounce(func, delay) {
  let timer;
  return function (...args){
    clearTimeout(timer);
    timer = setTimeout(() =>{
        func.apply(this,args)
    },delay)
  }
}

/**
 * Logs a message to the console when the debouncing button is clicked.
 * @param {string} msg The message to log.
 */
function handleDebounceClick(){
    console.log("debounce clicked");
}

debouncebtn.addEventListener('click', debounce(()=>handleDebounceClick("this is debounce msg"), 500));



/**
 * Returns a function that will execute the given function `func` at most once every `limit` milliseconds.
 * @param {function} func The function to execute.
 * @param {number} limit The maximum frequency at which the function can be executed.
 * @returns {function} A function that can be called repeatedly, with the original function executed at most once every `limit` milliseconds.
 */
function throttling(func , limit){
    let lastCall = 0;
    return function(...args){
        const now = Date.now();
        if(now - limit > lastCall){
            lastCall = now;
            func.apply(this,args)
        }
    };
}

/**
 * Logs a message to the console when the throttling button is clicked.
 * @param {string} msg The message to log.
 */
function handleThrottlingClick(msg){
    console.log("throttling clicked" + msg);
}

throttlingbtn.addEventListener('click', throttling(()=>handleThrottlingClick("this one is throttling msg"), 1000));


document.addEventListener('mousemove', throttling((e) => {
  console.log("Mouse at:", e.clientX, e.clientY);
}, 500));


window.addEventListener('resize', throttling(() => {
  console.log("Window resized");
}, 6000));
