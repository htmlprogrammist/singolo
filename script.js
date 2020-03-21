<<<<<<< HEAD
const iphoneVert = document.getElementById('iphone_vert');
const blackScreenVert = document.getElementById('vert');
const iphoneHor = document.getElementById('iphone_hor');
const blackScreenHor = document.getElementById('hor');

iphoneVert.addEventListener('click', (event) => {

	blackScreenVert.classList.contains('on') ?
		blackScreenVert.classList.remove('on') :
		blackScreenVert.classList.add('on');

})

blackScreenVert.addEventListener('click', (event) => {

	blackScreenVert.classList.contains('on') ?
		blackScreenVert.classList.remove('on') :
		blackScreenVert.classList.add('on');

})


iphoneHor.addEventListener('click', (event) => {

	blackScreenHor.classList.contains('on') ?
		blackScreenHor.classList.remove('on') :
		blackScreenHor.classList.add('on');

})

blackScreenHor.addEventListener('click', (event) => {

	blackScreenHor.classList.contains('on') ?
		blackScreenHor.classList.remove('on') :
		blackScreenHor.classList.add('on');

})


// Slider
let items = document.querySelectorAll('.slider .item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {   
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.back').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.forward').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});


document.addEventListener('scroll', onScroll);    

function onScroll(event) {

	const curPos = window.scrollY;
	const divs = document.querySelectorAll('.wrapper>div'); 
	const links = document.querySelectorAll('#menu a');
	
	divs.forEach((el) => {
		
		if(el.offsetTop <= curPos + 95  && (el.offsetTop + el.offsetHeight) > curPos) {
			links.forEach((a) => {
				a.classList.remove('selected');
				
				if(el.getAttribute('id') === a.getAttribute('href').substring(1)) {
					a.classList.add('selected');
					
				}
				
			})
		}
	})

}



// Portfolio


const port = document.getElementById('port_li');
const port2 = document.getElementById('portfolio');

const all = document.getElementById('all');
const web  = document.getElementById('web');
const graphic = document.getElementById('graphic');
const art = document.getElementById('art');

const picture1 = document.getElementById('picture1');
const picture2 = document.getElementById('picture2');
const picture3 = document.getElementById('picture3');

port.addEventListener('click', (event) => { 
	  
    port.querySelectorAll('li').forEach(el => el.classList.remove('a_selected'));
	event.target.classList.add('a_selected');
	
	if(all.classList.contains('a_selected')) {
		
		port2.querySelectorAll('div').forEach(el => el.classList.remove('order'))
	}	

	if(web.classList.contains('a_selected')) {
		port2.querySelectorAll('div').forEach(el => el.classList.remove('order'))
		picture1.classList.add('order');

	}

	if(graphic.classList.contains('a_selected')) {
		port2.querySelectorAll('div').forEach(el => el.classList.remove('order'));
		picture1.classList.add('order');
		picture2.classList.add('order');
	}

	if(art.classList.contains('a_selected')) {
		port2.querySelectorAll('div').forEach(el => el.classList.remove('order'));
		picture1.classList.add('order');
		picture2.classList.add('order');
		picture3.classList.add('order');
	}

})


const addBorder = document.getElementById('photo');



addBorder.addEventListener('click', (event) => {
	
	if(!event.target.id) {
		if(event.target.classList.contains('port_border')) {
			addBorder.querySelectorAll('img').forEach(el => el.classList.remove('port_border'))
		} else {
			addBorder.querySelectorAll('img').forEach(el => el.classList.remove('port_border'));
			event.target.classList.add('port_border');}
			}
})



const btn = document.getElementById('submit');
const close_btn = document.getElementById('close-btn');
const message_block = document.getElementById('message-block');


btn.addEventListener('click', (event) => {
	let requiredFields = [...document.querySelectorAll("[required]")];
	
	let isValid = node => node.checkValidity();
	
	if(requiredFields.every(isValid)) {
		event.preventDefault();
		const subject = document.getElementById('subject').value.toString();
		const description = document.getElementById('description').value.toString();
		
		subject == '' ?
		document.getElementById('subj-res').innerText = 'Без темы' :
		document.getElementById('subj-res').innerText = 'Тема: ' + subject;

		description == '' ?
		document.getElementById('des-res').innerText = 'Без описания' :
		document.getElementById('des-res').innerText = 'Описание: ' + description;
		

		message_block.classList.remove('hidden');
	}
});

close_btn.addEventListener('click', () => {
	event.preventDefault();
	document.getElementById('subject').innerText = '';
	message_block.classList.add('hidden');
	document.getElementById('form').reset();
});
=======
// new file
>>>>>>> 4e77407d688886cceec51a689df67d2f83476f3d
