/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/web3/dist/web3.min.js":
/*!********************************************!*\
  !*** ./node_modules/web3/dist/web3.min.js ***!
  \********************************************/
/***/ ((module) => {


/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Web3 = __webpack_require__(/*! web3 */ \"./node_modules/web3/dist/web3.min.js\");\r\nconst form = document.querySelector(\"form\");\r\neField = form.querySelector(\".email\");\r\neInput = eField.querySelector(\"input\");\r\npField = form.querySelector(\".password\");\r\npInput = pField.querySelector(\"input\");\r\nmetamaskButton = document.getElementById(\"metamask-login\");\r\n\r\nform.onsubmit = (e)=>{\r\n  e.preventDefault(); //preventing from form submitting\r\n  //if email and password is blank then add shake class in it else call specified function\r\n  (eInput.value === \"\") ? eField.classList.add(\"shake\", \"error\") : checkEmail();\r\n  (pInput.value === \"\") ? pField.classList.add(\"shake\", \"error\") : checkPass();\r\n\r\n  setTimeout(()=>{ //remove shake class after 500ms\r\n    eField.classList.remove(\"shake\");\r\n    pField.classList.remove(\"shake\");\r\n  }, 500);\r\n\r\n  eInput.onkeyup = ()=>{checkEmail();} //calling checkEmail function on email input keyup\r\n  pInput.onkeyup = ()=>{checkPass();} //calling checkPassword function on pass input keyup\r\n  metamaskButton.onclick = () => {loginWithMetamask()}\r\n\r\n  function checkEmail(){ //checkEmail function\r\n    let pattern = /^[^ ]+@[^ ]+\\.[a-z]{2,3}$/; //pattern for validate email\r\n    if(!eInput.value.match(pattern)){ //if pattern not matched then add error and remove valid class\r\n      eField.classList.add(\"error\");\r\n      eField.classList.remove(\"valid\");\r\n      let errorTxt = eField.querySelector(\".error-txt\");\r\n      //if email value is not empty then show please enter valid email else show Email can't be blank\r\n      (eInput.value !== \"\") ? errorTxt.innerText = \"Enter a valid email address\" : errorTxt.innerText = \"Email can't be blank\";\r\n    }else{ //if pattern matched then remove error and add valid class\r\n      eField.classList.remove(\"error\");\r\n      eField.classList.add(\"valid\");\r\n    }\r\n  }\r\n\r\n  function checkPass(){ //checkPass function\r\n    if(pInput.value === \"\"){ //if pass is empty then add error and remove valid class\r\n      pField.classList.add(\"error\");\r\n      pField.classList.remove(\"valid\");\r\n    }else{ //if pass is empty then remove error and add valid class\r\n      pField.classList.remove(\"error\");\r\n      pField.classList.add(\"valid\");\r\n    }\r\n  }\r\n\r\n  async function loginWithMetamask() {\r\n    let web3 = new Web3('http://localhost:8545');\r\n\r\n    const accounts = await web3.eth.getAccounts();\r\n    console.log(accounts[0]);\r\n\r\n  }\r\n\r\n  //if eField and pField doesn't contains error class that mean user filled details properly\r\n  if(!eField.classList.contains(\"error\") && !pField.classList.contains(\"error\")){\r\n    window.location.href = form.getAttribute(\"action\"); //redirecting user to the specified url which is inside action attribute of form tag\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/page.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/page.js");
/******/ 	
/******/ })()
;