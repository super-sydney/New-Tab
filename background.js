chrome.browserAction.onClicked.addListener(function(){chrome.tabs.executeScript({code:"if(null!==document.getElementById('notes'))var notes=document.getElementById('notes');else{var notes=document.createElement('p');notes.id='notes'}if('undefined'==typeof show)var show=!1;notes.style.width='25%',notes.style.height='50%',notes.style.position='fixed',notes.style.right='5px',notes.style.top='5px',notes.style.color='#000',notes.style.backgroundColor='#ddc08DFF',notes.style.zIndex='100000002',notes.spellcheck=!1,notes.placeholder='Type stuff in here!',!1==show?(chrome.storage.local.get(null,function(b){notes.value=b.note}),null!==document.getElementById('notes')&&(document.getElementById('notes').style.display='inline'),document.body.appendChild(notes),show=!0):(chrome.storage.local.set({note:notes.value}),document.getElementById('notes').style.display='none',show=!1);"})});