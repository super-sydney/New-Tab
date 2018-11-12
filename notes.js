if (document.getElementById('notes') !== null){
	var notes = document.getElementById('notes');
}else{
	var notes = document.createElement('textarea');
	notes.id = 'notes';
}
if (typeof show == 'undefined'){
	var show = false;
}
notes.style.width = '25%';
notes.style.height = '50%';
notes.style.position = 'fixed';
notes.style.right = '5px';
notes.style.top = '5px';
notes.style.color = '#000';
notes.style.backgroundColor = '#ddc08DFF';
notes.style.zIndex = '100000002';
notes.spellcheck = false;
notes.placeholder = 'Type stuff in here!';
if(show == false) {
	chrome.storage.local.get(null, function(items){
		notes.value = items.note;
	});
	if (document.getElementById('notes') !== null){
		document.getElementById('notes').style.display = 'inline';
	}
	document.body.appendChild(notes);
	show = true;
} else {
	chrome.storage.local.set({'note': notes.value});
	document.getElementById('notes').style.display = "none";
	show = false;
}