const $=id=>document.getElementById(id);
let characters=[], scenes=[];
const sample=`Alex, a clever young man, meets Jessica at a quiet restaurant. They discover an old map hidden inside a book.
The next morning, Alex and Jessica follow the map toward a forest road. A storm begins as they reach the trees.
Deep in the forest, they meet Jason, who warns them that someone has been watching the road.
At an abandoned cabin, Maya reveals the map is connected to a secret that could change all their lives.`;
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderCharacters(){
 $('characters').innerHTML=characters.length?characters.map((c,i)=>`<article class="character-card">
 <div class="section-head"><h3>Character ${i+1}</h3><button class="ghost remove-char" data-i="${i}">Remove</button></div>
 <div class="grid"><div><label>Name</label><input data-field="name" data-i="${i}" value="${esc(c.name)}" placeholder="Character name"></div>
 <div><label>Age / role</label><input data-field="role" data-i="${i}" value="${esc(c.role)}" placeholder="25, brave explorer"></div></div>
 <label>Appearance & consistency notes</label><textarea data-field="description" data-i="${i}" rows="2" placeholder="Face, hair, clothes, voice, personality...">${esc(c.description)}</textarea>
 <label>Reference image</label><input type="file" accept="image/*" data-image="${i}">${c.image?'<p class="hint">Reference image added in this browser.</p>':''}
 </article>`).join(''):'<p class="hint">No characters yet. Add each main character and keep their look consistent.</p>';
}
function renderScenes(){
 $('scenes').className='scenes'+(scenes.length?'':' empty');
 $('scenes').innerHTML=scenes.length?scenes.map((s,i)=>`<article class="scene-card"><div class="scene-meta">SCENE ${String(i+1).padStart(2,'0')} · ${esc(s.location||'LOCATION TBD')}</div><h3>${esc(s.title)}</h3><p>${esc(s.summary)}</p><label>Visual direction</label><textarea data-scene="${i}" rows="2">${esc(s.visual||'Describe camera angle, lighting, action and mood...')}</textarea></article>`).join(''):'Your scenes will appear here after you create an outline.';
}
$('sampleBtn').onclick=()=>{$('story').value=sample;$('projectName').value='The Forest Mystery';$('status').textContent='Sample story loaded. Edit it or create the scene outline.'};
$('addCharacter').onclick=()=>{characters.push({name:'',role:'',description:'',image:null});renderCharacters()};
$('characters').addEventListener('input',e=>{let i=e.target.dataset.i,f=e.target.dataset.field;if(i!==undefined&&f)characters[+i][f]=e.target.value});
$('characters').addEventListener('change',e=>{if(e.target.dataset.image!==undefined){let i=+e.target.dataset.image,file=e.target.files[0];if(file){let r=new FileReader();r.onload=()=>{characters[i].image=r.result;renderCharacters()};r.readAsDataURL(file)}}});
$('characters').addEventListener('click',e=>{if(e.target.classList.contains('remove-char')){characters.splice(+e.target.dataset.i,1);renderCharacters()}});
$('makeScenes').onclick=()=>{
 const chunks=$('story').value.split(/\n+/).map(x=>x.trim()).filter(Boolean);
 if(!chunks.length){$('status').textContent='Please write a story first.';return}
 scenes=chunks.map((line,i)=>({title:line.split(/[.!?]/)[0].slice(0,65)||`Scene ${i+1}`,summary:line,location:'LOCATION TBD',visual:''}));
 renderScenes();$('status').textContent=`Created ${scenes.length} scene(s). This is a planning outline, not AI-generated video.`;
};
$('scenes').addEventListener('input',e=>{if(e.target.dataset.scene!==undefined)scenes[+e.target.dataset.scene].visual=e.target.value});
function project(){return {app:'Jarvid Studio',version:'0.1',projectName:$('projectName').value,story:$('story').value,characters:characters.map(({name,role,description})=>({name,role,description})),scenes,updatedAt:new Date().toISOString()}}
$('saveProject').onclick=()=>{localStorage.setItem('jarvid-project',JSON.stringify(project()));$('status').textContent='Project saved in this browser on this device.'};
$('exportProject').onclick=()=>{let blob=new Blob([JSON.stringify(project(),null,2)],{type:'application/json'});let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='jarvid-project.json';a.click();URL.revokeObjectURL(a.href);$('status').textContent='Project JSON exported.'};
const saved=localStorage.getItem('jarvid-project');if(saved){try{let p=JSON.parse(saved);$('projectName').value=p.projectName||'My First Film';$('story').value=p.story||'';characters=p.characters||[];scenes=p.scenes||[];renderCharacters();renderScenes();$('status').textContent='Previous local project restored.'}catch{}}
renderCharacters();renderScenes();
