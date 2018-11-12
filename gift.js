var date = new Date(),
	show = false,
	notes = document.getElementById('notes'),
	editing = false,
	daysTillMonth, daysTillYear, a = 1, x, y,
	category = 'nature',
	morningmsg = 'Good morning Bella!<br>',
	afternoonmsg = 'Good afternoon Bella!<br>', 
	eveningmsg = 'Good evening Bella!<br>',
	hideHrt,
	texts = shuffle(
		[
			"You're amazing",
			"You can do it",
			"I'm sure you'll make it",
			"You're the best",
			"You're the absolute cutest",
			"I love you",
			"If you want a hug, all you need to do is ask",
			"Stay calm, if you plan it out it'll be okay",
			"*hug*",
			"My little slice of ham",
			"QUACK",
			"I'm honestly incredibly happy to have you",
			"If you ever want to talk about anything, I'm here"
		]),
	index = -1;

chrome.browserAction.onClicked.addListener(function(){
	var notes = document.getElementById('notes');
	if(show == false) {
		chrome.storage.local.get(null, function(items){
			if (items.note !== undefined){
				notes.value = items.note;
			}
		});
		notes.style.display = "inline";
		document.getElementById('edit').style.display = "inline";
		show = true;
	} else {
		var notes = document.getElementById('notes');
		chrome.storage.local.set({
			'note': notes.value,
			'x': x,
			'y': y
		});
		notes.style.display = "none";
		show = false;
		document.getElementById('edit').style.display = "none";
	}
});

function daysTillMeetup() {
	var month = parseInt(document.getElementById('month').value),
		day = parseInt(document.getElementById('day').value),
		between = parseInt(document.getElementById('between').value),
		firstDate = new Date(date.getFullYear(), month - 1, day),
		daysTillNext = (firstDate - date) / 1000 / 60 / 60 / 24,
		secondDate = new Date(firstDate.getTime() + between * 7 * 24 * 60 * 60 * 1000);
	if((firstDate.getTime() === firstDate.getTime()) && !(isNaN(daysTillNext)) && (daysTillNext > 0) && (secondDate.getTime() === secondDate.getTime())) {
		document.styleSheets[0].insertRule('div#meetup::before{height: 271px !important;}');
		document.getElementById('date').innerHTML = "Today is " + date.toDateString() + "<br>Your next meet-up will be on " + firstDate.toDateString() + " which is " + Math.floor(daysTillNext) + " days from now.<br>The meetup after that will be on " + secondDate.toDateString() + ".";
	}
}

function anniversary() {
	if(date < new Date(date.getFullYear(), 9, 16, 22, 21)) {
		daysTillYear = (new Date(date.getFullYear(), 9, 16, 22, 21).getTime() - date.getTime()) / 1000 / 60 / 60 / 24;
	} else {
		daysTillYear = (new Date(date.getFullYear() + 1, 9, 16, 22, 21).getTime() - date.getTime()) / 1000 / 60 / 60 / 24;
	}
	document.getElementById('anni').innerHTML = Math.floor(daysTillYear) + " days till our next anniversary!";
}

function monthaversary() {
	var monthaversary = new Date(date.getFullYear(), date.getMonth(), 16, 22, 21),
	monthaversary2 = date.getMonth() !== 11 ? new Date(date.getFullYear(), date.getMonth()+1, 16, 22, 21) : new Date(date.getFullYear()+1, 0, 17);
	if(date < monthaversary) {
		daysTillMonth = (monthaversary.getTime() - date.getTime()) / 86400000;
	} else {
		daysTillMonth = monthaversary2.getTime() - date.getTime() / 86400000;
	}
	document.getElementById('montha').innerHTML = Math.floor(daysTillMonth) + " days till our next monthaversary!" + "<br><br>We've been together for " + Math.floor(monthDiff(new Date(2017, 9, 16, 22, 21), date)) + ' months<br><br>We got together on 16 october 2017';
}

function Texts() {
	if(index < texts.length - 1) {
		++index;
		document.getElementById('texts').innerHTML = texts[index];
	} else {
		shuffle(texts);
		index = -1;
		Texts();
	}
}

function togetherFor() {
	var timeSince = date - new Date(2017, 9, 16, 22, 21),
		inYears = timeSince / 1000 / 60 / 60 / 24 / 7 / 52,
		inWeeks = timeSince / 1000 / 60 / 60 / 24 / 7,
		inDays = timeSince / 1000 / 60 / 60 / 24,
		inHours = timeSince / 1000 / 60 / 60,
		inMinutes = timeSince / 1000 / 60,
		inSeconds = timeSince / 1000;
	document.getElementById('togetherfor').innerHTML = Math.floor(inYears) + ":" + Math.floor(52*(inYears - Math.floor(inYears))) + ":" + (Math.floor(7 * (inWeeks - Math.floor(inWeeks)))+1) + ":" + Math.floor(24 * (inDays - Math.floor(inDays))) + ":" + Math.floor(60 * (inHours - Math.floor(inHours))) + ":" + Math.floor(60 * (inMinutes - Math.floor(inMinutes)));
}

function monthDiff(from, to){
	var months = to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear()));

	if(to.getDate() < from.getDate()){
	    months--;
	}
	return months;
}

function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while(0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function swap() {
	if(editing == false) {
		editing = true;
	} else {
		editing = false;
	}
}

function makeReminder(text){
	var opt = {
		type: "basic",
		title: "",
		message: text,
		iconUrl: "images/icon.png",
		eventTime: new Date().getTime() + 1
	};
	if (opt.message !== undefined && opt.message !== ""){
		chrome.notifications.create("ntf", opt);
	}
}

function hideDivs(){
	document.getElementById('cattodiv').style.display = 'none';
	document.getElementById('encouragement').style.display = 'none';
	document.getElementById('versary').style.display = 'none';
	document.getElementById('settings').style.display = 'none';
	document.getElementById('hide').style.display = 'none';
	document.getElementById('time').style.display = 'block';
	document.getElementById('buttons').style.display = 'block';
}

function getTime(){
	var hours = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours(),
	minutes = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes(),
	seconds = new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds(),
	greetingmsg;
	if((date.getDate() == 25) && (date.getMonth() == 11)){
		document.getElementById('time').innerHTML = 'Merry Christmas Bella!<br>' + hours + ":" + minutes + ":" + seconds + '<br>' + date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
		return;
	}else if ((date.getHours() >= 6) && (date.getHours() < 12)){
		greetingmsg = morningmsg;
	}else if ((date.getHours() >= 12) && (date.getHours() < 18)){
		greetingmsg = afternoonmsg;
	}else if (((date.getHours() >= 18) && (date.getHours() <= 23)) || date.getHours() == 0){
		greetingmsg = eveningmsg;
	}else{
		document.getElementById('time').innerHTML = 'You should uhh... go to sleep<br>' + hours + ":" + minutes + ":" + seconds + '<br>' + date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
		return;
	}
	document.getElementById('time').innerHTML = greetingmsg + hours + ":" + minutes + ":" + seconds + '<br>' + date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
}

function defaults(){
	morningmsg = 'Good morning Bella!<br>';
	afternoonmsg = 'Good afternoon Bella!<br>';
	eveningmsg = 'Good evening Bella!<br>';
	category = 'nature';
	chrome.storage.local.set({
		'morningmsg': morningmsg,
		'afternoonmsg': afternoonmsg,
		'eveningmsg': eveningmsg,
		'category': 'nature'
	});
}

function settings(key){
	if (key == 'msg'){
		if (document.getElementById('morning').value !== ''){
			morningmsg = document.getElementById('morning').value + '<br>';
		}
		if (document.getElementById('afternoon').value !== ''){
			afternoonmsg = document.getElementById('afternoon').value + '<br>';
		}
		if (document.getElementById('evening').value !== ''){
			eveningmsg = document.getElementById('evening').value + '<br>';
		}
		if ((document.getElementById('morning').value.length > 0) && (!document.getElementById('morning').value.replace(/\s/g, '').length)){
			morningmsg = '';
		}
		if ((document.getElementById('afternoon').value.length > 0) && (!document.getElementById('afternoon').value.replace(/\s/g, '').length)){
			afternoonmsg = '';
		}
		if ((document.getElementById('evening').value.length > 0) && (!document.getElementById('evening').value.replace(/\s/g, '').length)){
			eveningmsg = '';
		}
		chrome.storage.local.set({
			'morningmsg': morningmsg,
			'afternoonmsg': afternoonmsg,
			'eveningmsg': eveningmsg
		});
	}
}

function reload() {
	date = new Date();
	anniversary();
	monthaversary();
	togetherFor();
	getTime();
}

window.setInterval(function () {
	if(a == 1) {
		a = 0;
		chrome.storage.local.get(null, function (items) {
			console.log(items);
			if (items.hideHeart !== undefined){
				hideHrt = items.hideHeart;
				if (hideHrt){
					document.getElementById('heartimg').style.display = 'none';
				}else{
					document.getElementById('heartimg').style.display = 'inline-block';
				}
			}else{
				hideHrt = false;
				document.getElementById('heartimg').style.display = 'inline-block';
				chrome.storage.local.set({'hideHeart': false});
			}
			if(!chrome.runtime.error) {
				if (items.note !== undefined){
					var notes = document.getElementById('notes');
					notes.value = items.note;
					notes.style.top = items.y + "px";
					notes.style.left = items.x + "px";
				}
				if (navigator.onLine){
					if (typeof items.category !== 'undefined'){
						document.getElementById('body').style.backgroundImage = 'url(https://placeimg.com/640/480/' + items.category + '?t=' + new Date().getTime() + ')';
					}else{
						document.getElementById('body').style.backgroundImage = 'url(https://placeimg.com/640/480/nature?t=' + new Date().getTime() + ')';
					}
				}else{
					document.getElementById('body').style.backgroundImage = 'url(images/bg.jpg)';
					document.getElementById('nocatto').innerHTML = 'No catto available! Check your connection!';
					document.getElementById('CATTO').style.display = 'none';
				}
				if (typeof items.morningmsg !== 'undefined'){
					morningmsg = items.morningmsg;
				}
				if (typeof items.afternoonmsg !== 'undefined'){
					afternoonmsg = items.afternoonmsg;
				}
				if (typeof items.eveningmsg !== 'undefined'){
					eveningmsg = items.eveningmsg;
				}

			}
		});
		var notes = document.getElementById('notes');
		document.getElementById('Texts').addEventListener('click', function () {
			Texts();
		});
		document.getElementById('submit').addEventListener('click', function () {
			daysTillMeetup();
		});
		document.getElementById('edit').addEventListener('click', function () {
			swap();
		});
		document.getElementById('save').addEventListener('click', function(){
			settings('msg');
		});
		document.getElementById('default').addEventListener('click', function(){
			defaults();
		});
		document.getElementById('animals').addEventListener('click', function(){
			category = 'animals';
			chrome.storage.local.set({'category': 'animals'});
		});
		document.getElementById('arch').addEventListener('click', function(){
			category = 'arch';
			chrome.storage.local.set({'category': 'arch'});
		});
		document.getElementById('nature').addEventListener('click', function(){
			category = 'nature';
			chrome.storage.local.set({'category': 'nature'});
		});
		document.getElementById('people').addEventListener('click', function(){
			category = 'people';
			chrome.storage.local.set({'category': 'people'});
		});
		document.getElementById('tech').addEventListener('click', function(){
			category = 'tech';
			chrome.storage.local.set({'category': 'tech'});
		});
		document.getElementById('time').addEventListener('dblclick', function(){
			if (!hideHrt){
				document.getElementById('heartimg').style.display = 'none';
				hideHrt = true;
				chrome.storage.local.set({'hideHeart': true});
			}else{
				document.getElementById('heartimg').style.display = 'inline-block';
				hideHrt = false;
				chrome.storage.local.set({'hideHeart': false});
			}
		});
		document.getElementById('catimg').addEventListener('click', function () {
			document.getElementById('cattodiv').style.display = "inline";
			document.getElementById('hide').style.display = 'inline';
			document.getElementById('time').style.display = 'none';
			document.getElementById('buttons').style.display = 'none';
		});
		document.getElementById('cheeringimg').addEventListener('click', function () {
			document.getElementById('encouragement').style.display = "inline";
			document.getElementById('hide').style.display = 'inline';
			document.getElementById('time').style.display = 'none';
			document.getElementById('buttons').style.display = 'none';
		});
		document.getElementById('heartimg').addEventListener('click', function () {
			document.getElementById('versary').style.display = "inline";
			document.getElementById('hide').style.display = 'inline';
			document.getElementById('time').style.display = 'none';
			document.getElementById('buttons').style.display = 'none';
		});
		document.getElementById('settingsimg').addEventListener('click', function () {
			document.getElementById('settings').style.display = "inline";
			document.getElementById('hide').style.display = 'inline';
			document.getElementById('time').style.display = 'none';
			document.getElementById('buttons').style.display = 'none';
		});
		document.getElementById('hide').addEventListener('click', function(){
			hideDivs();
		});
		if (new Date().getDate() == 16){
			makeReminder("Happy Monthaversary!");
		}
	}
	if(show == true) {
		if(editing == true) {
			window.onmousedown = function (e) {
				x = e.clientX;
				y = e.clientY;
				notes.style.top = y + "px";
				notes.style.left = x + "px";
				editing = false;
				window.onmousedown = null;
			};
		} else {
			window.onmousedown = null;
		}
	}
	reload();
}, 1000);