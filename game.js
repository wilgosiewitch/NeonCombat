const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOver');
const finalStats = document.getElementById('finalStats');
const shopScreen = document.getElementById('shopScreen');
const shopEnergy = document.getElementById('shopEnergy');
const turretHpUpgrade = document.getElementById('turretHpUpgrade');
const damageUpgrade = document.getElementById('damageUpgrade');
const regenUpgrade = document.getElementById('regenUpgrade');
const ultraTurretUpgrade = document.getElementById('ultraTurretUpgrade');
const fireTrailUpgrade = document.getElementById('fireTrailUpgrade');
const rapidFireUpgrade = document.getElementById('rapidFireUpgrade');
const dualShotUpgrade = document.getElementById('dualShotUpgrade');
const playerHpUpgrade = document.getElementById('playerHpUpgrade');
let language='pl';
const translations={
  pl:{sector:'ARENA // SEKTOR 07',move:'ruch',mouse:'MYSZ',aim:'cel',lmb:'LPM',shoot:'strzał',space:'SPACJA',turret:'wieżyczka',ability:'zdolność',shop:'sklep',transmission:'TRANSMISJA PRZECHWYCONA',hero:'Przetrwaj.<br><em>Zniszcz ich.</em>',intro:'Wrogie jednostki namierzyły twoją pozycję. Pozostań w ruchu, unikaj pocisków i oczyść kolejne fale.',role_medic:'TECHNIK',desc_medic:'[E] Naprawia wieżyczkę co 10 s',desc_tank:'+25 punktów zdrowia',role_billionaire:'MILIARDER',desc_billionaire:'500 energii • zarobki ×2',role_assassin:'ASSASYN',desc_assassin:'75 HP • obrażenia ×2 • szybkość ×1,5',role_ghost:'DUCH',desc_ghost:'[E] Niewidzialność na 7 s',desc_manipulator:'3 pociski przejęcia • +1 co 10 s',role_engineer:'INŻYNIER',desc_engineer:'[E] Pułapka • maks. 10',desc_ninja:'[E] Odbija pociski przez 13 s',role_madman:'SZALENIEC',desc_madman:'Podwójny strzał • [E] wybuch',start:'WEJDŹ NA ARENĘ',signal_lost:'SYGNAŁ UTRACONY',game_over:'KONIEC <em>GRY</em>',retry:'SPRÓBUJ PONOWNIE',paused:'CZAS WSTRZYMANY // MAGAZYN',shop_title:'SKLEP',upgrade_title:'WZMOCNIONY PANCERZ',upgrade_desc:'Wszystkie wieżyczki otrzymują dwukrotnie więcej HP.',damage_title:'PRZECIĄŻONA BROŃ',damage_desc:'Postać zadaje dwukrotnie więcej obrażeń.',regen_title:'NANOREGENERACJA',regen_desc:'Odnawia 1 punkt zdrowia na sekundę.',return:'WRÓĆ DO WALKI',protocol:'PROTOKÓŁ: OSTATNI OCALAŁY',online:'SYSTEM ONLINE'},
  en:{sector:'ARENA // SECTOR 07',move:'move',mouse:'MOUSE',aim:'aim',lmb:'LMB',shoot:'shoot',space:'SPACE',turret:'turret',ability:'ability',shop:'shop',transmission:'TRANSMISSION INTERCEPTED',hero:'Survive.<br><em>Destroy them.</em>',intro:'Enemy units have located your position. Keep moving, dodge incoming fire, and clear each wave.',role_medic:'TECHNICIAN',desc_medic:'[E] Repairs a turret every 10s',desc_tank:'+25 maximum health',role_billionaire:'BILLIONAIRE',desc_billionaire:'500 energy • earnings ×2',role_assassin:'ASSASSIN',desc_assassin:'75 HP • damage ×2 • speed ×1.5',role_ghost:'GHOST',desc_ghost:'[E] Invisible for 7s',desc_manipulator:'3 control shots • +1 every 10s',role_engineer:'ENGINEER',desc_engineer:'[E] Trap • maximum 10',desc_ninja:'[E] Reflects projectiles for 13s',role_madman:'MADMAN',desc_madman:'Double shot • [E] explosion',start:'ENTER THE ARENA',signal_lost:'SIGNAL LOST',game_over:'GAME <em>OVER</em>',retry:'TRY AGAIN',paused:'TIME PAUSED // ARMORY',shop_title:'SHOP',upgrade_title:'REINFORCED ARMOR',upgrade_desc:'All turrets receive twice as much HP.',damage_title:'OVERCHARGED WEAPON',damage_desc:'The character deals twice as much damage.',regen_title:'NANOREGENERATION',regen_desc:'Restores 1 health point per second.',return:'RETURN TO BATTLE',protocol:'PROTOCOL: LAST SURVIVOR',online:'SYSTEM ONLINE'}
};
translations.pl.change_character='WYBIERZ POSTAĆ';
translations.en.change_character='CHOOSE CHARACTER';
translations.pl.ultra_turret_title='ULTRA DZIAŁKO';
translations.pl.ultra_turret_desc='Niezniszczalne • 5 pocisków na sekundę • pojawia się przy graczu.';
translations.en.ultra_turret_title='ULTRA TURRET';
translations.en.ultra_turret_desc='Indestructible • 5 shots per second • appears at the player.';
translations.pl.fire_trail_title='TOR OGNIA';
translations.pl.fire_trail_desc='Gracz stale zostawia za sobą ogień zadający obrażenia przeciwnikom.';
translations.en.fire_trail_title='FIRE TRAIL';
translations.en.fire_trail_desc='The player constantly leaves a trail of fire that damages enemies.';
translations.pl.rapid_fire_title='HIPERNAPĘD BRONI';
translations.pl.rapid_fire_desc='Gracz i wszystkie wieżyczki strzelają szybciej, a ich pociski mają większą prędkość.';
translations.en.rapid_fire_title='WEAPON HYPERDRIVE';
translations.en.rapid_fire_desc='The player and all turrets fire faster, and their projectiles travel at greater speed.';
translations.pl.dual_shot_title='DWUSTRONNY OSTRZAŁ';
translations.pl.dual_shot_desc='Postać strzela jednocześnie do przodu i do tyłu.';
translations.en.dual_shot_title='TWO-WAY FIRE';
translations.en.dual_shot_desc='The character fires forward and backward at the same time.';
translations.pl.role_electrician='ELEKTRYK';
translations.pl.desc_electrician='Trafienia przeskakują między pobliskimi wrogami';
translations.en.role_electrician='ELECTRICIAN';
translations.en.desc_electrician='Hits chain between nearby enemies';
translations.pl.player_hp_title='WZMOCNIENIE ORGANIZMU';
translations.pl.player_hp_desc='Zwiększa maksymalne zdrowie aktualnej klasy o 50 punktów.';
translations.en.player_hp_title='ARMOR BOOST';
translations.en.player_hp_desc='Increases the current class maximum health by 50 points.';
translations.pl.role_catclaw='KOCI PAZUR';
translations.pl.desc_catclaw='Ruch ×1,25 • Kliknij wroga • [E] Skok co 7 s';
translations.en.role_catclaw='CAT CLAW';
translations.en.desc_catclaw='Movement ×1.25 • Click an enemy • [E] Leap every 7s';
translations.pl.role_assault='SZTURMOWIEC';
translations.pl.desc_assault='85 HP • szybkostrzelność ×1,5 • [E] Zmiana broni';
translations.en.role_assault='ASSAULT TROOPER';
translations.en.desc_assault='85 HP • fire rate ×1.5 • [E] Switch weapon';
const tr=(pl,en)=>language==='pl'?pl:en;
function setLanguage(next){language=next;document.documentElement.lang=next;document.querySelectorAll('[data-i18n]').forEach(el=>el.innerHTML=translations[next][el.dataset.i18n]);document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===next));}

const W = 1280, H = 720, WORLD_W = 3400, WORLD_H = 2400;
const keys = {}, mouse = { x: W/2, y:H/2, down:false };
let player, bullets, enemies, particles, explosions, enemyBullets, pickups, obstacles, turrets, traps, lightningEffects, catLaserEffects, camera, score, credits, wave, kills, running, last, spawnTimer, eliteRespawn, bossTriggered, bossSpawnTimer, bossSpawnPoint, bossPurgeTimer, bossFightActive, shake, flash, notice, noticeTime, visualTime;
let spaceDashQueued = false;
let turretQueued = false;
let healQueued = false, chosenRole = 'medic';
let shopOpen = false;
let turretHpMultiplier = 1;
let playerDamageMultiplier = 1, healthRegen = false;
let ultraTurretPurchased = false;
let fireTrailPurchased = false, fireTrail, fireTrailSpawn;
let rapidFirePurchased = false;
let dualShotPurchased = false;
let playerHpPurchased = false;
let catTarget = null;
const TURRET_COST = 120;

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const rand=(a,b)=>a+Math.random()*(b-a);
const energyReward=amount=>amount*(chosenRole==='billionaire'?2:1);
function pointSegmentDist(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,l=dx*dx+dy*dy;const t=clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/l,0,1);return Math.hypot(p.x-(a.x+t*dx),p.y-(a.y+t*dy))}
const circleRect=(o,r,w)=>{
  const nearestX=clamp(o.x,w.x,w.x+w.w),nearestY=clamp(o.y,w.y,w.y+w.h);
  return Math.hypot(o.x-nearestX,o.y-nearestY)<r;
};
const blocked=(o,r)=>obstacles.some(w=>circleRect(o,r,w));
function segmentHitsRect(a,b,w,padding=4){
  const minX=w.x-padding,maxX=w.x+w.w+padding,minY=w.y-padding,maxY=w.y+w.h+padding;
  const dx=b.x-a.x,dy=b.y-a.y;let enter=0,exit=1;
  for(const [start,delta,min,max] of [[a.x,dx,minX,maxX],[a.y,dy,minY,maxY]]){
    if(Math.abs(delta)<.0001){if(start<min||start>max)return false;continue}
    let t1=(min-start)/delta,t2=(max-start)/delta;if(t1>t2)[t1,t2]=[t2,t1];
    enter=Math.max(enter,t1);exit=Math.min(exit,t2);if(enter>exit)return false;
  }
  return true;
}
const hasLineOfSight=(a,b)=>!obstacles.some(w=>segmentHitsRect(a,b,w));
function moveBody(o,vx,vy,r,dt){
  const oldX=o.x; o.x=clamp(o.x+vx*dt,r+24,WORLD_W-r-24); if(blocked(o,r))o.x=oldX;
  const oldY=o.y; o.y=clamp(o.y+vy*dt,r+24,WORLD_H-r-24); if(blocked(o,r))o.y=oldY;
}

function reset(){
  spaceDashQueued=false;turretQueued=false;healQueued=false;catTarget=null;
  shopOpen=false;turretHpMultiplier=1;playerDamageMultiplier=1;healthRegen=false;ultraTurretPurchased=false;fireTrailPurchased=false;rapidFirePurchased=false;dualShotPurchased=false;playerHpPurchased=false;shopScreen.classList.add('hidden');
  const maxHp=chosenRole==='tank'?125:chosenRole==='assassin'?75:chosenRole==='assault'?85:100;
  player={x:WORLD_W/2,y:WORLD_H/2,r:17,hp:maxHp,maxHp,speed:chosenRole==='assassin'?390:chosenRole==='catclaw'?325:260,angle:0,moveX:1,moveY:0,fire:0,dash:0,inv:0,heal:0,invisible:0,ghostCooldown:0,manipulateCooldown:10,manipulateCharges:3,manipulateReady:false,traps:10,trapRecharge:10,reflect:0,ninjaCooldown:0,madmanCooldown:0,catCooldown:0,assaultWeapon:'default',assaultSwitch:0,shotgunCooldown:0};
  bullets=[]; enemies=[]; particles=[];explosions=[]; enemyBullets=[]; pickups=[];turrets=[];traps=[];lightningEffects=[];catLaserEffects=[];fireTrail=[];fireTrailSpawn=0;
  camera={x:player.x-W/2,y:player.y-H/2};
  obstacles=[
    {x:1260,y:880,w:230,h:90},{x:1870,y:850,w:270,h:100},{x:1530,y:570,w:110,h:240},
    {x:1540,y:1450,w:320,h:95},{x:920,y:1230,w:100,h:300},{x:2330,y:1160,w:110,h:330},
    {x:550,y:540,w:300,h:90},{x:2600,y:480,w:270,h:90},{x:500,y:1800,w:340,h:100},
    {x:2580,y:1800,w:330,h:100},{x:1120,y:1930,w:100,h:260},{x:2110,y:1900,w:100,h:280},
    {x:250,y:1050,w:260,h:85},{x:2920,y:1160,w:250,h:85}
  ];
  score=0;credits=chosenRole==='billionaire'?500:0; wave=1; kills=0; spawnTimer=.4;eliteRespawn=5;bossTriggered=false;bossSpawnTimer=0;bossSpawnPoint=null;bossPurgeTimer=0;bossFightActive=false; shake=0; flash=0;notice='';noticeTime=0;visualTime=0; last=performance.now();
}

function beginBossArrival(){
  bossTriggered=true;
  let best=null,bestDistance=-1;
  for(let i=0;i<60;i++){
    const p={x:rand(140,WORLD_W-140),y:rand(140,WORLD_H-140)};
    if(blocked(p,70))continue;
    const nearest=Math.min(dist(p,player),...turrets.map(t=>dist(p,t)));
    if(nearest>bestDistance){best=p;bestDistance=nearest}
  }
  bossSpawnPoint=best||{x:WORLD_W/2,y:WORLD_H/2};bossSpawnTimer=4;
  notice=tr('UWAGA: WYKRYTO ANOMALIĘ','WARNING: ANOMALY DETECTED');noticeTime=3;shake=12;
}

function spawnBoss(){
  const p=bossSpawnPoint||{x:WORLD_W/2,y:WORLD_H/2};
  enemies.push({x:p.x,y:p.y,r:48,hp:250,maxHp:250,speed:0,shoot:99,laserAngle:0,closeBeam:0,closeCooldown:0,closeAngle:0,angle:0,tank:false,elite:false,boss:true,hit:0});
  bossSpawnTimer=0;bossSpawnPoint=null;bossPurgeTimer=3;bossFightActive=true;notice=tr('ALARM: CZERWONY TYTAN','ALERT: RED TITAN');noticeTime=3;shake=28;
}

function edgePosition(){
  const side=Math.floor(Math.random()*4);let x,y;
  if(side===0){x=rand(camera.x,camera.x+W);y=camera.y-35}if(side===1){x=camera.x+W+35;y=rand(camera.y,camera.y+H)}
  if(side===2){x=rand(camera.x,camera.x+W);y=camera.y+H+35}if(side===3){x=camera.x-35;y=rand(camera.y,camera.y+H)}
  return{x:clamp(x,35,WORLD_W-35),y:clamp(y,35,WORLD_H-35)};
}

function spawnElite(){
  const pos=edgePosition();if(blocked(pos,30)){eliteRespawn=.3;return}
  enemies.push({...pos,r:29,hp:10,maxHp:10,speed:105,shoot:1,dodge:0,angle:0,tank:false,elite:true,hit:0});
  notice=tr('FIOLETOWY ŁOWCA NA MAPIE','PURPLE HUNTER ON THE MAP');noticeTime=2;
}

function useRoleAbility(){
  healQueued=false;
  if(chosenRole==='assault'){
    if(player.assaultSwitch>0){notice=tr(`ZMIANA MOŻLIWA ZA ${player.assaultSwitch.toFixed(1)} S`,`SWITCH READY IN ${player.assaultSwitch.toFixed(1)}S`);noticeTime=1;return}
    player.assaultWeapon=player.assaultWeapon==='default'?'shotgun':'default';player.assaultSwitch=.5;
    notice=player.assaultWeapon==='shotgun'?tr('BROŃ: SHOTGUN','WEAPON: SHOTGUN'):tr('BROŃ: DOMYŚLNA','WEAPON: DEFAULT');noticeTime=1.2;return;
  }
  if(chosenRole==='catclaw'){
    if(player.catCooldown>0){notice=tr(`SKOK GOTOWY ZA ${Math.ceil(player.catCooldown)} S`,`LEAP READY IN ${Math.ceil(player.catCooldown)}S`);noticeTime=1.3;return}
    if(!catTarget||catTarget.hp<=0||catTarget.friendly){catTarget=null;notice=tr('NAJPIERW KLIKNIJ PRZECIWNIKA','CLICK AN ENEMY FIRST');noticeTime=1.5;return}
    if(catTarget.boss){notice=tr('CZERWONY TYTAN JEST ODPORNY','RED TITAN IS IMMUNE');noticeTime=1.7;burst(catTarget.x,catTarget.y,'#ff193d',8);return}
    const origin={x:catTarget.x,y:catTarget.y},victim=catTarget;catTarget=null;
    player.x=origin.x;player.y=origin.y;player.inv=.45;player.catCooldown=7;victim.hp=0;rewardChainedDefeat(victim);
    for(let i=0;i<8;i++){const angle=i*Math.PI/4;catLaserEffects.push({x:origin.x,y:origin.y,angle,life:.18,max:.18})}
    enemies.forEach(e=>{
      if(e===victim||e.hp<=0||e.friendly||e.boss)return;
      const struck=catLaserEffects.some(l=>pointSegmentDist(e,origin,{x:origin.x+Math.cos(l.angle)*4200,y:origin.y+Math.sin(l.angle)*4200})<e.r+10);
      if(struck){e.hp=0;rewardChainedDefeat(e)}
    });
    shake=16;flash=.08;burst(origin.x,origin.y,'#ff405d',20);notice=tr('KOCI PAZUR: OSTRZAŁ ×8','CAT CLAW: EIGHT-WAY BLAST');noticeTime=1.6;return;
  }
  if(chosenRole==='madman'){
    if(player.madmanCooldown>0){notice=tr(`WYBUCH GOTOWY ZA ${Math.ceil(player.madmanCooldown)} S`,`EXPLOSION READY IN ${Math.ceil(player.madmanCooldown)}S`);noticeTime=1.3;return}
    player.madmanCooldown=8;let defeated=0;
    enemies.forEach(e=>{
      if(e.hp<=0||e.friendly||dist(e,player)>185)return;
      e.hp-=15*playerDamageMultiplier;e.hit=.15;burst(e.x,e.y,'#ff9d3d',12);
      if(e.hp<=0){defeated++;credits+=energyReward(e.boss?500:e.elite?150:e.tank?60:30);score+=e.boss?3000:e.elite?750:e.tank?300:100;kills++;if(e.elite)eliteRespawn=20;if(e.boss){bossFightActive=false;bossPurgeTimer=0;spawnTimer=.25;eliteRespawn=1}}
    });
    shake=24;flash=.12;explosions.push({x:player.x,y:player.y,life:.65,max:.65,radius:185});burst(player.x,player.y,'#fff3b0',35);burst(player.x,player.y,'#ff9d3d',55);burst(player.x,player.y,'#ff405d',25);notice=defeated?tr(`WYBUCH: POKONANO ${defeated}`,`EXPLOSION: DEFEATED ${defeated}`):tr(`WYBUCH: ${15*playerDamageMultiplier} OBRAŻEŃ`,`EXPLOSION: ${15*playerDamageMultiplier} DAMAGE`);noticeTime=1.4;return;
  }
  if(chosenRole==='ninja'){
    if(player.ninjaCooldown>0){notice=tr(`ODBICIE GOTOWE ZA ${Math.ceil(player.ninjaCooldown)} S`,`REFLECTION READY IN ${Math.ceil(player.ninjaCooldown)}S`);noticeTime=1.3;return}
    player.reflect=13;player.ninjaCooldown=10;notice=tr('NINJA: ODBICIE AKTYWNE','NINJA: REFLECTION ACTIVE');noticeTime=1.5;burst(player.x,player.y,'#e8f7ff',24);return;
  }
  if(chosenRole==='engineer'){
    if(player.traps<=0){notice=tr(`BRAK PUŁAPEK — NOWA ZA ${Math.ceil(player.trapRecharge)} S`,`NO TRAPS — NEXT IN ${Math.ceil(player.trapRecharge)}S`);noticeTime=1.3;return}
    const pos={x:mouse.x+camera.x,y:mouse.y+camera.y};
    if(pos.x<35||pos.x>WORLD_W-35||pos.y<35||pos.y>WORLD_H-35||blocked(pos,24)){notice=tr('NIE MOŻNA TU POSTAWIĆ PUŁAPKI','CANNOT PLACE A TRAP HERE');noticeTime=1.3;return}
    if(traps.some(t=>dist(t,pos)<48)){notice=tr('WYBIERZ MIEJSCE DALEJ OD INNEJ PUŁAPKI','PLACE IT FARTHER FROM ANOTHER TRAP');noticeTime=1.3;return}
    if(player.traps===10)player.trapRecharge=10;
    player.traps--;traps.push({x:pos.x,y:pos.y,r:24,arm:.45,phase:0});burst(pos.x,pos.y,'#ffd84d',16);notice=tr('PUŁAPKA UZBROJONA','TRAP ARMED');noticeTime=1.2;return;
  }
  if(chosenRole==='manipulator'){
    if(player.manipulateReady){notice=tr('POCISK PRZEJĘCIA JUŻ GOTOWY','CONTROL PROJECTILE ALREADY READY');noticeTime=1.2;return}
    if(player.manipulateCharges<=0){notice=tr(`BRAK POCISKÓW — NOWY ZA ${Math.ceil(player.manipulateCooldown)} S`,`NO CONTROL SHOTS — NEXT IN ${Math.ceil(player.manipulateCooldown)}S`);noticeTime=1.3;return}
    player.manipulateReady=true;notice=tr('NASTĘPNY STRZAŁ PRZEJMIE WROGA','NEXT SHOT WILL CONTROL AN ENEMY');noticeTime=1.6;return;
  }
  if(chosenRole==='ghost'){
    if(player.ghostCooldown>0){notice=tr(`NIEWIDZIALNOŚĆ GOTOWA ZA ${Math.ceil(player.ghostCooldown)} S`,`INVISIBILITY READY IN ${Math.ceil(player.ghostCooldown)}S`);noticeTime=1.3;return}
    player.invisible=7;player.ghostCooldown=20;notice=tr('DUCH: NIEWIDZIALNOŚĆ AKTYWNA','GHOST: INVISIBILITY ACTIVE');noticeTime=1.5;burst(player.x,player.y,'#b9d7ff',24);return;
  }
  if(chosenRole!=='medic')return;
  if(player.heal>0){notice=tr(`NAPRAWA GOTOWA ZA ${Math.ceil(player.heal)} S`,`REPAIR READY IN ${Math.ceil(player.heal)}S`);noticeTime=1.2;return}
  const pos={x:mouse.x+camera.x,y:mouse.y+camera.y};
  let target=null,best=65;turrets.forEach(t=>{const d=dist(t,pos);if(d<best){best=d;target=t}});
  if(!target){notice=tr('WSKAŻ KURSOREM WIEŻYCZKĘ','POINT AT A TURRET');noticeTime=1.3;return}
  target.hp=target.maxHp;player.heal=10;burst(target.x,target.y,'#58ffd1',25);notice=tr('WIEŻYCZKA NAPRAWIONA','TURRET REPAIRED');noticeTime=1.3;
}

function placeTurret(){
  turretQueued=false;
  const x=mouse.x+camera.x,y=mouse.y+camera.y,pos={x,y};
  if(turrets.filter(t=>t.hp>0&&!t.ultra).length>=11){notice=tr('LIMIT 11 WIEŻYCZEK OSIĄGNIĘTY','11 TURRET LIMIT REACHED');noticeTime=1.5;return}
  if(credits<TURRET_COST){notice=tr(`ZA MAŁO ENERGII — POTRZEBA ${TURRET_COST}`,`NOT ENOUGH ENERGY — NEED ${TURRET_COST}`);noticeTime=1.5;return}
  if(x<45||x>WORLD_W-45||y<45||y>WORLD_H-45||blocked(pos,23)||turrets.some(t=>dist(t,pos)<65)){
    notice=tr('NIE MOŻNA TU POSTAWIĆ WIEŻYCZKI','CANNOT PLACE A TURRET HERE');noticeTime=1.5;return;
  }
  const turretHp=10*turretHpMultiplier;
  credits-=TURRET_COST;turrets.push({x,y,r:21,hp:turretHp,maxHp:turretHp,hit:0,angle:0,fire:.15,range:430});
  burst(x,y,'#58ffd1',22);notice=tr('WIEŻYCZKA AKTYWNA','TURRET ONLINE');noticeTime=1.2;
  if(turrets.filter(t=>t.hp>0&&!t.ultra).length>10&&!bossTriggered)beginBossArrival();
}

function spawnEnemy(){
  let{x,y}=edgePosition();
  if(blocked({x,y},28)){spawnTimer=.15;return}
  const tank=Math.random()<Math.min(.08+wave*.015,.28);
  enemies.push({x,y,r:tank?25:18,hp:tank?5:2,maxHp:tank?5:2,speed:tank?rand(55,75):rand(75,115)+Math.min(wave,25)*1.3,shoot:rand(.5,1.8),angle:0,tank,hit:0});
}

function burst(x,y,color,n=10){
  for(let i=0;i<n;i++){const a=rand(0,Math.PI*2),s=rand(40,220);particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:rand(.15,.55),max:.55,color,size:rand(2,5)})}
}

function rewardChainedDefeat(e){
  credits+=energyReward(e.boss?500:e.elite?150:e.tank?60:30);score+=e.boss?3000:e.elite?750:e.tank?300:100;kills++;
  if(e.elite)eliteRespawn=20;
  if(e.boss){bossFightActive=false;bossPurgeTimer=0;spawnTimer=.25;eliteRespawn=1;notice=tr('TYTAN POKONANY — FALE WZNOWIONE','TITAN DEFEATED — WAVES RESUMED');noticeTime=3}
  burst(e.x,e.y,e.boss?'#ff193d':e.elite?'#b858ff':e.tank?'#ff9d3d':'#ff405d',e.boss?30:e.elite?18:e.tank?12:8);
  if(Math.random()<.1)pickups.push({x:e.x,y:e.y,r:10,life:8,phase:0});
}

function chainLightning(firstTarget,damage){
  const visited=new Set([firstTarget]);let current=firstTarget;
  while(true){
    let next=null,best=220;
    enemies.forEach(candidate=>{const d=dist(current,candidate);if(candidate.hp>0&&!candidate.friendly&&!visited.has(candidate)&&d<best){best=d;next=candidate}});
    if(!next)break;
    lightningEffects.push({x1:current.x,y1:current.y,x2:next.x,y2:next.y,life:.14,max:.14});
    visited.add(next);next.hp-=damage;next.hit=.1;score+=20;burst(next.x,next.y,'#79ddff',2);
    if(next.hp<=0)rewardChainedDefeat(next);
    current=next;
  }
}

function update(dt){
  if(!running||shopOpen)return;
  visualTime+=dt;
  fireTrailSpawn-=dt;
  if(fireTrailPurchased&&fireTrailSpawn<=0){
    fireTrailSpawn=.18;
    fireTrail.push({x:player.x-player.moveX*16,y:player.y-player.moveY*16,r:22,life:1.4,max:1.4,phase:rand(0,Math.PI*2)});
  }
  fireTrail.forEach(f=>{f.life-=dt;f.phase+=dt*7});
  if(healthRegen&&player.hp>0)player.hp=Math.min(player.maxHp,player.hp+dt);
  player.fire-=dt; player.dash-=dt; player.inv-=dt;player.heal-=dt;player.invisible-=dt;player.ghostCooldown-=dt;player.reflect-=dt;player.ninjaCooldown-=dt;player.madmanCooldown-=dt;player.catCooldown-=dt;player.assaultSwitch-=dt;player.shotgunCooldown-=dt; flash-=dt;noticeTime-=dt; shake*=.88;
  if(chosenRole==='engineer'&&player.traps<10){player.trapRecharge-=dt;if(player.trapRecharge<=0){player.traps++;player.trapRecharge=10;notice=tr(`ODNOWIONO PUŁAPKĘ — ${player.traps} / 10`,`TRAP RESTORED — ${player.traps} / 10`);noticeTime=1.1}}
  if(chosenRole==='manipulator'&&player.manipulateCharges<3){player.manipulateCooldown-=dt;if(player.manipulateCooldown<=0){player.manipulateCharges++;player.manipulateCooldown=10;notice=tr(`ODNOWIONO POCISK — ${player.manipulateCharges} / 3`,`CONTROL SHOT RESTORED — ${player.manipulateCharges} / 3`);noticeTime=1.1}}
  if(bossSpawnTimer>0){bossSpawnTimer-=dt;if(bossSpawnTimer<=0)spawnBoss()}
  if(bossPurgeTimer>0){bossPurgeTimer-=dt;if(bossPurgeTimer<=0){enemies.filter(e=>!e.boss).forEach(e=>burst(e.x,e.y,'#ff405d',10));enemies=enemies.filter(e=>e.boss);enemyBullets=[];notice=tr('ARENA ZAMKNIĘTA — WALKA Z BOSSEM','ARENA LOCKED — BOSS FIGHT');noticeTime=2}}
  if(turretQueued)placeTurret();
  if(healQueued)useRoleAbility();
  let dx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0);
  let dy=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);
  const len=Math.hypot(dx,dy)||1, forwardDash=spaceDashQueued&&player.dash<=0;
  if(dx||dy){ player.moveX=dx/len; player.moveY=dy/len; }
  if(forwardDash){
    spaceDashQueued=false;
    player.dash=1.4; player.inv=.22;
    for(let i=0;i<5;i++)moveBody(player,player.moveX*23,player.moveY*23,player.r,1);
    burst(player.x,player.y,'#c8ff3d',18);
  }
  const speed=player.speed;
  moveBody(player,dx/len*speed,dy/len*speed,player.r,dt);
  camera.x=clamp(player.x-W/2,0,WORLD_W-W);camera.y=clamp(player.y-H/2,0,WORLD_H-H);
  player.angle=Math.atan2(mouse.y+camera.y-player.y,mouse.x+camera.x-player.x);
  if(mouse.down&&player.fire<=0){
    if(chosenRole==='assault'&&player.assaultWeapon==='shotgun'){
      if(player.shotgunCooldown<=0){
        const a=player.angle,projectileSpeed=rapidFirePurchased?940:650;player.fire=.2;player.shotgunCooldown=3;
        [-.24,-.12,0,.12,.24].forEach(offset=>{const angle=a+offset;bullets.push({x:player.x+Math.cos(angle)*25,y:player.y+Math.sin(angle)*25,vx:Math.cos(angle)*projectileSpeed,vy:Math.sin(angle)*projectileSpeed,life:1,oneShot:true})});
        burst(player.x+Math.cos(a)*28,player.y+Math.sin(a)*28,'#ff9d3d',7);shake=5;
      }
    }else{
      const baseFireDelay=chosenRole==='assault'?.115/1.5:.115;
      player.fire=rapidFirePurchased?baseFireDelay*.65:baseFireDelay; const a=player.angle+rand(-.025,.025);
      const special=chosenRole==='manipulator'&&player.manipulateReady;
      const forwardAngles=chosenRole==='madman'?[a-.055,a+.055]:[a];
      const shotAngles=dualShotPurchased?[...forwardAngles,...forwardAngles.map(angle=>angle+Math.PI)]:forwardAngles;
      const projectileSpeed=rapidFirePurchased?1050:720;
      shotAngles.forEach(shotAngle=>bullets.push({x:player.x+Math.cos(shotAngle)*25,y:player.y+Math.sin(shotAngle)*25,vx:Math.cos(shotAngle)*projectileSpeed,vy:Math.sin(shotAngle)*projectileSpeed,life:1.2,special}));
      if(special){player.manipulateReady=false;if(player.manipulateCharges===3)player.manipulateCooldown=10;player.manipulateCharges--}
      burst(player.x+Math.cos(a)*28,player.y+Math.sin(a)*28,'#c8ff3d',3);
      if(dualShotPurchased)burst(player.x-Math.cos(a)*22,player.y-Math.sin(a)*22,'#ff6fbd',2);
    }
  }

  if(!bossFightActive){
    spawnTimer-=dt;
    if(spawnTimer<=0){
      const activeHostiles=enemies.filter(e=>!e.friendly&&!e.boss&&e.hp>0).length;
      if(activeHostiles<45)spawnEnemy();
      spawnTimer=(activeHostiles<45?Math.max(.5,1.3-wave*.035):.35)*rand(.85,1.2);
    }
    if(!enemies.some(e=>e.elite&&e.hp>0)){eliteRespawn-=dt;if(eliteRespawn<=0)spawnElite()}
  }
  wave=1+Math.floor(kills/18);

  bullets.forEach(b=>{b.x+=b.vx*dt;b.y+=b.vy*dt;b.life-=dt});
  enemyBullets.forEach(b=>{b.x+=b.vx*dt;b.y+=b.vy*dt;b.life-=dt});
  particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.96;p.vy*=.96;p.life-=dt});
  explosions.forEach(e=>e.life-=dt);
  lightningEffects.forEach(e=>e.life-=dt);
  catLaserEffects.forEach(e=>e.life-=dt);
  pickups.forEach(p=>{p.life-=dt;p.phase+=dt*4});
  traps.forEach(t=>{t.arm-=dt;t.phase+=dt*2.5});

  turrets.forEach(t=>{
    t.fire-=dt;t.hit-=dt;
    let target=null,best=t.range;
    enemies.forEach(e=>{const d=dist(t,e);if(e.hp>0&&!e.friendly&&d<best&&hasLineOfSight(t,e)){best=d;target=e}});
    if(target){
      t.angle=Math.atan2(target.y-t.y,target.x-t.x);
      if(t.fire<=0){const a=t.angle,baseDelay=t.ultra?.2:.38,baseSpeed=t.ultra?760:610;t.fire=rapidFirePurchased?baseDelay*.65:baseDelay;const projectileSpeed=rapidFirePurchased?baseSpeed*1.45:baseSpeed;bullets.push({x:t.x+Math.cos(a)*26,y:t.y+Math.sin(a)*26,vx:Math.cos(a)*projectileSpeed,vy:Math.sin(a)*projectileSpeed,life:1.2,turret:true,ultra:t.ultra});burst(t.x+Math.cos(a)*25,t.y+Math.sin(a)*25,t.ultra?'#ffd84d':'#58ffd1',t.ultra?4:2)}
    }
  });

  enemies.forEach(e=>{
    e.hit-=dt;e.fireTrailHit=(e.fireTrailHit||0)-dt;if(e.elite)e.dodge-=dt;
    if(e.friendly){
      e.shoot-=dt;e.allyDodge-=dt;let target=null,best=520;
      if(e.allyDodge<=0){
        const threat=enemyBullets.find(b=>b.life>0&&dist(b,e)<150);
        if(threat){const incoming=Math.atan2(threat.vy,threat.vx),side=Math.random()<.5?-1:1,da=incoming+Math.PI/2*side;for(let i=0;i<5;i++)moveBody(e,Math.cos(da)*24,Math.sin(da)*24,e.r,1);e.allyDodge=2.5;burst(e.x,e.y,'#43cfff',14)}
      }
      enemies.forEach(other=>{const d=dist(e,other);if(other!==e&&!other.friendly&&other.hp>0&&d<best){best=d;target=other}});
      if(target){e.angle=Math.atan2(target.y-e.y,target.x-e.x);if(e.shoot<=0){const a=e.angle;e.shoot=.7;bullets.push({x:e.x+Math.cos(a)*e.r,y:e.y+Math.sin(a)*e.r,vx:Math.cos(a)*560,vy:Math.sin(a)*560,life:1.4,turret:true,ally:true})}}
      if(dist(e,player)>105){const a=Math.atan2(player.y-e.y,player.x-e.x);moveBody(e,Math.cos(a)*e.speed*.85,Math.sin(a)*e.speed*.85,e.r,dt)}
      return;
    }
    if(e.boss){
      const playerDistance=dist(e,player);
      const laserSpeed=playerDistance<550?.62:playerDistance<1000?.36:.18;
      e.laserAngle+=dt*laserSpeed;e.angle=e.laserAngle;e.closeBeam-=dt;e.closeCooldown-=dt;
      if(player.inv<=0){
        for(let i=0;i<3;i++){const a=e.laserAngle+i*Math.PI*2/3,end={x:e.x+Math.cos(a)*4200,y:e.y+Math.sin(a)*4200};if(pointSegmentDist(player,e,end)<13){player.hp-=25;player.inv=.65;flash=.16;shake=16;burst(player.x,player.y,'#ff193d',20);if(player.hp<=0)endGame();break}}
      }
      if(playerDistance<145&&e.closeCooldown<=0&&player.inv<=0){e.closeAngle=Math.atan2(player.y-e.y,player.x-e.x);e.closeBeam=.18;e.closeCooldown=2.4;player.hp-=50;player.inv=.7;flash=.24;shake=24;burst(player.x,player.y,'#ffffff',28);if(player.hp<=0)endGame()}
      return;
    }
    let target=chosenRole==='ghost'&&player.invisible>0?null:player,targetDist=target?dist(e,player):Infinity;
    turrets.forEach(t=>{const td=dist(e,t);if(t.hp>0&&td<targetDist){target=t;targetDist=td}});
    enemies.forEach(ally=>{const ad=dist(e,ally);if(ally.friendly&&ally.hp>0&&ad<targetDist){target=ally;targetDist=ad}});
    if(!target){
      e.wanderTimer=(e.wanderTimer||0)-dt;
      if(e.wanderTimer<=0){e.angle=rand(0,Math.PI*2);e.wanderTimer=rand(1.2,3.2)}
      moveBody(e,Math.cos(e.angle)*e.speed*.65,Math.sin(e.angle)*e.speed*.65,e.r,dt);
      return;
    }
    const a=Math.atan2(target.y-e.y,target.x-e.x), d=targetDist;e.angle=a;
    if(e.elite&&e.dodge<=0){
      const threat=bullets.find(b=>b.life>0&&dist(b,e)<155);
      if(threat){const side=Math.random()<.5?-1:1,da=a+Math.PI/2*side;for(let i=0;i<5;i++)moveBody(e,Math.cos(da)*27,Math.sin(da)*27,e.r,1);e.dodge=1.8;burst(e.x,e.y,'#b858ff',12)}
    }
    if(d>e.r+target.r+35)moveBody(e,Math.cos(a)*e.speed,Math.sin(a)*e.speed,e.r,dt);
    e.shoot-=dt;
    if(e.shoot<=0&&d<650){
      const spread=e.tank?.09:.045, aa=a+rand(-spread,spread), sp=e.tank?300:e.elite?410:360;
      enemyBullets.push({x:e.x+Math.cos(aa)*e.r,y:e.y+Math.sin(aa)*e.r,vx:Math.cos(aa)*sp,vy:Math.sin(aa)*sp,life:3,r:e.elite?8:e.tank?7:5,damage:e.elite?36:e.tank?18:11});
      e.shoot=(e.elite?1.15:e.tank?1.5:1.9)*rand(.8,1.2)/Math.min(1.3,1+wave*.012);
    }
  });

  traps.forEach(t=>{
    if(t.arm>0)return;
    const victim=enemies.find(e=>e.hp>0&&!e.boss&&!e.friendly&&dist(t,e)<t.r+e.r);
    if(victim){t.used=true;victim.hp=0;const reward=victim.elite?300:victim.tank?120:60;credits+=reward;score+=victim.elite?750:victim.tank?300:100;kills++;if(victim.elite)eliteRespawn=20;shake=10;burst(t.x,t.y,'#ffd84d',30);notice=tr(`PUŁAPKA: +${reward} ENERGII`,`TRAP: +${reward} ENERGY`);noticeTime=1.5}
  });

  fireTrail.forEach(f=>{
    if(f.life<=0)return;
    enemies.forEach(e=>{
      if(e.hp<=0||e.friendly||e.fireTrailHit>0||dist(f,e)>=f.r+e.r)return;
      e.hp-=1;e.fireTrailHit=.35;e.hit=.08;burst(e.x,e.y,'#ff713d',1);
      if(e.hp<=0){credits+=energyReward(e.boss?500:e.elite?150:e.tank?60:30);score+=e.boss?3000:e.elite?750:e.tank?300:100;kills++;if(e.elite)eliteRespawn=20;if(e.boss){bossFightActive=false;bossPurgeTimer=0;spawnTimer=.25;eliteRespawn=1}}
    });
  });

  for(const b of bullets)for(const e of enemies)if(b.life>0&&e.hp>0&&!e.friendly&&dist(b,e)<e.r+4){
    b.life=0;
    if(b.special&&!e.boss){e.friendly=true;e.maxHp*=4;e.hp=e.maxHp;e.shoot=.3;e.allyDodge=0;e.hit=.2;burst(e.x,e.y,'#43cfff',25);notice=tr('WRÓG PRZEJĘTY — ŻYCIE ×4','ENEMY CONTROLLED — HEALTH ×4');noticeTime=1.5;continue}
    if(b.special&&e.boss){notice=tr('TYTAN JEST ODPORNY NA PRZEJĘCIE','TITAN IS IMMUNE TO CONTROL');noticeTime=1.5;burst(b.x,b.y,'#ff193d',10);continue}
    const playerShot=!b.turret||b.reflected;
    const damage=b.oneShot?e.hp:playerShot?(chosenRole==='assassin'?2:1)*playerDamageMultiplier:1;
    e.hp-=damage;e.hit=.08;score+=20;burst(b.x,b.y,b.turret?'#58ffd1':'#eaffac',5);
    if(chosenRole==='electrician'&&!b.turret)chainLightning(e,damage);
    if(e.hp<=0){credits+=energyReward(e.boss?500:e.elite?150:e.tank?60:30)*(b.reflected?4:1);score+=e.boss?3000:e.elite?750:e.tank?300:100;kills++;shake=e.boss?28:e.elite?18:e.tank?12:6;if(e.elite)eliteRespawn=20;if(e.boss){bossFightActive=false;bossPurgeTimer=0;spawnTimer=.25;eliteRespawn=1;notice=tr('TYTAN POKONANY — FALE WZNOWIONE','TITAN DEFEATED — WAVES RESUMED');noticeTime=3}burst(e.x,e.y,e.boss?'#ff193d':e.elite?'#b858ff':e.tank?'#ff9d3d':'#ff405d',e.boss?65:e.elite?38:e.tank?25:15);if(Math.random()<.1)pickups.push({x:e.x,y:e.y,r:10,life:8,phase:0})}
  }
  for(const b of enemyBullets){
    if(b.life>0&&chosenRole==='ninja'&&player.reflect>0&&dist(b,player)<player.r+b.r+5){b.life=0;bullets.push({x:b.x,y:b.y,vx:-b.vx*1.2,vy:-b.vy*1.2,life:1.8,turret:true,reflected:true});burst(b.x,b.y,'#e8f7ff',10);shake=3}
    if(b.life>0){
      const ally=enemies.find(e=>e.friendly&&e.hp>0&&dist(b,e)<e.r+b.r);
      if(ally){b.life=0;ally.hp--;ally.hit=.15;burst(ally.x,ally.y,'#43cfff',9);if(ally.hp<=0&&ally.elite)eliteRespawn=20}
    }
    if(b.life>0){
      const turret=turrets.find(t=>t.hp>0&&dist(b,t)<t.r+b.r);
      if(turret){b.life=0;turret.hit=.18;shake=6;burst(turret.x,turret.y,turret.ultra?'#ffd84d':'#ff9d3d',12);if(!turret.ultra){turret.hp--;if(turret.hp<=0){burst(turret.x,turret.y,'#58ffd1',28);notice=tr('WIEŻYCZKA ZNISZCZONA','TURRET DESTROYED');noticeTime=1.4}}}
    }
    if(b.life>0&&player.inv<=0&&!(chosenRole==='ghost'&&player.invisible>0)&&dist(b,player)<player.r+b.r){b.life=0;player.hp-=b.damage;player.inv=.45;player.speed=chosenRole==='assassin'?390:chosenRole==='catclaw'?325:260;shake=b.damage===36?5:12;flash=b.damage===36?.06:.12;burst(player.x,player.y,'#ff405d',b.damage===36?10:18);if(player.hp<=0)endGame()}
  }
  pickups.forEach(p=>{if(p.life>0&&dist(p,player)<player.r+p.r){p.life=0;player.hp=Math.min(player.maxHp,player.hp+25);score+=50;burst(p.x,p.y,'#58ffd1',16)}});
  bullets.forEach(b=>{if(blocked(b,3))b.life=0});enemyBullets.forEach(b=>{if(blocked(b,b.r))b.life=0});
  bullets=bullets.filter(b=>b.life>0&&b.x>0&&b.x<WORLD_W&&b.y>0&&b.y<WORLD_H);
  enemyBullets=enemyBullets.filter(b=>b.life>0&&b.x>0&&b.x<WORLD_W&&b.y>0&&b.y<WORLD_H);
  enemies=enemies.filter(e=>e.hp>0);if(catTarget&&catTarget.hp<=0)catTarget=null;turrets=turrets.filter(t=>t.hp>0);traps=traps.filter(t=>!t.used);fireTrail=fireTrail.filter(f=>f.life>0);lightningEffects=lightningEffects.filter(e=>e.life>0);catLaserEffects=catLaserEffects.filter(e=>e.life>0);particles=particles.filter(p=>p.life>0);explosions=explosions.filter(e=>e.life>0);pickups=pickups.filter(p=>p.life>0);
}

function endGame(){running=false;finalStats.textContent=tr(`Wynik: ${score.toLocaleString('pl-PL')}  •  Pokonani: ${kills}  •  Fala: ${wave}`,`Score: ${score.toLocaleString('en-US')}  •  Defeated: ${kills}  •  Wave: ${wave}`);gameOverScreen.classList.remove('hidden')}

function roleHud(){
  const names={medic:tr('TECHNIK','TECHNICIAN'),tank:'TANK',billionaire:tr('MILIARDER','BILLIONAIRE'),assassin:tr('ASSASYN','ASSASSIN'),ghost:tr('DUCH','GHOST'),manipulator:'MANIPULATOR',engineer:tr('INŻYNIER','ENGINEER'),ninja:'NINJA',madman:tr('SZALENIEC','MADMAN'),electrician:tr('ELEKTRYK','ELECTRICIAN'),catclaw:tr('KOCI PAZUR','CAT CLAW'),assault:tr('SZTURMOWIEC','ASSAULT TROOPER')};
  const ready=tr('GOTOWE','READY');let status='';
  if(chosenRole==='medic')status=`[E] ${player.heal>0?Math.ceil(player.heal)+' S':ready}`;
  if(chosenRole==='ghost')status=player.invisible>0?`${tr('NIEWIDZIALNY','INVISIBLE')} ${Math.ceil(player.invisible)} S`:`[E] ${player.ghostCooldown>0?Math.ceil(player.ghostCooldown)+' S':ready}`;
  if(chosenRole==='manipulator')status=`${player.manipulateReady?tr('POCISK UZBROJONY','SHOT ARMED'):'[E]'}  •  ${tr('POCISKI','SHOTS')} ${player.manipulateCharges} / 3${player.manipulateCharges<3?`  •  +1 ${tr('ZA','IN')} ${Math.ceil(player.manipulateCooldown)} S`:''}`;
  if(chosenRole==='engineer')status=`[E] ${tr('PUŁAPKI','TRAPS')} ${player.traps} / 10${player.traps<10?`  •  +1 ${tr('ZA','IN')} ${Math.ceil(player.trapRecharge)} S`:''}`;
  if(chosenRole==='ninja')status=player.reflect>0?`${tr('ODBICIE','REFLECTION')} ${Math.ceil(player.reflect)} S`:`[E] ${player.ninjaCooldown>0?Math.ceil(player.ninjaCooldown)+' S':ready}`;
  if(chosenRole==='madman')status=`[E] ${player.madmanCooldown>0?Math.ceil(player.madmanCooldown)+' S':tr('WYBUCH GOTOWY','EXPLOSION READY')}`;
  if(chosenRole==='catclaw')status=`[E] ${player.catCooldown>0?Math.ceil(player.catCooldown)+' S':catTarget?tr('CEL ZAZNACZONY','TARGET LOCKED'):tr('WYBIERZ CEL','SELECT TARGET')}`;
  if(chosenRole==='assault')status=`[E] ${player.assaultWeapon==='shotgun'?'SHOTGUN':tr('BROŃ DOMYŚLNA','DEFAULT WEAPON')}${player.assaultWeapon==='shotgun'&&player.shotgunCooldown>0?`  •  ${Math.ceil(player.shotgunCooldown)} S`:''}`;
  return `${tr('ROLA','ROLE')}: ${names[chosenRole]}${status?'  •  '+status:''}`;
}

function toggleShop(force){
  if(!running)return;
  shopOpen=typeof force==='boolean'?force:!shopOpen;
  shopScreen.classList.toggle('hidden',!shopOpen);shopEnergy.textContent=`${credits} ${tr('ENERGII','ENERGY')}`;
  turretHpUpgrade.disabled=turretHpMultiplier>1||credits<500;
  turretHpUpgrade.innerHTML=turretHpMultiplier>1?tr('KUPIONO','PURCHASED'):credits<500?`<strong>500</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>500</strong> ${tr('ENERGII','ENERGY')}`;
  damageUpgrade.disabled=playerDamageMultiplier>1||credits<1000;
  damageUpgrade.innerHTML=playerDamageMultiplier>1?tr('KUPIONO','PURCHASED'):credits<1000?`<strong>1000</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>1000</strong> ${tr('ENERGII','ENERGY')}`;
  regenUpgrade.disabled=healthRegen||credits<750;
  regenUpgrade.innerHTML=healthRegen?tr('KUPIONO','PURCHASED'):credits<750?`<strong>750</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>750</strong> ${tr('ENERGII','ENERGY')}`;
  ultraTurretUpgrade.disabled=ultraTurretPurchased||credits<1500;
  ultraTurretUpgrade.innerHTML=ultraTurretPurchased?tr('KUPIONO','PURCHASED'):credits<1500?`<strong>1500</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>1500</strong> ${tr('ENERGII','ENERGY')}`;
  fireTrailUpgrade.disabled=fireTrailPurchased||credits<300;
  fireTrailUpgrade.innerHTML=fireTrailPurchased?tr('KUPIONO','PURCHASED'):credits<300?`<strong>300</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>300</strong> ${tr('ENERGII','ENERGY')}`;
  rapidFireUpgrade.disabled=rapidFirePurchased||credits<2000;
  rapidFireUpgrade.innerHTML=rapidFirePurchased?tr('KUPIONO','PURCHASED'):credits<2000?`<strong>2000</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>2000</strong> ${tr('ENERGII','ENERGY')}`;
  dualShotUpgrade.disabled=dualShotPurchased||credits<3000;
  dualShotUpgrade.innerHTML=dualShotPurchased?tr('KUPIONO','PURCHASED'):credits<3000?`<strong>3000</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>3000</strong> ${tr('ENERGII','ENERGY')}`;
  playerHpUpgrade.disabled=playerHpPurchased||credits<2500;
  playerHpUpgrade.innerHTML=playerHpPurchased?tr('KUPIONO','PURCHASED'):credits<2500?`<strong>2500</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>2500</strong> ${tr('ENERGII','ENERGY')}`;
  if(shopOpen)shake=0;
  Object.keys(keys).forEach(k=>keys[k]=false);mouse.down=false;spaceDashQueued=false;turretQueued=false;healQueued=false;
}

function buyTurretHpUpgrade(){
  if(!shopOpen||turretHpMultiplier>1||credits<500)return;
  credits-=500;turretHpMultiplier=2;
  turrets.forEach(t=>{if(!t.ultra){t.hp*=2;t.maxHp*=2}});
  toggleShop(true);
}

function buyDamageUpgrade(){
  if(!shopOpen||playerDamageMultiplier>1||credits<1000)return;
  credits-=1000;playerDamageMultiplier=2;toggleShop(true);
}

function buyRegenUpgrade(){
  if(!shopOpen||healthRegen||credits<750)return;
  credits-=750;healthRegen=true;toggleShop(true);
}

function buyUltraTurret(){
  if(!shopOpen||ultraTurretPurchased||credits<1500)return;
  credits-=1500;ultraTurretPurchased=true;
  turrets.push({x:player.x,y:player.y,r:25,hp:1,maxHp:1,hit:0,angle:player.angle,fire:0,range:650,ultra:true});
  burst(player.x,player.y,'#ffd84d',36);notice=tr('ULTRA DZIAŁKO AKTYWNE','ULTRA TURRET ONLINE');noticeTime=2;
  toggleShop(true);
}

function buyFireTrail(){
  if(!shopOpen||fireTrailPurchased||credits<300)return;
  credits-=300;fireTrailPurchased=true;fireTrailSpawn=0;
  notice=tr('TOR OGNIA AKTYWNY','FIRE TRAIL ACTIVE');noticeTime=2;
  toggleShop(true);
}

function buyRapidFire(){
  if(!shopOpen||rapidFirePurchased||credits<2000)return;
  credits-=2000;rapidFirePurchased=true;
  notice=tr('HIPERNAPĘD BRONI AKTYWNY','WEAPON HYPERDRIVE ACTIVE');noticeTime=2;
  toggleShop(true);
}

function buyDualShot(){
  if(!shopOpen||dualShotPurchased||credits<3000)return;
  credits-=3000;dualShotPurchased=true;
  notice=tr('DWUSTRONNY OSTRZAŁ AKTYWNY','TWO-WAY FIRE ACTIVE');noticeTime=2;
  toggleShop(true);
}

function buyPlayerHp(){
  if(!shopOpen||playerHpPurchased||credits<2500)return;
  credits-=2500;playerHpPurchased=true;player.maxHp+=50;player.hp+=50;
  notice=tr(`PANCERZ WZMOCNIONY — ${player.maxHp} HP`,`ARMOR BOOSTED — ${player.maxHp} HP`);noticeTime=2;
  toggleShop(true);
}

function draw(){
  ctx.save();ctx.clearRect(0,0,W,H);ctx.translate(rand(-shake,shake)-camera.x,rand(-shake,shake)-camera.y);
  ctx.fillStyle='#090d12';ctx.fillRect(0,0,WORLD_W,WORLD_H);
  ctx.strokeStyle='rgba(115,135,145,.11)';ctx.lineWidth=1;
  for(let x=0;x<WORLD_W;x+=64){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,WORLD_H);ctx.stroke()}
  for(let y=0;y<WORLD_H;y+=64){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(WORLD_W,y);ctx.stroke()}
  ctx.strokeStyle='#c8ff3d';ctx.lineWidth=5;ctx.shadowBlur=15;ctx.shadowColor='#c8ff3d';ctx.strokeRect(18,18,WORLD_W-36,WORLD_H-36);ctx.shadowBlur=0;

  obstacles.forEach(o=>{
    ctx.fillStyle='#171e24';ctx.fillRect(o.x,o.y,o.w,o.h);
    ctx.strokeStyle='#3b4850';ctx.lineWidth=3;ctx.strokeRect(o.x,o.y,o.w,o.h);
    ctx.fillStyle='rgba(200,255,61,.13)';ctx.fillRect(o.x+8,o.y+8,o.w-16,7);
    ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=1;
    for(let x=o.x+20;x<o.x+o.w;x+=35){ctx.beginPath();ctx.moveTo(x,o.y+18);ctx.lineTo(x-18,o.y+o.h);ctx.stroke()}
  });

  if(bossSpawnTimer>0&&bossSpawnPoint){const p=bossSpawnPoint,t=visualTime;ctx.save();ctx.translate(p.x,p.y);ctx.globalCompositeOperation='lighter';for(let i=0;i<4;i++){ctx.strokeStyle=`rgba(255,25,61,${.25+i*.12})`;ctx.lineWidth=3+i*2;ctx.beginPath();ctx.arc(0,0,35+i*18+Math.sin(t*5+i)*8,t*(i%2?1:-1),t*(i%2?1:-1)+Math.PI*1.45);ctx.stroke()}ctx.fillStyle='rgba(255,25,61,.12)';ctx.beginPath();ctx.arc(0,0,78,0,7);ctx.fill();ctx.restore()}

  enemies.filter(e=>e.boss&&e.hp>0).forEach(e=>{ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const a=e.laserAngle+i*Math.PI*2/3;ctx.strokeStyle='rgba(255,20,55,.18)';ctx.lineWidth=28;ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(e.x+Math.cos(a)*4200,e.y+Math.sin(a)*4200);ctx.stroke();ctx.strokeStyle='#ff193d';ctx.lineWidth=5;ctx.shadowBlur=18;ctx.shadowColor='#ff193d';ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(e.x+Math.cos(a)*4200,e.y+Math.sin(a)*4200);ctx.stroke()}if(e.closeBeam>0){ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=22;ctx.shadowBlur=35;ctx.shadowColor='#ff193d';ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(e.x+Math.cos(e.closeAngle)*170,e.y+Math.sin(e.closeAngle)*170);ctx.stroke();ctx.strokeStyle='#ff193d';ctx.lineWidth=38;ctx.globalAlpha=.35;ctx.stroke()}ctx.restore()});

  turrets.forEach(t=>{const color=t.ultra?'#ffd84d':'#58ffd1';ctx.save();ctx.translate(t.x,t.y);ctx.rotate(t.angle);ctx.shadowBlur=t.ultra?22:12;ctx.shadowColor=t.hit>0?'#fff':color;ctx.fillStyle=t.hit>0?'#fff':color;ctx.beginPath();ctx.arc(0,0,t.ultra?20:17,0,7);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle=t.ultra?'#322a0d':'#142421';ctx.fillRect(-4,-5,t.ultra?38:31,10);ctx.strokeStyle=t.ultra?'#fff0a3':t.hp===1?'#ff9d3d':'#8affdf';ctx.lineWidth=t.ultra?4:3;ctx.beginPath();ctx.arc(0,0,t.ultra?26:22,0,7);ctx.stroke();ctx.restore();if(!t.ultra){ctx.fillStyle='#20282e';ctx.fillRect(t.x-22,t.y-32,44,4);ctx.fillStyle=t.hp===1?'#ff9d3d':'#58ffd1';ctx.fillRect(t.x-22,t.y-32,44*t.hp/t.maxHp,4)}});

  traps.forEach(t=>{ctx.save();ctx.translate(t.x,t.y);ctx.rotate(t.phase);ctx.globalAlpha=t.arm>0?.45:1;ctx.shadowBlur=14;ctx.shadowColor='#ffd84d';ctx.strokeStyle='#ffd84d';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,rr=i%2?10:23;i?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):ctx.moveTo(Math.cos(a)*rr,Math.sin(a)*rr)}ctx.closePath();ctx.stroke();ctx.fillStyle='rgba(255,216,77,.18)';ctx.fill();ctx.restore()});

  fireTrail.forEach(f=>{const fade=Math.min(1,f.life/.3);ctx.save();ctx.translate(f.x,f.y);ctx.globalAlpha=fade*.65;ctx.fillStyle='#ff552d';ctx.beginPath();ctx.arc(Math.sin(f.phase)*2,0,f.r*.5,0,7);ctx.fill();ctx.fillStyle='#ffd84d';ctx.beginPath();ctx.arc(-2,2,f.r*.2,0,7);ctx.fill();ctx.restore()});

  lightningEffects.forEach(e=>{ctx.save();ctx.globalAlpha=e.life/e.max;ctx.strokeStyle='#79ddff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(e.x1,e.y1);ctx.lineTo((e.x1+e.x2)/2+rand(-5,5),(e.y1+e.y2)/2+rand(-5,5));ctx.lineTo(e.x2,e.y2);ctx.stroke();ctx.restore()});

  catLaserEffects.forEach(l=>{ctx.save();ctx.globalAlpha=l.life/l.max;ctx.strokeStyle='#ff294d';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(l.x,l.y);ctx.lineTo(l.x+Math.cos(l.angle)*4200,l.y+Math.sin(l.angle)*4200);ctx.stroke();ctx.restore()});

  pickups.forEach(p=>{ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.phase);ctx.shadowBlur=16;ctx.shadowColor='#58ffd1';ctx.strokeStyle='#58ffd1';ctx.lineWidth=3;ctx.strokeRect(-8,-8,16,16);ctx.restore()});
  bullets.forEach(b=>{ctx.strokeStyle=b.oneShot?'#ff9d3d':b.special?'#43cfff':b.reflected?'#e8f7ff':b.ally?'#75e7ff':'#dfff86';ctx.lineWidth=b.oneShot?7:b.special?8:b.reflected?6:4;ctx.shadowBlur=b.special||b.reflected?18:0;ctx.shadowColor=b.reflected?'#9ee7ff':'#43cfff';ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(b.x-b.vx*.018,b.y-b.vy*.018);ctx.stroke();ctx.shadowBlur=0});
  enemyBullets.forEach(b=>{ctx.shadowBlur=12;ctx.shadowColor='#ff405d';ctx.fillStyle='#ff405d';ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,7);ctx.fill();ctx.shadowBlur=0});
  explosions.forEach(e=>{const progress=1-e.life/e.max,r=e.radius*Math.min(1,progress*1.35),fade=Math.max(0,1-progress);ctx.save();ctx.translate(e.x,e.y);ctx.globalCompositeOperation='lighter';const glow=ctx.createRadialGradient(0,0,0,0,0,Math.max(1,r));glow.addColorStop(0,`rgba(255,245,190,${fade*.55})`);glow.addColorStop(.3,`rgba(255,157,61,${fade*.38})`);glow.addColorStop(1,'rgba(255,64,40,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.fill();for(let i=0;i<3;i++){ctx.strokeStyle=`rgba(${i===0?'255,245,200':'255,110,45'},${fade*(1-i*.2)})`;ctx.lineWidth=Math.max(2,12-i*3)*(1-progress);ctx.shadowBlur=24;ctx.shadowColor='#ff6b2e';ctx.beginPath();ctx.arc(0,0,Math.max(4,r-i*18),0,7);ctx.stroke()}ctx.rotate(progress*2);ctx.strokeStyle=`rgba(255,216,90,${fade*.8})`;ctx.lineWidth=4;for(let i=0;i<12;i++){const a=i*Math.PI/6;ctx.beginPath();ctx.moveTo(Math.cos(a)*r*.35,Math.sin(a)*r*.35);ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);ctx.stroke()}ctx.restore()});
  particles.forEach(p=>{ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle=p.color;ctx.fillRect(p.x-p.size/2,p.y-p.size/2,p.size,p.size)});ctx.globalAlpha=1;

  enemies.forEach(e=>{ctx.save();ctx.translate(e.x,e.y);ctx.rotate(e.angle);ctx.fillStyle=e.hit>0?'#fff':e.friendly?'#43cfff':e.elite?'#b858ff':e.boss?'#ff193d':e.tank?'#ff9d3d':'#ff405d';ctx.shadowBlur=e.boss?32:e.elite?24:14;ctx.shadowColor=ctx.fillStyle;ctx.beginPath();if(e.boss){for(let i=0;i<8;i++){const a=i*Math.PI/4,rr=i%2?32:48;i?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):ctx.moveTo(Math.cos(a)*rr,Math.sin(a)*rr)}ctx.closePath()}else if(e.tank||e.elite){ctx.rect(e.elite?-23:-20,e.elite?-23:-20,e.elite?46:40,e.elite?46:40)}else{ctx.moveTo(22,0);ctx.lineTo(-15,15);ctx.lineTo(-10,0);ctx.lineTo(-15,-15);ctx.closePath()}ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#151018';ctx.fillRect(-4,-4,e.r+12,8);ctx.restore();if(e.hp<e.maxHp||e.elite||e.boss||e.friendly){const bw=e.boss?110:48;ctx.fillStyle='#202830';ctx.fillRect(e.x-bw/2,e.y-e.r-15,bw,6);ctx.fillStyle=e.friendly?'#43cfff':e.elite?'#b858ff':'#ff193d';ctx.fillRect(e.x-bw/2,e.y-e.r-15,bw*Math.max(0,e.hp)/e.maxHp,6)}});

  if(catTarget&&catTarget.hp>0){ctx.save();ctx.translate(catTarget.x,catTarget.y);ctx.rotate(visualTime*2.5);ctx.strokeStyle=catTarget.boss?'#ff193d':'#ffcf4a';ctx.lineWidth=3;ctx.setLineDash([7,5]);ctx.beginPath();ctx.arc(0,0,catTarget.r+13,0,Math.PI*2);ctx.stroke();ctx.restore()}

  if(player){ctx.save();ctx.translate(player.x,player.y);ctx.rotate(player.angle);ctx.globalAlpha=player.invisible>0?.2:player.inv>0&&Math.floor(player.inv*20)%2?.3:1;ctx.shadowBlur=18;ctx.shadowColor='#c8ff3d';ctx.fillStyle='#c8ff3d';ctx.beginPath();ctx.moveTo(24,0);ctx.lineTo(-15,14);ctx.lineTo(-9,0);ctx.lineTo(-15,-14);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#07100b';ctx.fillRect(1,-4,27,8);ctx.restore()}
  if(player&&player.reflect>0){ctx.save();ctx.translate(player.x,player.y);ctx.rotate(visualTime*2.85);ctx.strokeStyle='rgba(232,247,255,.9)';ctx.lineWidth=3;ctx.shadowBlur=18;ctx.shadowColor='#9ee7ff';ctx.setLineDash([10,7]);ctx.beginPath();ctx.arc(0,0,31,0,Math.PI*2);ctx.stroke();ctx.restore()}
  ctx.restore();
  if(!player)return;
  ctx.fillStyle='rgba(8,11,15,.76)';ctx.fillRect(28,26,280,88);ctx.strokeStyle='#303b42';ctx.strokeRect(28,26,280,88);
  ctx.fillStyle='#7d8791';ctx.font='700 12px JetBrains Mono';ctx.fillText(tr('INTEGRALNOŚĆ PANCERZA','ARMOR INTEGRITY'),45,51);
  ctx.fillStyle='#20282e';ctx.fillRect(45,64,245,12);ctx.fillStyle=player.hp>player.maxHp*.3?'#c8ff3d':'#ff405d';ctx.fillRect(45,64,245*Math.max(0,player.hp)/player.maxHp,12);
  ctx.fillStyle='#eef4e8';ctx.font='800 22px Barlow Condensed';ctx.fillText(`${Math.ceil(Math.max(0,player.hp))} / ${player.maxHp}`,45,101);
  ctx.textAlign='right';ctx.fillStyle='#eef4e8';ctx.font='900 36px Barlow Condensed';ctx.fillText(score.toString().padStart(6,'0'),W-35,55);
  ctx.fillStyle='#7d8791';ctx.font='700 11px JetBrains Mono';ctx.fillText(`${tr('WYNIK','SCORE')}  //  ${tr('CELE','TARGETS')}: ${kills}`,W-36,75);
  ctx.textAlign='center';ctx.fillStyle='rgba(238,244,232,.8)';ctx.font='900 22px Barlow Condensed';ctx.fillText(`${tr('FALA','WAVE')} ${wave}`,W/2,45);ctx.textAlign='left';
  ctx.fillStyle='rgba(8,11,15,.82)';ctx.fillRect(W-305,H-91,270,55);ctx.strokeStyle='#34433f';ctx.strokeRect(W-305,H-91,270,55);
  ctx.fillStyle='#58ffd1';ctx.font='900 24px Barlow Condensed';ctx.fillText(`${tr('ENERGIA','ENERGY')}  ${credits}`,W-288,H-57);
  ctx.fillStyle='#84918d';ctx.font='700 10px JetBrains Mono';ctx.fillText(`[Z] ${tr('WIEŻYCZKA','TURRET')}: ${TURRET_COST}`,W-152,H-58);
  const regularTurretCount=turrets.filter(t=>!t.ultra).length;
  ctx.fillStyle=regularTurretCount>10?'#ff405d':'#84918d';ctx.font='700 10px JetBrains Mono';ctx.fillText(`${tr('AKTYWNE WIEŻYCZKI','ACTIVE TURRETS')}: ${regularTurretCount} / 11`,W-288,H-105);
  ctx.fillStyle='#7d8791';ctx.font='700 10px JetBrains Mono';ctx.fillText(roleHud(),45,H-45);
  if(noticeTime>0){ctx.textAlign='center';ctx.fillStyle=notice.startsWith('WIEŻ')?'#58ffd1':'#ff9d3d';ctx.font='800 18px JetBrains Mono';ctx.fillText(notice,W/2,H-45);ctx.textAlign='left'}
  if(player.dash>0){ctx.fillStyle='#1d2822';ctx.fillRect(45,108,120,3);ctx.fillStyle='#58ffd1';ctx.fillRect(45,108,120*(1-player.dash/1.4),3)}
  if(flash>0){ctx.fillStyle=`rgba(255,64,93,${flash*1.5})`;ctx.fillRect(0,0,W,H)}
}

function loop(t){const dt=Math.min(.033,(t-last)/1000||0);last=t;update(dt);draw();requestAnimationFrame(loop)}
function begin(){reset();running=true;startScreen.classList.add('hidden');gameOverScreen.classList.add('hidden')}
function returnToCharacterSelect(){
  running=false;shopOpen=false;mouse.down=false;
  Object.keys(keys).forEach(key=>keys[key]=false);
  shopScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
}
document.getElementById('startBtn').onclick=begin;document.getElementById('restartBtn').onclick=begin;
document.getElementById('mainMenuBtn').onclick=returnToCharacterSelect;
document.getElementById('closeShopBtn').onclick=()=>toggleShop(false);
turretHpUpgrade.onclick=buyTurretHpUpgrade;
damageUpgrade.onclick=buyDamageUpgrade;
regenUpgrade.onclick=buyRegenUpgrade;
ultraTurretUpgrade.onclick=buyUltraTurret;
fireTrailUpgrade.onclick=buyFireTrail;
rapidFireUpgrade.onclick=buyRapidFire;
dualShotUpgrade.onclick=buyDualShot;
playerHpUpgrade.onclick=buyPlayerHp;
document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
document.querySelectorAll('.role').forEach(btn=>btn.addEventListener('click',()=>{chosenRole=btn.dataset.role;document.querySelectorAll('.role').forEach(b=>b.classList.toggle('active',b===btn))}));
addEventListener('keydown',e=>{if(e.key.toLowerCase()==='b'&&!e.repeat){toggleShop();return}if(shopOpen)return;keys[e.key.toLowerCase()]=true;if(e.key===' '&&!e.repeat)spaceDashQueued=true;if(e.key.toLowerCase()==='z'&&!e.repeat)turretQueued=true;if(e.key.toLowerCase()==='e'&&!e.repeat)healQueued=true;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault()});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
addEventListener('blur',()=>{Object.keys(keys).forEach(k=>keys[k]=false);mouse.down=false;spaceDashQueued=false});
document.addEventListener('visibilitychange',()=>{if(document.hidden){Object.keys(keys).forEach(k=>keys[k]=false);mouse.down=false;spaceDashQueued=false}});
canvas.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect();mouse.x=(e.clientX-r.left)*W/r.width;mouse.y=(e.clientY-r.top)*H/r.height});
canvas.addEventListener('mousedown',()=>{
  if(chosenRole==='catclaw'&&running&&!shopOpen){
    const pointer={x:mouse.x+camera.x,y:mouse.y+camera.y};let target=null,best=Infinity;
    enemies.forEach(e=>{const d=dist(pointer,e);if(e.hp>0&&!e.friendly&&d<e.r+18&&d<best){best=d;target=e}});
    if(target){catTarget=target;mouse.down=false;notice=target.boss?tr('TYTAN ZAZNACZONY — ODPORNY','TITAN SELECTED — IMMUNE'):tr('CEL ZAZNACZONY — NACIŚNIJ E','TARGET LOCKED — PRESS E');noticeTime=1.5;return}
  }
  mouse.down=true;
});addEventListener('mouseup',()=>mouse.down=false);
setLanguage('pl');reset();running=false;requestAnimationFrame(loop);
