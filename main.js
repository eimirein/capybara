vh = 1 * window.innerHeight/100;  vw = 1 * window.innerWidth/100
temp = []; assets = []; i_lang = -1
function emi(id) { if (document.getElementById(id)) { return document.getElementById(id) } }
function percent(this_num, of_the) { return Math.round( (100 * this_num) / of_the ) }
function print(...msg) {
	var em = emi("log")
	msg.forEach(function(message) {
		if (em) {
			em.innerHTML = em.innerHTML + '['+time()+'] '+message
			em.appendChild(document.createElement('br'))
		}
		console.log('['+time()+'] '+message)
	})
}
function log(msg, lvl) {
	var em = emi("log")
	var levels = ['userdata', 'info', 'warning', 'error', 'crash']
	if (em) {
		em.innerHTML = em.innerHTML + '['+time()+'] <@'+levels[lvl || 0]+'> '+msg
		em.appendChild(document.createElement('br'))
	}
	console.log('['+time()+'] <@'+levels[lvl || 0]+'> '+msg)
}
function time() {
	var get_time = new Date()
	var hour = get_time.getHours()
	var min = get_time.getMinutes()
	var sec = get_time.getSeconds()
	if (hour.toString().length==1) {hour = '0'+hour}
	if (min.toString().length==1) {min = '0'+min}
	if (sec.toString().length==1) {sec = '0'+sec}
	return hour+":"+min+':'+sec
}
function fullscreen() {
	var em = document.body
	if ( !em.fs || em.fs === 'false' ) {
		if (em.requestFullscreen) { em.requestFullscreen() }
		else if (em.webkitRequestFullscreen) { em.webkitRequestFullscreen() }
		else if (em.msRequestFullscreen) { em.msRequestFullscreen() }
		em.fs = 'true'
	}
	else if ( em.fs === 'true' ) {
		if (document.exitFullscreen) { document.exitFullscreen() }
		else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() }
		else if (document.msExitFullscreen) { document.msExitFullscreen() }
		em.fs = 'false'
	}
}
function href(https, _b) {
	if (_b) { window.open(https, '_blank') }
	else { window.open(https, '_self') }
}
// ex: assets.lang = { title: { 1: 'a', 2: 'b' }, pgph: { 1: 'hi', 2: 'bye' } }
function langs(name) {
	if (!name) {
		if (i_lang < lang_list.length-1) { i_lang++ } else { i_lang = 0 }
		lang = lang_list[i_lang]
	} else { lang = lang_list[name] }
	for (let sector in assets[lang]) {
		for (let i in assets[lang][sector]) {
			if ( emi(sector+i) ) { emi(sector+i).innerHTML = assets[lang][sector][i] }
		}
	}
	if (emi('lang')) { emi('lang').innerHTML = lang.toUpperCase() }
	emi('html').lang = lang
	// This document's addition
	if (emi('html').lang == 'russian') { cdata('p3tC', '© АльВиРити - 2022  |  Все права защищены') }
	else if (emi('html').lang == 'english') { cdata('p3tC', '© Alvirity - 2022  |  All rights reserved') }
}
// Set/change CSS variable
function pattern(CSSVar, val) { document.documentElement.style.setProperty('--'+CSSVar, val) }
// Scroll to an element
function scroll2(id) { emi(id).scrollIntoView() }
// Set functions for device type
function vport(func_desktop, func_mobile) {
	let h = window.innerHeight
	let w = window.innerWidth
	if ( percent(h, w) > 100 ) { func_mobile() }
	else { func_desktop() }
}

// Require a script into HTML
function require(source) {
	var script = document.createElement('script')
	script.src = source
	document.documentElement.appendChild(script)
}
// Load JS script / CSS sheet from a string
function loadstring(str) {
	var script = document.createElement('script')
	script.innerHTML = str
	document.documentElement.appendChild(script)
}
function loadsheet(str) {
	var style = document.createElement('style')
	style.innerHTML = str
	document.documentElement.appendChild(style)
}

// Copy text from an element to clipboard
function clip(id) {
	if ( emi(id) ) {
		navigator.clipboard.writeText(emi(id).textContent)
	} else { log('clip :: Element with id ['+id+'] does not exist', 1) }
}
// Insert text into an element
function type(id, txt) {
	if ( emi(id) ) {
		emi(id).appendChild(document.createTextNode(txt))
		emi(id).appendChild(document.createElement('br'))
	} else { log('type :: Element with id ['+id+'] does not exist', 1) }
}
// Erase text data of an element
function erase(id) {
	if ( emi(id) ) {
		emi(id).textContent = ''
	} else { log('erase :: Element with id ['+id+'] does not exist', 1) }
}
// Erase all internal data of an element
function wipe(id) {
	if ( emi(id) ) {
		emi(id).innerHTML = ''
	} else { log('wipe :: Element with id ['+id+'] does not exist', 1) }
}
// Remove one or multiple elements
function rm(...ids) {
	ids.forEach(function(id) {
		if ( emi(id) ) {
			emi(id).remove()
		} else { log('rm :: Element with id ['+id+'] does not exist', 1) }
	})
}
// Make one or multiple elements/write data within a specific root body
function mk(root_id, html_or_array) {
	root = emi(root_id)
	if ( root ) {
		if ( typeof html_or_array === 'object' ) {
			for (var index in html_or_array) {
				root.innerHTML = root.innerHTML + html_or_array[index]
			}
		} else { root.innerHTML = root.innerHTML + html_or_array }
	} else { log('mk :: Root element with id ['+root_id+'] does not exist', 1) }
}
// Change innerHTML data of a class
function cdata(_class, _data) {
	var items = document.getElementsByClassName(_class), i, len
	for (i = 0, len = items.length; i < len; i++) {
		items[i].innerHTML = _data
	}
}

// Animate an element, optionally add a second animation and set an interval
function a8(id, animation, a8opt, int_opt) {
	var a8em = emi(id)
	if ( a8em ) {
		if ( !a8opt && !int_opt ) { a8em.style.animation = animation }
		else {
			setInterval( function() { a8em.style.animation = animation }, int_opt )
			setInterval( function() { a8em.style.animation = a8opt }, int_opt*2 )
		}
	} else { log('a8 :: Element with id ['+id+'] does not exist', 1) }
}
// Add a switch-state expression to an element and assign 2 animations to it
function a8ss(id, a8A, a8B) {
	var a8em = emi(id)
	if ( a8em ) {
		if ( !a8em.value || a8em.value === 'false' ) {
			a8em.style.animation = a8A
			a8em.value = 'true'
		}
		else if ( a8em.value === 'true' ) {
			a8em.style.animation = a8B
			a8em.value = 'false'
		}
	} else { log('a8 :: Element with id ['+id+'] does not exist', 1) }
}
// Animate multiple objects on interval
// <str: name> Name for a loop; <int: interval> Execution interval (ms);
// <array: table> Array with element IDs; <str: a8x2> CSS Animations
function a8x(name, interval, table, a8show, a8hide) {
	if (!temp[name+'_i']) { temp[name+'_i'] = -1 } // Set [i] for loop
	if (!temp[name+'Switch']) { temp[name+'Switch'] = true } // Set a switch
	setInterval( function() {
		if ( temp[name+'Switch'] ) {
			if ( temp[name+'_i'] < table.length-1 ) {
				temp[name+'_i']++
				a8(table[ temp[name+'_i'] ], a8hide)
			} else {
				temp[name+'_i'] = table.length
				temp[name+'Switch'] = false
			} // {a, b, c} ex :: (0.hide[init]) -> 1.hide -> 2.hide -> false
		}
		if ( !temp[name+'Switch'] ) {
			if ( temp[name+'_i'] > 0 ) {
				temp[name+'_i']--
				a8(table[ temp[name+'_i'] ], a8show)
			} else {
				temp[name+'_i'] = 0
				temp[name+'Switch'] = true
				a8(table[ temp[name+'_i'] ], a8hide)
			} // {a, b, c} ex :: 2.show -> 1.show -> 0.show -> true -> 0.hide
		}
	}, interval) // P.S: Not gonna debug it, it's already huge and complicated
}

// Add a switch-state expression to an element and assign 2 functions to it
function trig(id, funcON, funcOFF) {
	em = emi(id)
	if (em) {
		if ( !em.state || em.state === 'OFF' ) {
			funcON()
			em.state = 'ON'
		}
		else if ( em.state === 'ON' ) {
			funcOFF()
			em.state = 'OFF'
		}
	}
	else { log('trig :: Element with id ['+id+'] does not exist', 1) }
}
// Slider widget function
//1. Create a bunch of elements | Ex: 3 divs with [id] 'cat1', 'cat2' and 'cat3'
//2. Initiate them in the body.onload() | Ex: slide('cat', 1, 3) or slide('cat', 'R', 3)
//3. Add selection function | Ex: <div class='EX' id='cat2' onclick="slide('cat', 2)"></div>
//4. Bind scroll function | Ex: <div id='nextCat' onclick="slide('cat', 'R')"></div>
//5. Set styles for given elements | Ex: .EX.slided {opacity: 0.2} ; .EX.slide {opacity: 1}
function slide(id, dir, _init) {
	// Create [slides] and slides[id] arrays if they doesn't exist
	if (typeof slides == 'undefined') { slides = {} }
	if (!slides[id] && _init) { slides[id]=[]; for (let i=0; i<(_init+1); i++) { slides[id].push(i) } }
	if (dir=='R') { // Change class for this [id] and switch to next
		if (emi(id+slides[id][0])) {
			emi(id+slides[id][0]).classList.remove("slide", "slideR", "slideL")
			emi(id+slides[id][0]).style.animation = null
			emi(id+slides[id][0]).classList.add("slided")
		}
		slides[id][0] = slides[id][0]+1
		if (emi(id+slides[id][0])) { // Change class for the new [id]
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideR")
		} else { // If next [id] doesn't exist, set index to 1 and change class
			slides[id][0] = 1
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideR")
		}
	}
	if (dir=='L') { // Change class for this [id] and switch to previous
		if (emi(id+slides[id][0])) {
			emi(id+slides[id][0]).classList.remove("slide", "slideL", "slideR")
			emi(id+slides[id][0]).style.animation = null
			emi(id+slides[id][0]).classList.add("slided")
		}
		slides[id][0] = slides[id][0]-1
		if (emi(id+slides[id][0])) { // Change class for the new [id]
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideL")
		} else { // If previous [id] doesn't exist, set index to [max] and change class
			slides[id][0] = (slides[id].length-1)
			emi(id+slides[id][0]).classList.remove("slided")
			emi(id+slides[id][0]).classList.add("slide", "slideL")
		}
	}
	// Check if [id] with [dir] index exists and change classes for this and selected [id]
	if (typeof dir=='number' && emi(id+dir)) {
		if (emi(id+slides[id][0])) {
			emi(id+slides[id][0]).classList.remove("slide", "slideR", "slideL")
			emi(id+slides[id][0]).style.animation = null
			emi(id+slides[id][0]).classList.add("slided")
		}
		slides[id][0] = dir
		emi(id+slides[id][0]).classList.remove("slided")
		emi(id+slides[id][0]).classList.add("slide")
	} //2022.11.05 :: Assigns 3 classes, clears animation states
}

// Scroll to top/bottom on call
function scroll_top(id) {
	if (id) { emi(id).scrollTop = 0 }
	else { window.scroll(0,0) }
}
function scroll_bottom(id) {
	if (id) { emi(id).scrollTop = emi(id).scrollHeight }
	else { window.scrollTo(0, document.body.scrollHeight) }
}
// Trigger a function/animation when an element is visible at a certain depth in px
function render() {
	var scr = document.querySelectorAll(".scr")
	for (var i = 0; i < scr.length; i++) {
		var windowHeight = window.innerHeight
		var elementTop = scr[i].getBoundingClientRect().top
		var elementVisible = 150
		if (elementTop < windowHeight - elementVisible) {
			scr[i].classList.add("rend")
		} else {
			scr[i].classList.remove("rend")
		}
	}
}

function init() {
	vport(
		function(){ //desktop
			pattern('fontMain', "400 2vmin 'Montserrat'")
			pattern('fontTitle', "600 3.4vmin 'Montserrat'")
			pattern('fontSub', "300 2.4vmin 'Montserrat'")
			pattern('fontBtn', "500 2.6vmin 'Montserrat'")
			pattern('fontHead', "400 1.7vmin 'Montserrat'")
			pattern('logoW', '18vw'); pattern('topM', '10vw')
			pattern('gcap', "none")
		},
		function(){ // mobile
			pattern('fontMain', "400 2vmin 'Montserrat'")
			pattern('fontTitle', "500 3.4vmin 'Montserrat'")
			pattern('fontSub', "300 2.8vmin 'Montserrat'")
			pattern('fontBtn', "500 2.6vmin 'Montserrat'")
			pattern('fontHead', "400 1.7vmin 'Montserrat'")
			pattern('logoW', '26vw'); pattern('topM', '4vw')
			pattern('gcap', "scale(0.75) translateX(-14vmin)")
		}
	)
}

// Window events
window.addEventListener('resize', function(){ init() }, false)
window.addEventListener("scroll", render); render()
