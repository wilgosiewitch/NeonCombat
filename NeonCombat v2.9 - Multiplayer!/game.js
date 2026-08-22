const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const gameShell = document.querySelector('.game-shell');
const arenaWrap = document.querySelector('.arena-wrap');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOver');
const finalStats = document.getElementById('finalStats');
const gemBalance = document.getElementById('gemBalance');
const gemShopBalance = document.getElementById('gemShopBalance');
const highscoreValue = document.getElementById('highscoreValue');
const buyDoubleGemsBtn = document.getElementById('buyDoubleGemsBtn');
const buyDoubleEnergyBtn = document.getElementById('buyDoubleEnergyBtn');
const devConsole = document.getElementById('devConsole');
const devConsoleForm = document.getElementById('devConsoleForm');
const devConsoleInput = document.getElementById('devConsoleInput');
const devConsoleStatus = document.getElementById('devConsoleStatus');
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
const turretRegenUpgrade = document.getElementById('turretRegenUpgrade');
const pauseScreen = document.getElementById('pauseScreen');
const gameVolume = document.getElementById('gameVolume');
const gameVolumeValue = document.getElementById('gameVolumeValue');
const musicVolumeSlider = document.getElementById('musicVolume');
const musicVolumeValue = document.getElementById('musicVolumeValue');
const lobbyGameVolume = document.getElementById('lobbyGameVolume');
const lobbyGameVolumeValue = document.getElementById('lobbyGameVolumeValue');
const lobbyMusicVolume = document.getElementById('lobbyMusicVolume');
const lobbyMusicVolumeValue = document.getElementById('lobbyMusicVolumeValue');
const soloModeBtn=document.getElementById('soloModeBtn');
const hostModeBtn=document.getElementById('hostModeBtn');
const joinModeBtn=document.getElementById('joinModeBtn');
const multiplayerExchange=document.getElementById('multiplayerExchange');
const networkStatus=document.getElementById('networkStatus');
const networkInputLabel=document.getElementById('networkInputLabel');
const networkInput=document.getElementById('networkInput');
const networkOutput=document.getElementById('networkOutput');
const networkActionBtn=document.getElementById('networkActionBtn');
const copyNetworkCodeBtn=document.getElementById('copyNetworkCodeBtn');
let masterVolume=1;
let musicVolume=1;
const playerBulletSounds=Array.from({length:16},()=>{
  const sound=new Audio('Assets/Audio/Sounds/PlayerBulletSound.wav');
  sound.preload='auto';
  sound.volume=masterVolume;
  return sound;
});
const gameOverSound=new Audio('Assets/Audio/Sounds/GameOverSound.wav');
gameOverSound.preload='auto';
gameOverSound.volume=masterVolume;
const dashSound=new Audio('Assets/Audio/Sounds/Dash.mp3');
dashSound.preload='auto';
dashSound.volume=masterVolume;
function playDashSound(){
  dashSound.currentTime=0;
  dashSound.play().catch(()=>{});
}
const catTeleportSound=new Audio('Assets/Audio/Sounds/KociPTP.mp3');
catTeleportSound.preload='auto';
catTeleportSound.volume=masterVolume;
function playCatTeleportSound(){
  catTeleportSound.currentTime=0;
  catTeleportSound.play().catch(()=>{});
}
const setTrapSound=new Audio('Assets/Audio/Sounds/SetTrap.mp3');
setTrapSound.preload='auto';
setTrapSound.volume=masterVolume;
function playSetTrapSound(){
  setTrapSound.currentTime=0;
  setTrapSound.play().catch(()=>{});
}
const shieldOnSound=new Audio('Assets/Audio/Sounds/ShieldOn.mp3');
shieldOnSound.preload='auto';
shieldOnSound.volume=masterVolume;
function playShieldOnSound(){
  shieldOnSound.currentTime=0;
  shieldOnSound.play().catch(()=>{});
}
const shieldProtectedSounds=['ShieldProtected.mp3','ShieldProtected2.mp3','ShieldProtected3.mp3','ShieldProtected4.mp3','ShieldProtected5.mp3'].map(file=>{
  const sound=new Audio(`Assets/Audio/Sounds/${file}`);
  sound.preload='auto';
  sound.volume=masterVolume;
  return sound;
});
function playShieldProtectedSound(){
  const sound=shieldProtectedSounds[Math.floor(Math.random()*shieldProtectedSounds.length)];
  sound.currentTime=0;
  sound.play().catch(()=>{});
}
const electricitySounds=[1,2].map(number=>{
  const sound=new Audio(`Assets/Audio/Sounds/Electricy${number}.mp3`);
  sound.preload='auto';
  sound.volume=masterVolume;
  return sound;
});
let nextElectricitySound=0;
function playElectricitySound(){
  const sound=electricitySounds[nextElectricitySound];
  nextElectricitySound=(nextElectricitySound+1)%electricitySounds.length;
  sound.currentTime=0;
  sound.play().catch(()=>{});
}
const menuClickSounds=Array.from({length:6},()=>{
  const sound=new Audio('Assets/Audio/Sounds/MenuClickSound.wav');
  sound.preload='auto';
  sound.volume=masterVolume;
  return sound;
});
let nextMenuClickSound=0;
function playMenuClickSound(){
  const sound=menuClickSounds[nextMenuClickSound];
  nextMenuClickSound=(nextMenuClickSound+1)%menuClickSounds.length;
  sound.currentTime=0;
  sound.play().catch(()=>{});
}
const shopBuyingSound=new Audio('Assets/Audio/Sounds/BuyingInRoundShopSound.wav');
shopBuyingSound.preload='auto';
shopBuyingSound.volume=masterVolume;
function playShopBuyingSound(){
  shopBuyingSound.currentTime=0;
  shopBuyingSound.play().catch(()=>{});
}
const playerDamageSounds=[1,2,3].map(number=>{
  const sound=new Audio(`Assets/Audio/Sounds/PlayerDamagedSound${number}.wav`);
  sound.preload='auto';
  sound.volume=masterVolume;
  return sound;
});
let lastPlayerDamageSound=-1;
function playPlayerDamageSound(){
  let index=Math.floor(Math.random()*playerDamageSounds.length);
  if(index===lastPlayerDamageSound)index=(index+1+Math.floor(Math.random()*2))%playerDamageSounds.length;
  lastPlayerDamageSound=index;
  const sound=playerDamageSounds[index];
  sound.currentTime=0;
  sound.play().catch(()=>{});
}
const towerBuildingSounds=Array.from({length:4},()=>{
  const first=new Audio('Assets/Audio/Sounds/BuiildingTowerFirstPhase.wav');
  const second=new Audio('Assets/Audio/Sounds/BuildingTower2thPhase.wav');
  first.preload='auto';second.preload='auto';first.volume=masterVolume;second.volume=masterVolume;
  return {first,second};
});
let nextTowerBuildingSound=0;
function playTowerBuildingSound(){
  const {first,second}=towerBuildingSounds[nextTowerBuildingSound];
  nextTowerBuildingSound=(nextTowerBuildingSound+1)%towerBuildingSounds.length;
  first.pause();second.pause();first.currentTime=0;second.currentTime=0;
  first.onended=()=>{second.currentTime=0;second.play().catch(()=>{})};
  first.play().catch(()=>{});
}
const commonTowerShotSounds=Array.from({length:24},()=>{
  const sound=new Audio('Assets/Audio/Sounds/CommonTowerShotSound.mp3');
  sound.preload='auto';
  sound.volume=masterVolume;
  return sound;
});
let nextCommonTowerShotSound=0;
function playCommonTowerShotSound(){
  const sound=commonTowerShotSounds[nextCommonTowerShotSound];
  nextCommonTowerShotSound=(nextCommonTowerShotSound+1)%commonTowerShotSounds.length;
  sound.currentTime=0;
  sound.play().catch(()=>{});
}
const brokenCommonTowerSounds=Array.from({length:4},()=>{
  const sound=new Audio('Assets/Audio/Sounds/BrokenCommonTower.wav');
  sound.preload='auto';
  sound.volume=masterVolume;
  return sound;
});
let nextBrokenCommonTowerSound=0;
function playBrokenCommonTowerSound(){
  const sound=brokenCommonTowerSounds[nextBrokenCommonTowerSound];
  nextBrokenCommonTowerSound=(nextBrokenCommonTowerSound+1)%brokenCommonTowerSounds.length;
  sound.currentTime=0;
  sound.play().catch(()=>{});
}
const redBossLaserSounds=Array.from({length:3},()=>{
  const sound=new Audio('Assets/Audio/Sounds/RedBossLaser.wav');
  sound.preload='auto';
  sound.volume=masterVolume;
  return sound;
});
let nextRedBossLaserSound=0;
function playRedBossLaserSound(){
  const sound=redBossLaserSounds[nextRedBossLaserSound];
  nextRedBossLaserSound=(nextRedBossLaserSound+1)%redBossLaserSounds.length;
  sound.currentTime=0;
  sound.play().catch(()=>{});
}
const redBossDeadSound=new Audio('Assets/Audio/Sounds/RedBossDeadSound.wav');
redBossDeadSound.preload='auto';
redBossDeadSound.volume=masterVolume;
function playRedBossDeadSound(){
  redBossDeadSound.currentTime=0;
  redBossDeadSound.play().catch(()=>{});
}
const lobbyMusicTracks=[1,2].map(number=>{
  const track=new Audio(`Assets/Audio/Music/MainMenuMusic${number}.mp3`);
  track.preload='auto';
  track.volume=musicVolume;
  return track;
});
let lobbyMusicActive=true;
let currentLobbyMusic=-1;
function playLobbyMusic(index){
  if(!lobbyMusicActive)return;
  if(typeof index!=='number')index=currentLobbyMusic<0?Math.floor(Math.random()*lobbyMusicTracks.length):(currentLobbyMusic+1)%lobbyMusicTracks.length;
  lobbyMusicTracks.forEach((track,i)=>{if(i!==index){track.pause();track.currentTime=0}});
  currentLobbyMusic=index;
  const track=lobbyMusicTracks[index];
  track.currentTime=0;
  track.play().catch(()=>{});
}
function ensureLobbyMusic(){
  if(lobbyMusicActive&&(currentLobbyMusic<0||lobbyMusicTracks[currentLobbyMusic].paused))playLobbyMusic(currentLobbyMusic<0?undefined:currentLobbyMusic);
}
function stopLobbyMusic(){
  lobbyMusicActive=false;
  lobbyMusicTracks.forEach(track=>{track.pause();track.currentTime=0});
  currentLobbyMusic=-1;
}
lobbyMusicTracks.forEach((track,index)=>track.addEventListener('ended',()=>{if(lobbyMusicActive)playLobbyMusic((index+1)%lobbyMusicTracks.length)}));
const inGameMusicTracks=[1,2,3].map(number=>{
  const track=new Audio(`Assets/Audio/Music/ingamemusic${number}.mp3`);
  track.preload='auto';
  track.volume=musicVolume*.5;
  return track;
});
let inGameMusicActive=false;
let currentInGameMusic=-1;
function playInGameMusic(index){
  if(!inGameMusicActive)return;
  if(typeof index!=='number')index=currentInGameMusic<0?Math.floor(Math.random()*inGameMusicTracks.length):(currentInGameMusic+1)%inGameMusicTracks.length;
  inGameMusicTracks.forEach((track,i)=>{if(i!==index){track.pause();track.currentTime=0}});
  currentInGameMusic=index;
  const track=inGameMusicTracks[index];
  track.currentTime=0;
  track.play().catch(()=>{});
}
function stopInGameMusic(){
  inGameMusicActive=false;
  inGameMusicTracks.forEach(track=>{track.pause();track.currentTime=0});
  currentInGameMusic=-1;
}
inGameMusicTracks.forEach((track,index)=>track.addEventListener('ended',()=>{if(inGameMusicActive)playInGameMusic((index+1)%inGameMusicTracks.length)}));
const enemyShotSoundFiles=['AllShootingEnemisieBullets.wav','EnemyShot.mp3','EnemyShot2.mp3'];
const enemyShotSounds=enemyShotSoundFiles.map(file=>Array.from({length:12},()=>{
  const sound=new Audio(`Assets/Audio/Sounds/${file}`);
  sound.preload='auto';
  sound.volume=masterVolume*.7;
  return sound;
}));
const nextEnemyShotSound=[0,0,0];
function playEnemyShotSound(){
  const variant=Math.floor(Math.random()*enemyShotSounds.length);
  const sounds=enemyShotSounds[variant];
  const sound=sounds[nextEnemyShotSound[variant]];
  nextEnemyShotSound[variant]=(nextEnemyShotSound[variant]+1)%sounds.length;
  sound.currentTime=0;
  sound.play().catch(()=>{});
}
let nextPlayerBulletSound=0;
function playPlayerBulletSound(){
  const sound=playerBulletSounds[nextPlayerBulletSound];
  nextPlayerBulletSound=(nextPlayerBulletSound+1)%playerBulletSounds.length;
  sound.currentTime=0;
  sound.play().catch(()=>{});
}
let language='en';
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
translations.pl.turret_upgrade='ulepsz wieżyczkę';
translations.en.turret_upgrade='upgrade turret';
translations.pl.turret_regen_title='AUTONAPRAWA WIEŻYCZEK';
translations.pl.turret_regen_desc='Wszystkie zwykłe wieżyczki regenerują 1 HP co 5 sekund.';
translations.en.turret_regen_title='TURRET AUTO-REPAIR';
translations.en.turret_regen_desc='All regular turrets regenerate 1 HP every 5 seconds.';
translations.pl.damage_desc='10 poziomów. Każdy zwiększa obrażenia postaci o 0,3×.';
translations.en.damage_desc='10 levels. Each increases character damage by 0.3×.';
translations.pl.fire_trail_title='TOR OGNIA';
translations.pl.fire_trail_desc='15 poziomów. Każdy zwiększa obrażenia ognia o 0,2×.';
translations.en.fire_trail_title='FIRE TRAIL';
translations.en.fire_trail_desc='15 levels. Each increases fire damage by 0.2×.';
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
translations.pl.player_hp_desc='10 poziomów. Każdy zwiększa maksymalne zdrowie gracza o 10 HP.';
translations.en.player_hp_title='ARMOR BOOST';
translations.en.player_hp_desc='10 levels. Each increases the player maximum health by 10 HP.';
translations.pl.role_catclaw='KOCI PAZUR';
translations.pl.desc_catclaw='Ruch ×1,25 • Kliknij wroga • [E] Skok co 7 s';
translations.en.role_catclaw='CAT CLAW';
translations.en.desc_catclaw='Movement ×1.25 • Click an enemy • [E] Leap every 7s';
translations.pl.role_assault='SZTURMOWIEC';
translations.pl.desc_assault='85 HP • szybkostrzelność ×1,5 • [E] Zmiana broni';
translations.en.role_assault='ASSAULT TROOPER';
translations.en.desc_assault='85 HP • fire rate ×1.5 • [E] Switch weapon';
translations.pl.pause_status='GRA WSTRZYMANA';
translations.en.pause_status='GAME PAUSED';
translations.pl.pause_title='MENU';
translations.en.pause_title='MENU';
translations.pl.game_volume='DŹWIĘKI GRY';
translations.en.game_volume='GAME SOUNDS';
translations.pl.music_volume='GŁOŚNOŚĆ MUZYKI';
translations.en.music_volume='MUSIC VOLUME';
translations.pl.resume_game='WRÓĆ DO GRY';
translations.en.resume_game='RESUME GAME';
translations.pl.enter_lobby='WEJDŹ DO LOBBY';
translations.en.enter_lobby='ENTER LOBBY';
translations.pl.gems='KLEJNOTY';
translations.en.gems='GEMS';
translations.pl.gem_shop='BUFF SHOP';
translations.en.gem_shop='BUFF SHOP';
translations.pl.double_gems_title='PODWÓJNE KLEJNOTY';
translations.en.double_gems_title='DOUBLE GEMS';
translations.pl.double_gems_desc='Dwa razy więcej klejnotów za następną rundę.';
translations.en.double_gems_desc='Earn twice as many gems from the next round.';
translations.pl.double_energy_title='PODWÓJNA ENERGIA';
translations.en.double_energy_title='DOUBLE ENERGY';
translations.pl.double_energy_desc='Dwa razy więcej energii w następnej rundzie. Z Miliarderem: ×4.';
translations.en.double_energy_desc='Earn twice as much energy in the next round. With Billionaire: ×4.';
translations.pl.highscore='NAJLEPSZY WYNIK';
translations.en.highscore='HIGH SCORE';
translations.pl.role_alchemist='ALCHEMIK';
translations.pl.desc_alchemist='80 HP • losowy efekt obszarowy co 5 s';
translations.en.role_alchemist='ALCHEMIST';
translations.en.desc_alchemist='80 HP • random area effect every 5s';
translations.pl.role_sapper='SAPER';
translations.pl.desc_sapper='105 HP • [E] wybuch • bez żółtych wrogów';
translations.en.role_sapper='SAPPER';
translations.en.desc_sapper='105 HP • [E] explosion • no yellow enemies';
translations.pl.role_necromancer='NEKROMANTA';
translations.pl.desc_necromancer='75 HP • 50% szansy na wskrzeszenie wroga';
translations.en.role_necromancer='NECROMANCER';
translations.en.desc_necromancer='75 HP • 50% chance to raise a defeated enemy';
Object.assign(translations.pl,{difficulty_title:'POZIOM TRUDNOŚCI',difficulty_easy:'ŁATWY',difficulty_easy_desc:'Klejnoty ×0,5 • wrogowie ×0,5',difficulty_normal:'NORMALNY',difficulty_normal_desc:'Standardowe zasady • klejnoty ×1',difficulty_hard:'TRUDNY',difficulty_hard_desc:'Klejnoty, wrogowie, HP i obrażenia ×1,5',difficulty_mad:'SZALONY',difficulty_mad_desc:'Klejnoty ×3 • wrogowie, HP i obrażenia ×2'});
Object.assign(translations.en,{difficulty_title:'DIFFICULTY',difficulty_easy:'EASY',difficulty_easy_desc:'Gems ×0.5 • enemies ×0.5',difficulty_normal:'NORMAL',difficulty_normal_desc:'Standard rules • gems ×1',difficulty_hard:'HARD',difficulty_hard_desc:'Gems, enemies, HP and damage ×1.5',difficulty_mad:'INSANE',difficulty_mad_desc:'Gems ×3 • enemies, HP and damage ×2'});
const tr=(pl,en)=>language==='pl'?pl:en;
function setLanguage(next){language=next;document.documentElement.lang=next;document.querySelectorAll('[data-i18n]').forEach(el=>el.innerHTML=translations[next][el.dataset.i18n]);document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===next));updateGemBalance();updateHighscore();updatePaidRoles();updateDoubleGemsBuff();updateDoubleEnergyBuff();}

const GEM_STORAGE_KEY='neonStormGems';
const HIGHSCORE_STORAGE_KEY='neonStormHighscore';
const LEGACY_DEV_GEM_GRANT_KEY='neonStormDevGrant10000';
const DOUBLE_GEMS_STORAGE_KEY='neonStormDoubleGemsPending';
const DOUBLE_ENERGY_STORAGE_KEY='neonStormDoubleEnergyPending';
const LOCAL_DEV_HOSTS=new Set(['localhost','127.0.0.1','[::1]','::1','0.0.0.0']);
const IS_LOCAL_DEV=location.protocol==='file:'||LOCAL_DEV_HOSTS.has(location.hostname)||location.hostname.endsWith('.localhost');
let pendingDevEnergy=null;
devConsole.hidden=!IS_LOCAL_DEV;
devConsoleForm.addEventListener('submit',event=>{
  event.preventDefault();
  if(!IS_LOCAL_DEV)return;
  const command=devConsoleInput.value.trim(),match=/^(energy|gems)\s+(\d+)$/i.exec(command);
  if(!match){devConsoleStatus.textContent='ERROR: USE energy <amount> OR gems <amount>';return}
  const type=match[1].toLowerCase(),amount=Number(match[2]);
  if(!Number.isSafeInteger(amount)||amount<0||amount>1_000_000_000){devConsoleStatus.textContent='ERROR: AMOUNT 0–1000000000';return}
  if(type==='energy'){
    pendingDevEnergy=amount;devConsoleStatus.textContent=`QUEUED: ${amount} ENERGY FOR NEXT ROUND`;
  }else{
    if(!Number.isSafeInteger(gems+amount)||gems+amount>1_000_000_000){devConsoleStatus.textContent='ERROR: GEM BALANCE LIMIT 1000000000';return}
    gems+=amount;try{localStorage.setItem(GEM_STORAGE_KEY,String(gems))}catch{}updateGemBalance();updatePaidRoles();updateDoubleGemsBuff();updateDoubleEnergyBuff();devConsoleStatus.textContent=`ADDED: ${amount} GEMS • BALANCE: ${gems}`;
  }
  devConsoleInput.value='';
});
const PAID_ROLES={
  electrician:{price:150,storageKey:'neonStormElectricianUnlocked'},assault:{price:300,storageKey:'neonStormAssaultUnlocked'},sapper:{price:600,storageKey:'neonStormSapperUnlocked'},ninja:{price:700,storageKey:'neonStormNinjaUnlocked'},
  billionaire:{price:800,storageKey:'neonStormBillionaireUnlocked'},assassin:{price:900,storageKey:'neonStormAssassinUnlocked'},catclaw:{price:900,storageKey:'neonStormCatClawUnlocked'},necromancer:{price:1000,storageKey:'neonStormNecromancerUnlocked'},
  manipulator:{price:1200,storageKey:'neonStormManipulatorUnlocked'},alchemist:{price:1200,storageKey:'neonStormAlchemistUnlocked'},engineer:{price:1350,storageKey:'neonStormEngineerUnlocked'},madman:{price:1800,storageKey:'neonStormMadmanUnlocked'}
};
function loadGems(){
  try{
    const stored=Number.parseInt(localStorage.getItem(GEM_STORAGE_KEY),10);let balance=Number.isSafeInteger(stored)&&stored>=0?stored:0;
    if(localStorage.getItem(LEGACY_DEV_GEM_GRANT_KEY)==='true'){balance=Math.max(0,balance-10000);localStorage.setItem(GEM_STORAGE_KEY,String(balance));localStorage.removeItem(LEGACY_DEV_GEM_GRANT_KEY)}
    return balance;
  }catch{return 0}
}
let gems=loadGems();
function loadHighscore(){try{const stored=Number.parseInt(localStorage.getItem(HIGHSCORE_STORAGE_KEY),10);return Number.isSafeInteger(stored)&&stored>=0?stored:0}catch{return 0}}
let highscore=loadHighscore();
function loadDoubleGemsBuff(){try{return localStorage.getItem(DOUBLE_GEMS_STORAGE_KEY)==='true'||localStorage.getItem('neonStormDoubleScorePending')==='true'}catch{return false}}
function loadDoubleEnergyBuff(){try{return localStorage.getItem(DOUBLE_ENERGY_STORAGE_KEY)==='true'}catch{return false}}
let doubleGemsPending=loadDoubleGemsBuff(),doubleEnergyPending=loadDoubleEnergyBuff(),gemMultiplier=1,energyBuffMultiplier=1;
const DIFFICULTIES={
  easy:{gems:.5,spawn:.5,hp:1,damage:1},
  normal:{gems:1,spawn:1,hp:1,damage:1},
  hard:{gems:1.5,spawn:1.5,hp:1.5,damage:1.5},
  mad:{gems:3,spawn:2,hp:2,damage:2}
};
let chosenDifficulty='normal';
const unlockedRoles={};
Object.entries(PAID_ROLES).forEach(([role,config])=>{try{unlockedRoles[role]=localStorage.getItem(config.storageKey)==='true'}catch{unlockedRoles[role]=false}});
function updateGemBalance(){const formatted=gems.toLocaleString(language==='pl'?'pl-PL':'en-US');gemBalance.textContent=formatted;gemShopBalance.textContent=formatted}
function updateHighscore(){highscoreValue.textContent=highscore.toLocaleString(language==='pl'?'pl-PL':'en-US')}
function updateDoubleGemsBuff(){
  buyDoubleGemsBtn.disabled=doubleGemsPending||gems<750;
  buyDoubleGemsBtn.textContent=doubleGemsPending?tr('GOTOWY NA NASTĘPNĄ RUNDĘ','READY FOR NEXT ROUND'):'◆ 750';
}
function updateDoubleEnergyBuff(){
  buyDoubleEnergyBtn.disabled=doubleEnergyPending||gems<1000;
  buyDoubleEnergyBtn.textContent=doubleEnergyPending?tr('GOTOWY NA NASTĘPNĄ RUNDĘ','READY FOR NEXT ROUND'):'◆ 1000';
}
function updatePaidRoles(){
  Object.entries(PAID_ROLES).forEach(([role,config])=>{
    const roleButton=document.querySelector(`[data-role="${role}"]`),unlocked=unlockedRoles[role];
    roleButton.classList.toggle('locked',!unlocked);roleButton.setAttribute('aria-disabled',String(!unlocked));
    const lock=roleButton.querySelector('.role-lock');lock.hidden=unlocked;lock.textContent=`${tr('KUP','BUY')} ◆ ${config.price}`;
  });
}
function awardGems(amount){
  const earned=Math.max(0,Math.floor(amount));gems+=earned;
  try{localStorage.setItem(GEM_STORAGE_KEY,String(gems))}catch{}
  updateGemBalance();updatePaidRoles();updateDoubleGemsBuff();updateDoubleEnergyBuff();return earned;
}
function buyRole(role){
  const config=PAID_ROLES[role];if(!config||unlockedRoles[role])return true;
  if(gems<config.price)return false;
  gems-=config.price;unlockedRoles[role]=true;
  try{localStorage.setItem(GEM_STORAGE_KEY,String(gems));localStorage.setItem(config.storageKey,'true')}catch{}
  updateGemBalance();updatePaidRoles();updateDoubleGemsBuff();updateDoubleEnergyBuff();return true;
}
function buyDoubleGemsBuff(){
  if(doubleGemsPending||gems<750)return;
  gems-=750;doubleGemsPending=true;
  try{localStorage.setItem(GEM_STORAGE_KEY,String(gems));localStorage.setItem(DOUBLE_GEMS_STORAGE_KEY,'true')}catch{}
  updateGemBalance();updatePaidRoles();updateDoubleGemsBuff();updateDoubleEnergyBuff();
}
function buyDoubleEnergyBuff(){
  if(doubleEnergyPending||gems<1000)return;
  gems-=1000;doubleEnergyPending=true;
  try{localStorage.setItem(GEM_STORAGE_KEY,String(gems));localStorage.setItem(DOUBLE_ENERGY_STORAGE_KEY,'true')}catch{}
  updateGemBalance();updatePaidRoles();updateDoubleGemsBuff();updateDoubleEnergyBuff();
}
function addScore(amount){score+=amount}
updateGemBalance();
updateHighscore();
updatePaidRoles();
updateDoubleGemsBuff();
updateDoubleEnergyBuff();

const W = 1280, H = 720, WORLD_W = 3400, WORLD_H = 2400;
const PLAYER_START = {x:WORLD_W/2,y:WORLD_H/2};
function fitGameToScreen(){
  const shellStyle=getComputedStyle(gameShell);
  const horizontalPadding=parseFloat(shellStyle.paddingLeft)+parseFloat(shellStyle.paddingRight);
  const verticalPadding=parseFloat(shellStyle.paddingTop)+parseFloat(shellStyle.paddingBottom);
  const headerHeight=document.querySelector('header').offsetHeight;
  const footerHeight=document.querySelector('footer').offsetHeight;
  const arenaMargins=parseFloat(getComputedStyle(arenaWrap).marginTop)+parseFloat(getComputedStyle(arenaWrap).marginBottom);
  const availableWidth=Math.max(1,gameShell.clientWidth-horizontalPadding);
  const availableHeight=Math.max(1,gameShell.clientHeight-verticalPadding-headerHeight-footerHeight-arenaMargins);
  const scale=Math.min(availableWidth/W,availableHeight/H);
  arenaWrap.style.setProperty('--game-scale',scale);
  arenaWrap.style.width=`${Math.floor(W*scale)}px`;
  arenaWrap.style.height=`${Math.floor(H*scale)}px`;
}
addEventListener('resize',fitGameToScreen,{passive:true});
addEventListener('orientationchange',fitGameToScreen,{passive:true});
if(window.visualViewport)window.visualViewport.addEventListener('resize',fitGameToScreen,{passive:true});
if(document.fonts)document.fonts.ready.then(fitGameToScreen);
const keys = {}, mouse = { x: W/2, y:H/2, down:false };
let player, remotePlayer, bullets, enemies, particles, explosions, enemyBullets, pickups, obstacles, turrets, traps, lightningEffects, catLaserEffects, alchemyFields, bossWaves, camera, score, credits, wave, kills, running, last, spawnTimer, eliteRespawn, yellowRespawn, bossTriggered, redBossPending, bossSpawnTimer, bossSpawnPoint, bossSpawnKind, bossPurgeTimer, bossFightActive, upgradePurchaseCount, upgradeBossTriggered, upgradeBossPending, enemySpawnMultiplier, shake, flash, notice, noticeTime, visualTime;
let spaceDashQueued = false;
let turretQueued = false;
let selectedTurret = null;
let healQueued = false, chosenRole = 'medic';
let shopOpen = false;
let pauseOpen = false;
let turretHpMultiplier = 1;
let playerDamageMultiplier = 1, damageUpgradeLevel = 0, healthRegen = false;
let ultraTurretPurchased = false;
let fireTrailUpgradeLevel = 0, fireTrail, fireTrailSpawn;
let rapidFirePurchased = false;
let dualShotPurchased = false;
let playerHpUpgradeLevel = 0;
let turretRegenPurchased = false;
let catTarget = null;
let turretEscapeTimer = 0;
const TURRET_COST = 180;
const TURRET_UPGRADE_COST = 400;

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const rand=(a,b)=>a+Math.random()*(b-a);
const energyReward=amount=>amount*(chosenRole==='billionaire'?2:1)*energyBuffMultiplier;
const turretUnderPointer=()=>{
  if(!turrets||!camera)return null;
  const pointer={x:mouse.x+camera.x,y:mouse.y+camera.y};
  let target=null,best=Infinity;
  turrets.forEach(t=>{const d=dist(pointer,t);if(!t.ultra&&t.hp>0&&d<t.r+18&&d<best){target=t;best=d}});
  return target;
};
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
function turretBlocksPlayer(o,r,oldX,oldY){
  if(o!==player||!turrets)return false;
  return turrets.some(t=>{
    if(t.hp<=0)return false;
    const minimumDistance=r+t.r+4;
    const newDistance=Math.hypot(o.x-t.x,o.y-t.y);
    if(newDistance>=minimumDistance)return false;
    const oldDistance=Math.hypot(oldX-t.x,oldY-t.y);
    return oldDistance>=minimumDistance||newDistance<=oldDistance;
  });
}
const playerInsideTurret=()=>turrets.some(t=>t.hp>0&&dist(player,t)<player.r+t.r+4);
const freePlayerPosition=position=>position.x>player.r+24&&position.x<WORLD_W-player.r-24&&position.y>player.r+24&&position.y<WORLD_H-player.r-24&&!blocked(position,player.r)&&!turrets.some(t=>t.hp>0&&dist(position,t)<player.r+t.r+4);
function ejectPlayerFromTurret(){
  const origin={x:player.x,y:player.y},maximumRadius=Math.hypot(WORLD_W,WORLD_H);
  for(let radius=30;radius<=maximumRadius;radius+=18){
    const steps=Math.max(16,Math.ceil(Math.PI*2*radius/18));
    for(let i=0;i<steps;i++){
      const angle=i*Math.PI*2/steps,position={x:origin.x+Math.cos(angle)*radius,y:origin.y+Math.sin(angle)*radius};
      if(freePlayerPosition(position)){
        player.x=position.x;player.y=position.y;player.inv=Math.max(player.inv,.5);turretEscapeTimer=0;
        burst(player.x,player.y,'#ffd84d',22);notice=tr('PRZENIESIONO W BEZPIECZNE MIEJSCE','MOVED TO A SAFE POSITION');noticeTime=1.8;return;
      }
    }
  }
}
function moveBody(o,vx,vy,r,dt){
  const oldX=o.x;o.x=clamp(o.x+vx*dt,r+24,WORLD_W-r-24);if(blocked(o,r)||turretBlocksPlayer(o,r,oldX,o.y))o.x=oldX;
  const oldY=o.y;o.y=clamp(o.y+vy*dt,r+24,WORLD_H-r-24);if(blocked(o,r)||turretBlocksPlayer(o,r,o.x,oldY))o.y=oldY;
}
const clearPath=(a,b,r)=>!obstacles.some(w=>segmentHitsRect(a,b,w,r+5));
function findEnemyPath(start,target,r){
  if(clearPath(start,target,r))return [{x:target.x,y:target.y}];
  const margin=r+30,nodes=[{x:start.x,y:start.y},{x:target.x,y:target.y}];
  obstacles.forEach(w=>{
    [[w.x-margin,w.y-margin],[w.x+w.w+margin,w.y-margin],[w.x-margin,w.y+w.h+margin],[w.x+w.w+margin,w.y+w.h+margin]].forEach(([x,y])=>{
      const point={x:clamp(x,r+25,WORLD_W-r-25),y:clamp(y,r+25,WORLD_H-r-25)};
      if(!blocked(point,r+10))nodes.push(point);
    });
  });
  const count=nodes.length,cost=Array(count).fill(Infinity),previous=Array(count).fill(-1),visited=Array(count).fill(false);cost[0]=0;
  for(let step=0;step<count;step++){
    let current=-1;
    for(let i=0;i<count;i++)if(!visited[i]&&(current<0||cost[i]<cost[current]))current=i;
    if(current<0||cost[current]===Infinity||current===1)break;
    visited[current]=true;
    for(let next=1;next<count;next++)if(!visited[next]&&clearPath(nodes[current],nodes[next],r)){
      const nextCost=cost[current]+dist(nodes[current],nodes[next]);
      if(nextCost<cost[next]){cost[next]=nextCost;previous[next]=current}
    }
  }
  if(previous[1]<0)return [];
  const path=[];let current=1;
  while(current>0){path.unshift(nodes[current]);current=previous[current]}
  return path;
}
function moveEnemyToward(enemy,target,speed,dt){
  enemy.pathTimer=(enemy.pathTimer||0)-dt;
  if(enemy.pathTimer<=0||!enemy.path){
    enemy.path=findEnemyPath(enemy,target,enemy.r);
    enemy.pathGoal={x:target.x,y:target.y};enemy.pathTimer=.65+Math.random()*.25;
  }
  while(enemy.path.length>1&&(dist(enemy,enemy.path[0])<16||clearPath(enemy,enemy.path[1],enemy.r)))enemy.path.shift();
  const waypoint=enemy.path[0];if(!waypoint)return;
  const angle=Math.atan2(waypoint.y-enemy.y,waypoint.x-enemy.x);enemy.angle=angle;
  moveBody(enemy,Math.cos(angle)*speed,Math.sin(angle)*speed,enemy.r,dt);
}

let networkMode='solo',peerConnection=null,dataChannel=null,networkConnected=false,remoteRole='medic';
let remoteInput={dx:0,dy:0,angle:0,shoot:false,dash:false};
let networkSendTimer=0,networkSnapshotTimer=0;
const encodeSignal=value=>btoa(JSON.stringify(value));
const decodeSignal=value=>JSON.parse(atob(value.trim()));
const waitForIce=pc=>pc.iceGatheringState==='complete'?Promise.resolve():new Promise(resolve=>{
  const done=()=>{if(pc.iceGatheringState==='complete'){pc.removeEventListener('icegatheringstatechange',done);resolve()}};
  pc.addEventListener('icegatheringstatechange',done);setTimeout(resolve,5000);
});
function setNetworkStatus(message,error=false){networkStatus.textContent=message;networkStatus.classList.toggle('network-error',error)}
function closePeer(){
  if(dataChannel)dataChannel.close();if(peerConnection)peerConnection.close();
  dataChannel=null;peerConnection=null;networkConnected=false;remotePlayer=null;
}
function selectNetworkMode(mode){
  closePeer();networkMode=mode;networkInput.value='';networkOutput.value='';copyNetworkCodeBtn.disabled=true;networkActionBtn.disabled=false;
  [soloModeBtn,hostModeBtn,joinModeBtn].forEach((button,index)=>button.classList.toggle('active',['solo','host','join'][index]===mode));
  multiplayerExchange.classList.toggle('hidden',mode==='solo');
  if(mode==='host'){
    networkInputLabel.textContent='KOD ODPOWIEDZI OD DRUGIEGO GRACZA';networkActionBtn.textContent='GENERUJ OFERTĘ';
    setNetworkStatus('Wygeneruj ofertę i wyślij kod drugiemu graczowi.');
  }else if(mode==='join'){
    networkInputLabel.textContent='KOD OFERTY OD HOSTA';networkActionBtn.textContent='UTWÓRZ ODPOWIEDŹ';
    setNetworkStatus('Wklej kod hosta, a następnie utwórz odpowiedź.');
  }
}
function createPeer(){
  const pc=new RTCPeerConnection({iceServers:[]});
  pc.onconnectionstatechange=()=>{
    networkConnected=pc.connectionState==='connected';
    if(networkConnected)setNetworkStatus(networkMode==='host'?'Gracz dołączył. Możesz rozpocząć grę.':'Połączono z hostem. Czekaj na rozpoczęcie gry.');
    else if(['failed','disconnected','closed'].includes(pc.connectionState))setNetworkStatus('Połączenie zostało przerwane.',true);
  };
  return pc;
}
function attachDataChannel(channel){
  dataChannel=channel;dataChannel.onopen=()=>{networkConnected=true;setNetworkStatus(networkMode==='host'?'Gracz dołączył. Możesz rozpocząć grę.':'Połączono z hostem. Czekaj na rozpoczęcie gry.');if(networkMode==='join')sendNetwork({type:'role',role:chosenRole})};
  dataChannel.onclose=()=>{networkConnected=false;setNetworkStatus('Drugi gracz rozłączył się.',true)};
  dataChannel.onmessage=event=>{
    let message;try{message=JSON.parse(event.data)}catch{return}
    if(networkMode==='host'&&message.type==='input')remoteInput=message.input;
    if(networkMode==='host'&&message.type==='role'&&message.role){remoteRole=message.role;createRemotePlayer(remoteRole)}
    if(networkMode==='join'&&message.type==='start'){chosenRole=message.guestRole||chosenRole;running=true;startScreen.classList.add('hidden');gameOverScreen.classList.add('hidden');stopLobbyMusic();inGameMusicActive=true;playInGameMusic()}
    if(networkMode==='join'&&message.type==='state')applyNetworkState(message.state);
    if(networkMode==='join'&&message.type==='end'){running=false;gameOverScreen.classList.remove('hidden');finalStats.textContent=message.stats||'KONIEC GRY'}
  };
}
async function hostNetworkAction(){
  try{
    if(!peerConnection){
      peerConnection=createPeer();attachDataChannel(peerConnection.createDataChannel('neoncombat'));
      await peerConnection.setLocalDescription(await peerConnection.createOffer());await waitForIce(peerConnection);
      networkOutput.value=encodeSignal(peerConnection.localDescription);copyNetworkCodeBtn.disabled=false;
      networkActionBtn.textContent='ZATWIERDŹ ODPOWIEDŹ';setNetworkStatus('Wyślij ofertę. Potem wklej poniżej kod odpowiedzi.');
    }else{
      if(!networkInput.value.trim())throw new Error('Wklej kod odpowiedzi.');
      await peerConnection.setRemoteDescription(decodeSignal(networkInput.value));setNetworkStatus('Łączenie z drugim graczem…');
    }
  }catch(error){setNetworkStatus(`Błąd: ${error.message}`,true)}
}
async function joinNetworkAction(){
  try{
    if(!networkInput.value.trim())throw new Error('Wklej kod oferty hosta.');
    closePeer();peerConnection=createPeer();peerConnection.ondatachannel=event=>attachDataChannel(event.channel);
    await peerConnection.setRemoteDescription(decodeSignal(networkInput.value));
    await peerConnection.setLocalDescription(await peerConnection.createAnswer());await waitForIce(peerConnection);
    networkOutput.value=encodeSignal(peerConnection.localDescription);copyNetworkCodeBtn.disabled=false;
    networkActionBtn.disabled=true;setNetworkStatus('Wyślij ten kod hostowi i poczekaj na połączenie.');
  }catch(error){setNetworkStatus(`Błąd: ${error.message}`,true)}
}
function sendNetwork(message){if(dataChannel&&dataChannel.readyState==='open'){if(message.type==='state'&&dataChannel.bufferedAmount>524288)return;dataChannel.send(JSON.stringify(message))}}
function createRemotePlayer(role='medic'){
  const maxHp=role==='tank'?125:role==='assassin'||role==='necromancer'?75:role==='assault'?85:role==='alchemist'?80:role==='sapper'?105:100;
  remotePlayer={x:PLAYER_START.x+70,y:PLAYER_START.y,r:17,hp:maxHp,maxHp,speed:role==='assassin'?390:role==='catclaw'?325:260,angle:0,moveX:1,moveY:0,fire:0,dash:0,inv:0,role};
}
function updateRemotePlayer(dt){
  if(!remotePlayer)return;remotePlayer.fire-=dt;remotePlayer.dash-=dt;remotePlayer.inv-=dt;
  const dx=remoteInput.dx||0,dy=remoteInput.dy||0,len=Math.hypot(dx,dy)||1;
  if(dx||dy){remotePlayer.moveX=dx/len;remotePlayer.moveY=dy/len}remotePlayer.angle=remoteInput.angle||0;
  if(remoteInput.dash&&remotePlayer.dash<=0){remotePlayer.dash=1.4;remotePlayer.inv=.22;for(let i=0;i<5;i++)moveBody(remotePlayer,remotePlayer.moveX*23,remotePlayer.moveY*23,remotePlayer.r,1)}
  moveBody(remotePlayer,dx/len*remotePlayer.speed,dy/len*remotePlayer.speed,remotePlayer.r,dt);
  if(remoteInput.shoot&&remotePlayer.fire<=0){
    remotePlayer.fire=.115;const a=remotePlayer.angle+rand(-.025,.025);
    bullets.push({x:remotePlayer.x+Math.cos(a)*25,y:remotePlayer.y+Math.sin(a)*25,vx:Math.cos(a)*720,vy:Math.sin(a)*720,life:1.2,remote:true});
  }
  remoteInput.dash=false;
}
function networkState(){return {player,remotePlayer,bullets,enemies,particles:[],explosions:[],enemyBullets,pickups,obstacles,turrets,traps,lightningEffects:[],catLaserEffects:[],alchemyFields,bossWaves:bossWaves.map(w=>({...w,hitTurrets:undefined})),fireTrail,score,credits,wave,kills,shake,flash,notice,noticeTime,visualTime,bossSpawnTimer,bossSpawnPoint}}
function applyNetworkState(state){
  if(!state)return;
  player=state.remotePlayer||player;remotePlayer=state.player||remotePlayer;
  bullets=state.bullets||[];enemies=state.enemies||[];particles=state.particles||[];explosions=state.explosions||[];enemyBullets=state.enemyBullets||[];pickups=state.pickups||[];obstacles=state.obstacles||[];turrets=state.turrets||[];traps=state.traps||[];lightningEffects=state.lightningEffects||[];catLaserEffects=state.catLaserEffects||[];alchemyFields=state.alchemyFields||[];bossWaves=state.bossWaves||[];fireTrail=state.fireTrail||[];
  score=state.score;credits=state.credits;wave=state.wave;kills=state.kills;shake=state.shake;flash=state.flash;notice=state.notice;noticeTime=state.noticeTime;visualTime=state.visualTime;bossSpawnTimer=state.bossSpawnTimer;bossSpawnPoint=state.bossSpawnPoint;
  if(player)camera={x:clamp(player.x-W/2,0,WORLD_W-W),y:clamp(player.y-H/2,0,WORLD_H-H)};
}

function reset(){
  spaceDashQueued=false;turretQueued=false;healQueued=false;selectedTurret=null;catTarget=null;turretEscapeTimer=0;
  shopOpen=false;pauseOpen=false;turretHpMultiplier=1;playerDamageMultiplier=1;damageUpgradeLevel=0;healthRegen=false;ultraTurretPurchased=false;fireTrailUpgradeLevel=0;rapidFirePurchased=false;dualShotPurchased=false;playerHpUpgradeLevel=0;turretRegenPurchased=false;shopScreen.classList.add('hidden');pauseScreen.classList.add('hidden');
  const maxHp=chosenRole==='tank'?125:chosenRole==='assassin'||chosenRole==='necromancer'?75:chosenRole==='assault'?85:chosenRole==='alchemist'?80:chosenRole==='sapper'?105:100;
  player={x:PLAYER_START.x,y:PLAYER_START.y,r:17,hp:maxHp,maxHp,speed:chosenRole==='assassin'?390:chosenRole==='catclaw'?325:260,angle:0,moveX:1,moveY:0,fire:0,dash:0,inv:0,heal:0,invisible:0,ghostCooldown:0,manipulateCooldown:10,manipulateCharges:3,manipulateReady:false,traps:10,trapRecharge:10,reflect:0,ninjaCooldown:0,madmanCooldown:0,catCooldown:0,alchemyCooldown:5,assaultWeapon:'default',assaultSwitch:0,shotgunCooldown:0};
  remotePlayer=null;if(networkMode==='host'&&networkConnected)createRemotePlayer(remoteRole);
  bullets=[]; enemies=[]; particles=[];explosions=[]; enemyBullets=[]; pickups=[];turrets=[];traps=[];lightningEffects=[];catLaserEffects=[];alchemyFields=[];bossWaves=[];fireTrail=[];fireTrailSpawn=0;
  camera={x:player.x-W/2,y:player.y-H/2};
  obstacles=[
    {x:1260,y:880,w:230,h:90},{x:1870,y:850,w:270,h:100},{x:1530,y:570,w:110,h:240},
    {x:1540,y:1450,w:320,h:95},{x:920,y:1230,w:100,h:300},{x:2330,y:1160,w:110,h:330},
    {x:550,y:540,w:300,h:90},{x:2600,y:480,w:270,h:90},{x:500,y:1800,w:340,h:100},
    {x:2580,y:1800,w:330,h:100},{x:1120,y:1930,w:100,h:260},{x:2110,y:1900,w:100,h:280},
    {x:250,y:1050,w:260,h:85},{x:2920,y:1160,w:250,h:85}
  ];
  score=0;credits=pendingDevEnergy??(chosenRole==='billionaire'?500:0);pendingDevEnergy=null;if(IS_LOCAL_DEV)devConsoleStatus.textContent='READY'; wave=1; kills=0; spawnTimer=.4;eliteRespawn=5;yellowRespawn=15;bossTriggered=false;redBossPending=false;bossSpawnTimer=0;bossSpawnPoint=null;bossSpawnKind=null;bossPurgeTimer=0;bossFightActive=false;upgradePurchaseCount=0;upgradeBossTriggered=false;upgradeBossPending=false;enemySpawnMultiplier=DIFFICULTIES[chosenDifficulty].spawn; shake=0; flash=0;notice='';noticeTime=0;visualTime=0; last=performance.now();
}

function resumeWavesAfterRedBoss(){
  playRedBossDeadSound();bossFightActive=false;bossPurgeTimer=0;enemySpawnMultiplier*=1.25;spawnTimer=.25;eliteRespawn=1;
  notice=tr('TYTAN POKONANY — 25% WIĘCEJ WROGÓW','TITAN DEFEATED — 25% MORE ENEMIES');noticeTime=3;
}

function resumeWavesAfterUpgradeBoss(){
  playRedBossDeadSound();bossFightActive=false;bossPurgeTimer=0;bossWaves=[];spawnTimer=.25;eliteRespawn=1;
  notice=tr('WŁADCA FAL POKONANY — WROGOWIE WRACAJĄ','WAVE LORD DEFEATED — ENEMIES RETURN');noticeTime=3;
}

function registerShopUpgradePurchase(){
  upgradePurchaseCount++;
  if(upgradePurchaseCount>=20&&!upgradeBossTriggered)upgradeBossPending=true;
}

function beginUpgradeBossArrival(){
  if(upgradeBossTriggered||bossFightActive||bossSpawnTimer>0)return;
  upgradeBossTriggered=true;upgradeBossPending=false;bossSpawnKind='upgrade';
  bossSpawnPoint={x:WORLD_W/2,y:WORLD_H/2};bossSpawnTimer=4;
  notice=tr('UWAGA: WYKRYTO WŁADCĘ FAL','WARNING: WAVE LORD DETECTED');noticeTime=3;shake=14;
}

function beginBossArrival(){
  bossTriggered=true;
  if(bossFightActive||bossSpawnTimer>0){redBossPending=true;return}
  redBossPending=false;
  bossSpawnKind='red';bossSpawnPoint={x:PLAYER_START.x,y:PLAYER_START.y};bossSpawnTimer=4;
  notice=tr('UWAGA: WYKRYTO ANOMALIĘ','WARNING: ANOMALY DETECTED');noticeTime=3;shake=12;
}

function spawnBoss(){
  const p=bossSpawnPoint||PLAYER_START;
  const waveBoss=bossSpawnKind==='upgrade',hp=waveBoss?1500:1000;
  enemies.push({x:p.x,y:p.y,r:waveBoss?62:48,hp,maxHp:hp,speed:0,shoot:99,laserAngle:0,laserSound:0,closeBeam:0,closeCooldown:0,closeAngle:0,waveCooldown:1.5,angle:0,tank:false,elite:false,boss:true,redBoss:!waveBoss,waveBoss,hit:0});
  bossSpawnTimer=0;bossSpawnPoint=null;bossSpawnKind=null;bossPurgeTimer=3;bossFightActive=true;notice=waveBoss?tr('ALARM: WŁADCA FAL','ALERT: WAVE LORD'):tr('ALARM: CZERWONY TYTAN','ALERT: RED TITAN');noticeTime=3;shake=28;
}

function edgePosition(radius=30){
  for(let attempt=0;attempt<40;attempt++){
    const side=Math.floor(Math.random()*4);let x,y;
    if(side===0){x=rand(camera.x,camera.x+W);y=camera.y-radius-12}if(side===1){x=camera.x+W+radius+12;y=rand(camera.y,camera.y+H)}
    if(side===2){x=rand(camera.x,camera.x+W);y=camera.y+H+radius+12}if(side===3){x=camera.x-radius-12;y=rand(camera.y,camera.y+H)}
    const pos={x:clamp(x,radius+24,WORLD_W-radius-24),y:clamp(y,radius+24,WORLD_H-radius-24)};
    if(!blocked(pos,radius+4))return pos;
  }
  return null;
}

function enemyHealthMultiplier(){
  return DIFFICULTIES[chosenDifficulty].hp*(wave>35?5:wave>20?2:1);
}

function enemyDamageMultiplier(){
  return DIFFICULTIES[chosenDifficulty].damage*(wave>35?4:wave>20?2:1);
}

function spawnElite(){
  const pos=edgePosition(29);if(!pos){eliteRespawn=.3;return}
  const hp=10*enemyHealthMultiplier();
  enemies.push({...pos,r:29,hp,maxHp:hp,speed:105,shoot:1,dodge:0,angle:0,tank:false,elite:true,hit:0});
}

function spawnYellowGroup(){
  const hp=enemyHealthMultiplier(),positions=[];
  for(let i=0;i<3;i++){
    const pos=edgePosition(11);if(!pos){yellowRespawn=.3;return}
    positions.push(pos);
  }
  positions.forEach(pos=>enemies.push({...pos,r:11,hp,maxHp:hp,speed:175,shoot:99,angle:0,tank:false,elite:false,yellow:true,hit:0}));
  yellowRespawn=15;
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
    playCatTeleportSound();
    for(let i=0;i<8;i++){const angle=i*Math.PI/4;catLaserEffects.push({x:origin.x,y:origin.y,angle,life:.18,max:.18})}
    enemies.forEach(e=>{
      if(e===victim||e.hp<=0||e.friendly||e.boss)return;
      const struck=catLaserEffects.some(l=>pointSegmentDist(e,origin,{x:origin.x+Math.cos(l.angle)*4200,y:origin.y+Math.sin(l.angle)*4200})<e.r+10);
      if(struck){e.hp=0;rewardChainedDefeat(e)}
    });
    shake=16;flash=.08;burst(origin.x,origin.y,'#ff405d',20);notice=tr('KOCI PAZUR: OSTRZAŁ ×8','CAT CLAW: EIGHT-WAY BLAST');noticeTime=1.6;return;
  }
  if(chosenRole==='madman'||chosenRole==='sapper'){
    if(player.madmanCooldown>0){notice=tr(`WYBUCH GOTOWY ZA ${Math.ceil(player.madmanCooldown)} S`,`EXPLOSION READY IN ${Math.ceil(player.madmanCooldown)}S`);noticeTime=1.3;return}
    player.madmanCooldown=8;let defeated=0;
    enemies.forEach(e=>{
      if(e.hp<=0||e.friendly||dist(e,player)>185)return;
      e.hp-=15*playerDamageMultiplier;e.hit=.15;burst(e.x,e.y,'#ff9d3d',12);
      if(e.hp<=0){defeated++;credits+=energyReward(e.boss?500:e.elite?150:e.tank?60:30);addScore(e.boss?3000:e.elite?750:e.tank?300:100);kills++;if(e.elite)eliteRespawn=20;if(e.redBoss)resumeWavesAfterRedBoss();if(e.waveBoss)resumeWavesAfterUpgradeBoss();tryRaiseUndead(e)}
    });
    shake=24;flash=.12;explosions.push({x:player.x,y:player.y,life:.65,max:.65,radius:185});burst(player.x,player.y,'#fff3b0',35);burst(player.x,player.y,'#ff9d3d',55);burst(player.x,player.y,'#ff405d',25);notice=defeated?tr(`WYBUCH: POKONANO ${defeated}`,`EXPLOSION: DEFEATED ${defeated}`):tr(`WYBUCH: ${15*playerDamageMultiplier} OBRAŻEŃ`,`EXPLOSION: ${15*playerDamageMultiplier} DAMAGE`);noticeTime=1.4;return;
  }
  if(chosenRole==='ninja'){
    if(player.reflect>0){notice=tr(`ODBICIE AKTYWNE — ${Math.ceil(player.reflect)} S`,`REFLECTION ACTIVE — ${Math.ceil(player.reflect)}S`);noticeTime=1.3;return}
    if(player.ninjaCooldown>0){notice=tr(`ODBICIE GOTOWE ZA ${Math.ceil(player.ninjaCooldown)} S`,`REFLECTION READY IN ${Math.ceil(player.ninjaCooldown)}S`);noticeTime=1.3;return}
    player.reflect=13;player.ninjaCooldown=0;playShieldOnSound();notice=tr('NINJA: ODBICIE AKTYWNE','NINJA: REFLECTION ACTIVE');noticeTime=1.5;burst(player.x,player.y,'#e8f7ff',24);return;
  }
  if(chosenRole==='engineer'){
    if(player.traps<=0){notice=tr(`BRAK PUŁAPEK — NOWA ZA ${Math.ceil(player.trapRecharge)} S`,`NO TRAPS — NEXT IN ${Math.ceil(player.trapRecharge)}S`);noticeTime=1.3;return}
    const pos={x:mouse.x+camera.x,y:mouse.y+camera.y};
    if(pos.x<35||pos.x>WORLD_W-35||pos.y<35||pos.y>WORLD_H-35||blocked(pos,24)){notice=tr('NIE MOŻNA TU POSTAWIĆ PUŁAPKI','CANNOT PLACE A TRAP HERE');noticeTime=1.3;return}
    if(traps.some(t=>dist(t,pos)<48)){notice=tr('WYBIERZ MIEJSCE DALEJ OD INNEJ PUŁAPKI','PLACE IT FARTHER FROM ANOTHER TRAP');noticeTime=1.3;return}
    if(player.traps===10)player.trapRecharge=10;
    player.traps--;traps.push({x:pos.x,y:pos.y,r:24,arm:.45,phase:0});playSetTrapSound();burst(pos.x,pos.y,'#ffd84d',16);notice=tr('PUŁAPKA UZBROJONA','TRAP ARMED');noticeTime=1.2;return;
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
  if(turrets.some(t=>t.hp>0&&dist(t,pos)<65)){notice=tr('NIE MOŻNA STAWIAĆ WIEŻYCZEK NA SOBIE','TURRETS CANNOT BE PLACED ON EACH OTHER');noticeTime=1.8;return}
  if(turrets.filter(t=>t.hp>0&&!t.ultra).length>=11){notice=tr('LIMIT 11 WIEŻYCZEK OSIĄGNIĘTY','11 TURRET LIMIT REACHED');noticeTime=1.5;return}
  if(credits<TURRET_COST){notice=tr(`ZA MAŁO ENERGII — POTRZEBA ${TURRET_COST}`,`NOT ENOUGH ENERGY — NEED ${TURRET_COST}`);noticeTime=1.5;return}
  if(x<45||x>WORLD_W-45||y<45||y>WORLD_H-45||blocked(pos,23)){
    notice=tr('NIE MOŻNA TU POSTAWIĆ WIEŻYCZKI','CANNOT PLACE A TURRET HERE');noticeTime=1.5;return;
  }
  const turretHp=10*turretHpMultiplier;
  credits-=TURRET_COST;turrets.push({x,y,r:21,hp:turretHp,maxHp:turretHp,hit:0,angle:0,fire:.15,range:430,level:1,damageMultiplier:1,fireRateMultiplier:1});
  playTowerBuildingSound();
  burst(x,y,'#58ffd1',22);notice=tr('WIEŻYCZKA AKTYWNA','TURRET ONLINE');noticeTime=1.2;
  if(turrets.filter(t=>t.hp>0&&!t.ultra).length>10&&!bossTriggered)beginBossArrival();
}

function upgradeSelectedTurret(){
  const t=selectedTurret;
  if(!running||shopOpen||pauseOpen||!t||t.ultra||t.hp<=0||!turrets.includes(t))return;
  t.level=t.level||1;
  if(t.level>=5){notice=tr('WIEŻYCZKA MA MAKSYMALNY POZIOM','TURRET IS AT MAXIMUM LEVEL');noticeTime=1.5;return}
  if(credits<TURRET_UPGRADE_COST){notice=tr(`ZA MAŁO ENERGII — POTRZEBA ${TURRET_UPGRADE_COST}`,`NOT ENOUGH ENERGY — NEED ${TURRET_UPGRADE_COST}`);noticeTime=1.5;return}
  credits-=TURRET_UPGRADE_COST;t.level++;
  if(t.level===2){t.hp*=2;t.maxHp*=2}
  else if(t.level===3)t.damageMultiplier=2;
  else if(t.level===4)t.fireRateMultiplier=2;
  else if(t.level===5)t.range*=2;
  burst(t.x,t.y,'#8affdf',28);playShopBuyingSound();
  notice=tr(`WIEŻYCZKA ULEPSZONA — POZIOM ${t.level}`,`TURRET UPGRADED — LEVEL ${t.level}`);noticeTime=1.5;
}

function spawnEnemy(){
  const tank=Math.random()<Math.min(.08+wave*.015,.28);
  const radius=tank?25:18,pos=edgePosition(radius);if(!pos){spawnTimer=.15;return}
  const{x,y}=pos;
  const hp=(tank?5:2)*enemyHealthMultiplier();
  enemies.push({x,y,r:tank?25:18,hp,maxHp:hp,speed:tank?rand(55,75):rand(75,115)+Math.min(wave,25)*1.3,shoot:rand(.5,1.8),angle:0,tank,hit:0});
}

function burst(x,y,color,n=10){
  for(let i=0;i<n;i++){const a=rand(0,Math.PI*2),s=rand(40,220);particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:rand(.15,.55),max:.55,color,size:rand(2,5)})}
}

function tryRaiseUndead(e){
  if(chosenRole!=='necromancer'||e.boss||e.friendly||Math.random()>=.5)return;
  const maxHp=Math.max(.5,e.maxHp*.5);
  enemies.push({...e,hp:maxHp,maxHp,friendly:true,undead:true,allyDamage:.5,shoot:.3,allyDodge:0,freeze:0,burn:0,fireTrailHit:0,hit:.25});
  burst(e.x,e.y,'#1f6b3a',22);notice=tr('NEKROMANCJA: WRÓG WSKRZESZONY','NECROMANCY: ENEMY RAISED');noticeTime=1.2;
}

function rewardChainedDefeat(e){
  credits+=energyReward(e.boss?500:e.elite?150:e.tank?60:30);addScore(e.boss?3000:e.elite?750:e.tank?300:100);kills++;
  if(e.elite)eliteRespawn=20;
  if(e.redBoss)resumeWavesAfterRedBoss();if(e.waveBoss)resumeWavesAfterUpgradeBoss();
  burst(e.x,e.y,e.boss?'#ff193d':e.elite?'#b858ff':e.tank?'#ff9d3d':'#ff405d',e.boss?30:e.elite?18:e.tank?12:8);
  if(Math.random()<.1)pickups.push({x:e.x,y:e.y,r:10,life:8,phase:0});
  tryRaiseUndead(e);
}

function triggerAlchemyEffect(){
  const radius=220,effect=Math.floor(Math.random()*3),nearby=enemies.filter(e=>e.hp>0&&!e.friendly&&dist(e,player)<=radius);
  if(effect===0){nearby.forEach(e=>e.freeze=Math.max(e.freeze||0,3));notice=tr('ALCHEMIA: ZAMROŻENIE','ALCHEMY: FREEZE')}
  else if(effect===1){nearby.forEach(e=>e.burn=Math.max(e.burn||0,5));notice=tr('ALCHEMIA: PODPALENIE','ALCHEMY: IGNITION')}
  else{alchemyFields.push({x:player.x,y:player.y,r:radius,life:5,max:5,playerHealed:0});notice=tr('ALCHEMIA: KRĄG ODNOWY','ALCHEMY: RESTORATION FIELD')}
  burst(player.x,player.y,effect===0?'#79ddff':effect===1?'#ff713d':'#75e85a',28);noticeTime=1.5;
}

function chainLightning(firstTarget,damage){
  const visited=new Set([firstTarget]);let current=firstTarget,soundPlayed=false;
  while(true){
    let next=null,best=220;
    enemies.forEach(candidate=>{const d=dist(current,candidate);if(candidate.hp>0&&!candidate.friendly&&!visited.has(candidate)&&d<best){best=d;next=candidate}});
    if(!next)break;
    if(!soundPlayed){playElectricitySound();soundPlayed=true}
    lightningEffects.push({x1:current.x,y1:current.y,x2:next.x,y2:next.y,life:.14,max:.14});
    visited.add(next);next.hp-=damage;next.hit=.1;addScore(20);burst(next.x,next.y,'#79ddff',2);
    if(next.hp<=0)rewardChainedDefeat(next);
    current=next;
  }
}

function update(dt){
  if(!running||shopOpen||pauseOpen)return;
  if(networkMode==='join'){
    visualTime+=dt;networkSendTimer-=dt;
    if(networkSendTimer<=0){networkSendTimer=1/30;const dx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),dy=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);sendNetwork({type:'input',input:{dx,dy,angle:player?Math.atan2(mouse.y+camera.y-player.y,mouse.x+camera.x-player.x):0,shoot:mouse.down,dash:spaceDashQueued}});spaceDashQueued=false}
    if(player){camera.x=clamp(player.x-W/2,0,WORLD_W-W);camera.y=clamp(player.y-H/2,0,WORLD_H-H)}
    return;
  }
  visualTime+=dt;
  if(networkMode==='host'&&networkConnected){updateRemotePlayer(dt);networkSnapshotTimer-=dt;if(networkSnapshotTimer<=0){networkSnapshotTimer=1/20;sendNetwork({type:'state',state:networkState()})}}
  if(playerInsideTurret()){
    if(turretEscapeTimer<=0)turretEscapeTimer=5;
    turretEscapeTimer-=dt;if(turretEscapeTimer<=0)ejectPlayerFromTurret();
  }else turretEscapeTimer=0;
  fireTrailSpawn-=dt;
  if(fireTrailUpgradeLevel>0&&fireTrailSpawn<=0){
    fireTrailSpawn=.18;
    fireTrail.push({x:player.x-player.moveX*16,y:player.y-player.moveY*16,r:22,life:1.4,max:1.4,phase:rand(0,Math.PI*2)});
  }
  fireTrail.forEach(f=>{f.life-=dt;f.phase+=dt*7});
  if(healthRegen&&player.hp>0)player.hp=Math.min(player.maxHp,player.hp+dt);
  if(turretRegenPurchased)turrets.forEach(t=>{if(!t.ultra&&t.hp>0&&t.hp<t.maxHp)t.hp=Math.min(t.maxHp,t.hp+dt/5)});
  const reflectionWasActive=player.reflect>0;
  player.fire-=dt; player.dash-=dt; player.inv-=dt;player.heal-=dt;player.invisible-=dt;player.ghostCooldown-=dt;player.reflect-=dt;
  if(reflectionWasActive&&player.reflect<=0){player.reflect=0;player.ninjaCooldown=10}
  else if(!reflectionWasActive)player.ninjaCooldown-=dt;
  player.madmanCooldown-=dt;player.catCooldown-=dt;player.assaultSwitch-=dt;player.shotgunCooldown-=dt; flash-=dt;noticeTime-=dt; shake*=.88;
  if(chosenRole==='alchemist'){player.alchemyCooldown-=dt;if(player.alchemyCooldown<=0){player.alchemyCooldown+=5;triggerAlchemyEffect()}}
  if(chosenRole==='engineer'&&player.traps<10){player.trapRecharge-=dt;if(player.trapRecharge<=0){player.traps++;player.trapRecharge=10;notice=tr(`ODNOWIONO PUŁAPKĘ — ${player.traps} / 10`,`TRAP RESTORED — ${player.traps} / 10`);noticeTime=1.1}}
  if(chosenRole==='manipulator'&&player.manipulateCharges<3){player.manipulateCooldown-=dt;if(player.manipulateCooldown<=0){player.manipulateCharges++;player.manipulateCooldown=10;notice=tr(`ODNOWIONO POCISK — ${player.manipulateCharges} / 3`,`CONTROL SHOT RESTORED — ${player.manipulateCharges} / 3`);noticeTime=1.1}}
  if(bossSpawnTimer>0){bossSpawnTimer-=dt;if(bossSpawnTimer<=0)spawnBoss()}
  if(redBossPending&&!bossFightActive&&bossSpawnTimer<=0)beginBossArrival();
  if(upgradeBossPending&&!bossFightActive&&bossSpawnTimer<=0)beginUpgradeBossArrival();
  if(bossPurgeTimer>0){bossPurgeTimer-=dt;if(bossPurgeTimer<=0){enemies.filter(e=>!e.boss).forEach(e=>burst(e.x,e.y,'#ff405d',10));enemies=enemies.filter(e=>e.boss);enemyBullets=[];notice=tr('ARENA ZAMKNIĘTA — WALKA Z BOSSEM','ARENA LOCKED — BOSS FIGHT');noticeTime=2}}
  if(turretQueued)placeTurret();
  if(healQueued)useRoleAbility();
  let dx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0);
  let dy=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);
  const len=Math.hypot(dx,dy)||1, forwardDash=spaceDashQueued&&player.dash<=0;
  spaceDashQueued=false;
  if(dx||dy){ player.moveX=dx/len; player.moveY=dy/len; }
  if(forwardDash){
    player.dash=1.4; player.inv=.22;
    playDashSound();
    for(let i=0;i<5;i++)moveBody(player,player.moveX*23,player.moveY*23,player.r,1);
    burst(player.x,player.y,'#c8ff3d',18);
  }
  const speed=player.speed;
  moveBody(player,dx/len*speed,dy/len*speed,player.r,dt);
  camera.x=clamp(player.x-W/2,0,WORLD_W-W);camera.y=clamp(player.y-H/2,0,WORLD_H-H);
  bossWaves.forEach(w=>{
    w.radius+=w.speed*dt;w.life-=dt;
    if(!w.hitPlayer&&player.inv<=0&&Math.abs(dist(player,w)-w.radius)<w.width/2+player.r){w.hitPlayer=true;player.hp-=35;playPlayerDamageSound();player.inv=.65;flash=.2;shake=20;burst(player.x,player.y,'#b858ff',22);if(player.hp<=0)endGame()}
    turrets.forEach(t=>{
      if(t.ultra||t.hp<=0||w.hitTurrets.has(t)||Math.abs(dist(t,w)-w.radius)>=w.width/2+t.r)return;
      w.hitTurrets.add(t);t.hp--;t.hit=.18;shake=6;burst(t.x,t.y,'#b858ff',12);
      if(t.hp<=0){playBrokenCommonTowerSound();burst(t.x,t.y,'#58ffd1',28);notice=tr('WIEŻYCZKA ZNISZCZONA','TURRET DESTROYED');noticeTime=1.4}
    });
  });
  bossWaves=bossWaves.filter(w=>w.life>0&&w.radius<w.maxRadius);
  player.angle=Math.atan2(mouse.y+camera.y-player.y,mouse.x+camera.x-player.x);
  if(mouse.down&&player.fire<=0){
    if(chosenRole==='assault'&&player.assaultWeapon==='shotgun'){
      if(player.shotgunCooldown<=0){
        const a=player.angle,projectileSpeed=rapidFirePurchased?940:650;player.fire=.2;player.shotgunCooldown=3;
        [-.24,-.12,0,.12,.24].forEach(offset=>{const angle=a+offset;bullets.push({x:player.x+Math.cos(angle)*25,y:player.y+Math.sin(angle)*25,vx:Math.cos(angle)*projectileSpeed,vy:Math.sin(angle)*projectileSpeed,life:1,oneShot:true});playPlayerBulletSound()});
        burst(player.x+Math.cos(a)*28,player.y+Math.sin(a)*28,'#ff9d3d',7);shake=5;
      }
    }else{
      const baseFireDelay=chosenRole==='assault'?.115/1.5:.115;
      player.fire=rapidFirePurchased?baseFireDelay*.65:baseFireDelay; const a=player.angle+rand(-.025,.025);
      const special=chosenRole==='manipulator'&&player.manipulateReady;
      const forwardAngles=chosenRole==='madman'?[a-.055,a+.055]:[a];
      const shotAngles=dualShotPurchased?[...forwardAngles,...forwardAngles.map(angle=>angle+Math.PI)]:forwardAngles;
      const projectileSpeed=rapidFirePurchased?1050:720;
      shotAngles.forEach(shotAngle=>{bullets.push({x:player.x+Math.cos(shotAngle)*25,y:player.y+Math.sin(shotAngle)*25,vx:Math.cos(shotAngle)*projectileSpeed,vy:Math.sin(shotAngle)*projectileSpeed,life:1.2,special});playPlayerBulletSound()});
      if(special){player.manipulateReady=false;if(player.manipulateCharges===3)player.manipulateCooldown=10;player.manipulateCharges--}
      burst(player.x+Math.cos(a)*28,player.y+Math.sin(a)*28,'#c8ff3d',3);
      if(dualShotPurchased)burst(player.x-Math.cos(a)*22,player.y-Math.sin(a)*22,'#ff6fbd',2);
    }
  }

  if(!bossFightActive){
    spawnTimer-=dt;
    if(spawnTimer<=0){
      const activeHostiles=enemies.filter(e=>!e.friendly&&!e.boss&&e.hp>0).length;
      const enemyLimit=Math.ceil(45*enemySpawnMultiplier);
      if(activeHostiles<enemyLimit)spawnEnemy();
      spawnTimer=(activeHostiles<enemyLimit?Math.max(.5,1.3-wave*.035)/enemySpawnMultiplier:.35)*rand(.85,1.2);
    }
    if(!enemies.some(e=>e.elite&&e.hp>0)){eliteRespawn-=dt;if(eliteRespawn<=0)spawnElite()}
    if(wave>15&&chosenRole!=='sapper'){
      yellowRespawn-=dt;
      if(yellowRespawn<=0&&!enemies.some(e=>e.yellow&&e.hp>0))spawnYellowGroup();
    }
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
  alchemyFields.forEach(field=>{
    field.life-=dt;
    if(field.life<=0)return;
    if(dist(field,player)<=field.r&&field.playerHealed<15&&player.hp<player.maxHp){const healing=Math.min(3*dt,15-field.playerHealed,player.maxHp-player.hp);player.hp+=healing;field.playerHealed+=healing}
    turrets.forEach(t=>{if(!t.ultra&&t.hp>0&&t.hp<t.maxHp&&dist(field,t)<=field.r)t.hp=Math.min(t.maxHp,t.hp+2*dt)});
    enemies.forEach(e=>{if(e.hp<=0||e.friendly||dist(field,e)>field.r)return;e.hp-=2*dt;e.hit=.05;if(e.hp<=0)rewardChainedDefeat(e)});
  });

  turrets.forEach(t=>{
    t.fire-=dt;t.hit-=dt;t.laserInv=(t.laserInv||0)-dt;
    let target=null,best=t.range;
    enemies.forEach(e=>{const d=dist(t,e);if(e.hp>0&&!e.friendly&&d<best&&hasLineOfSight(t,e)){best=d;target=e}});
    if(target){
      t.angle=Math.atan2(target.y-t.y,target.x-t.x);
      if(t.fire<=0){const a=t.angle,baseDelay=t.ultra?.2:.38,baseSpeed=t.ultra?760:610,fireRate=t.ultra?1:(t.fireRateMultiplier||1);t.fire=(rapidFirePurchased?baseDelay*.65:baseDelay)/fireRate;const projectileSpeed=rapidFirePurchased?baseSpeed*1.45:baseSpeed;bullets.push({x:t.x+Math.cos(a)*26,y:t.y+Math.sin(a)*26,vx:Math.cos(a)*projectileSpeed,vy:Math.sin(a)*projectileSpeed,life:1.2,turret:true,ultra:t.ultra,turretDamage:t.ultra?1:(t.damageMultiplier||1)});playCommonTowerShotSound();burst(t.x+Math.cos(a)*25,t.y+Math.sin(a)*25,t.ultra?'#ffd84d':'#58ffd1',t.ultra?4:2)}
    }
  });

  enemies.forEach(e=>{
    e.hit-=dt;e.fireTrailHit=(e.fireTrailHit||0)-dt;if(e.elite)e.dodge-=dt;
    if(e.hp<=0)return;
    e.freeze=Math.max(0,(e.freeze||0)-dt);e.burn=Math.max(0,(e.burn||0)-dt);
    if(e.burn>0&&!e.friendly){e.hp-=2*dt;e.hit=.05;if(e.hp<=0){rewardChainedDefeat(e);return}}
    if(e.freeze>0&&!e.friendly)return;
    if(e.friendly){
      e.shoot-=dt;e.allyDodge-=dt;let target=null,best=520;
      if(e.allyDodge<=0){
        const threat=enemyBullets.find(b=>b.life>0&&dist(b,e)<150);
        if(threat){const incoming=Math.atan2(threat.vy,threat.vx),side=Math.random()<.5?-1:1,da=incoming+Math.PI/2*side;for(let i=0;i<5;i++)moveBody(e,Math.cos(da)*24,Math.sin(da)*24,e.r,1);e.allyDodge=2.5;burst(e.x,e.y,'#43cfff',14)}
      }
      enemies.forEach(other=>{const d=dist(e,other);if(other!==e&&!other.friendly&&other.hp>0&&d<best){best=d;target=other}});
      if(target){e.angle=Math.atan2(target.y-e.y,target.x-e.x);if(e.shoot<=0){const a=e.angle;e.shoot=.7;bullets.push({x:e.x+Math.cos(a)*e.r,y:e.y+Math.sin(a)*e.r,vx:Math.cos(a)*560,vy:Math.sin(a)*560,life:1.4,turret:true,ally:true,undead:e.undead,allyDamage:e.allyDamage})}}
      if(dist(e,player)>105){const a=Math.atan2(player.y-e.y,player.x-e.x);moveBody(e,Math.cos(a)*e.speed*.85,Math.sin(a)*e.speed*.85,e.r,dt)}
      return;
    }
    if(e.waveBoss){
      const playerDistance=dist(e,player);e.waveCooldown-=dt;e.closeBeam-=dt;e.closeCooldown-=dt;e.angle+=dt*.35;
      if(e.waveCooldown<=0){e.waveCooldown=e.hp<=e.maxHp*.5?2.4:3.2;bossWaves.push({x:e.x,y:e.y,radius:e.r+10,speed:e.hp<=e.maxHp*.5?620:520,width:34,maxRadius:Math.hypot(WORLD_W,WORLD_H),life:7,hitPlayer:false,hitTurrets:new Set()});playElectricitySound();shake=10}
      if(playerDistance<165&&e.closeCooldown<=0&&player.inv<=0){e.closeAngle=Math.atan2(player.y-e.y,player.x-e.x);e.closeBeam=.22;e.closeCooldown=2.4;player.hp-=65;playPlayerDamageSound();player.inv=.7;flash=.26;shake=26;burst(player.x,player.y,'#ffffff',30);if(player.hp<=0)endGame()}
      return;
    }
    if(e.boss){
      const playerDistance=dist(e,player);
      const baseLaserSpeed=playerDistance<550?.62:playerDistance<1000?.36:.18;
      const laserSpeed=e.hp<=e.maxHp*.5?baseLaserSpeed*1.4:baseLaserSpeed;
      e.laserAngle+=dt*laserSpeed;e.angle=e.laserAngle;e.laserSound-=dt;e.closeBeam-=dt;e.closeCooldown-=dt;
      if(e.laserSound<=0){e.laserSound=1;playRedBossLaserSound()}
      if(player.inv<=0){
        for(let i=0;i<3;i++){const a=e.laserAngle+i*Math.PI*2/3,end={x:e.x+Math.cos(a)*4200,y:e.y+Math.sin(a)*4200};if(pointSegmentDist(player,e,end)<13){player.hp-=25;playPlayerDamageSound();player.inv=.65;flash=.16;shake=16;burst(player.x,player.y,'#ff193d',20);if(player.hp<=0)endGame();break}}
      }
      turrets.forEach(t=>{
        if(t.ultra||t.hp<=0||t.laserInv>0)return;
        for(let i=0;i<3;i++){
          const a=e.laserAngle+i*Math.PI*2/3,end={x:e.x+Math.cos(a)*4200,y:e.y+Math.sin(a)*4200};
          if(pointSegmentDist(t,e,end)>=t.r+5)continue;
          t.hp--;t.hit=.18;t.laserInv=.65;shake=6;burst(t.x,t.y,'#ff193d',12);
          if(t.hp<=0){playBrokenCommonTowerSound();burst(t.x,t.y,'#58ffd1',28);notice=tr('WIEŻYCZKA ZNISZCZONA','TURRET DESTROYED');noticeTime=1.4}
          break;
        }
      });
      if(playerDistance<145&&e.closeCooldown<=0&&player.inv<=0){e.closeAngle=Math.atan2(player.y-e.y,player.x-e.x);e.closeBeam=.18;e.closeCooldown=2.4;player.hp-=50;playPlayerDamageSound();player.inv=.7;flash=.24;shake=24;burst(player.x,player.y,'#ffffff',28);if(player.hp<=0)endGame()}
      return;
    }
    if(e.yellow){
      let target=player,targetDist=dist(e,player);
      if(remotePlayer&&remotePlayer.hp>0&&dist(e,remotePlayer)<targetDist){target=remotePlayer;targetDist=dist(e,remotePlayer)}
      turrets.forEach(t=>{const td=dist(e,t);if(t.hp>0&&td<targetDist){target=t;targetDist=td}});
      const a=Math.atan2(target.y-e.y,target.x-e.x);e.angle=a;
      if(targetDist<=e.r+target.r){
        e.hp=0;burst(e.x,e.y,'#ffd84d',12);
        if(target===player||target===remotePlayer){const damage=10*enemyDamageMultiplier();target.hp-=damage;target.inv=Math.max(target.inv,.15);flash=.12;shake=10;burst(target.x,target.y,'#ffd84d',14);if(target.hp<=0)endGame()}
        else if(!target.ultra){const damage=10*enemyDamageMultiplier();target.hp-=damage;target.hit=.18;shake=6;burst(target.x,target.y,'#ffd84d',12);if(target.hp<=0){playBrokenCommonTowerSound();burst(target.x,target.y,'#58ffd1',28);notice=tr('WIEŻYCZKA ZNISZCZONA','TURRET DESTROYED');noticeTime=1.4}}
      }else moveEnemyToward(e,target,e.speed,dt);
      return;
    }
    let target=chosenRole==='ghost'&&player.invisible>0?null:player,targetDist=target?dist(e,player):Infinity;
    if(remotePlayer&&remotePlayer.hp>0&&dist(e,remotePlayer)<targetDist){target=remotePlayer;targetDist=dist(e,remotePlayer)}
    turrets.forEach(t=>{const td=dist(e,t);if(t.hp>0&&td<targetDist){target=t;targetDist=td}});
    enemies.forEach(ally=>{const ad=dist(e,ally);if(ally.friendly&&ally.hp>0&&ad<targetDist){target=ally;targetDist=ad}});
    if(!target){
      e.wanderTimer=(e.wanderTimer||0)-dt;
      if(e.wanderTimer<=0){e.angle=rand(0,Math.PI*2);e.wanderTimer=rand(1.2,3.2)}
      moveBody(e,Math.cos(e.angle)*e.speed*.65,Math.sin(e.angle)*e.speed*.65,e.r,dt);
      return;
    }
    const a=Math.atan2(target.y-e.y,target.x-e.x), d=targetDist;e.angle=a;
    const canSeeTarget=hasLineOfSight(e,target);
    if(e.elite&&e.dodge<=0){
      const threat=bullets.find(b=>b.life>0&&dist(b,e)<155);
      if(threat){const side=Math.random()<.5?-1:1,da=a+Math.PI/2*side;for(let i=0;i<5;i++)moveBody(e,Math.cos(da)*27,Math.sin(da)*27,e.r,1);e.dodge=1.8;burst(e.x,e.y,'#b858ff',12)}
    }
    if(!canSeeTarget||d>e.r+target.r+35)moveEnemyToward(e,target,e.speed,dt);
    e.shoot-=dt;
    if(e.shoot<=0&&d<650&&canSeeTarget){
      const spread=e.tank?.09:.045, aa=a+rand(-spread,spread), sp=e.tank?300:e.elite?410:360;
      const damage=(e.elite?36:e.tank?18:11)*enemyDamageMultiplier();
      enemyBullets.push({x:e.x+Math.cos(aa)*e.r,y:e.y+Math.sin(aa)*e.r,vx:Math.cos(aa)*sp,vy:Math.sin(aa)*sp,life:3,r:e.elite?8:e.tank?7:5,damage});
      playEnemyShotSound();
      e.shoot=(e.elite?1.15:e.tank?1.5:1.9)*rand(.8,1.2)/Math.min(1.3,1+wave*.012);
    }
  });

  traps.forEach(t=>{
    if(t.arm>0)return;
    const victim=enemies.find(e=>e.hp>0&&!e.boss&&!e.friendly&&dist(t,e)<t.r+e.r);
    if(victim){t.used=true;victim.hp=0;const reward=victim.elite?300:victim.tank?120:60;credits+=reward;addScore(victim.elite?750:victim.tank?300:100);kills++;if(victim.elite)eliteRespawn=20;tryRaiseUndead(victim);shake=10;burst(t.x,t.y,'#ffd84d',30);notice=tr(`PUŁAPKA: +${reward} ENERGII`,`TRAP: +${reward} ENERGY`);noticeTime=1.5}
  });

  fireTrail.forEach(f=>{
    if(f.life<=0)return;
    enemies.forEach(e=>{
      if(e.hp<=0||e.friendly||e.fireTrailHit>0||dist(f,e)>=f.r+e.r)return;
      e.hp-=1+fireTrailUpgradeLevel*.2;e.fireTrailHit=.35;e.hit=.08;burst(e.x,e.y,'#ff713d',1);
      if(e.hp<=0){credits+=energyReward(e.boss?500:e.elite?150:e.tank?60:30);addScore(e.boss?3000:e.elite?750:e.tank?300:100);kills++;if(e.elite)eliteRespawn=20;if(e.redBoss)resumeWavesAfterRedBoss();if(e.waveBoss)resumeWavesAfterUpgradeBoss();tryRaiseUndead(e)}
    });
  });

  for(const b of bullets)for(const e of enemies)if(b.life>0&&e.hp>0&&!e.friendly&&dist(b,e)<e.r+4){
    b.life=0;
    if(b.special&&!e.boss){e.friendly=true;e.maxHp*=4;e.hp=e.maxHp;e.shoot=.3;e.allyDodge=0;e.hit=.2;burst(e.x,e.y,'#43cfff',25);notice=tr('WRÓG PRZEJĘTY — ŻYCIE ×4','ENEMY CONTROLLED — HEALTH ×4');noticeTime=1.5;continue}
    if(b.special&&e.boss){notice=tr('TYTAN JEST ODPORNY NA PRZEJĘCIE','TITAN IS IMMUNE TO CONTROL');noticeTime=1.5;burst(b.x,b.y,'#ff193d',10);continue}
    const playerShot=!b.turret||b.reflected;
    const normalDamage=playerShot?(chosenRole==='assassin'?2:1)*playerDamageMultiplier:(b.turretDamage||1);
    const damage=b.oneShot&&!e.boss?e.hp:(b.allyDamage??normalDamage);
    e.hp-=damage;e.hit=.08;addScore(20);burst(b.x,b.y,b.turret?'#58ffd1':'#eaffac',5);
    if(chosenRole==='electrician'&&!b.turret)chainLightning(e,damage);
    if(e.hp<=0){const baseReward=e.boss?500:e.elite?150:e.tank?60:30;credits+=(playerShot?energyReward(baseReward):baseReward)*(b.reflected?4:1);addScore(e.boss?3000:e.elite?750:e.tank?300:100);kills++;shake=e.boss?28:e.elite?18:e.tank?12:6;if(e.elite)eliteRespawn=20;if(e.redBoss)resumeWavesAfterRedBoss();if(e.waveBoss)resumeWavesAfterUpgradeBoss();burst(e.x,e.y,e.waveBoss?'#b858ff':e.boss?'#ff193d':e.elite?'#b858ff':e.tank?'#ff9d3d':'#ff405d',e.boss?65:e.elite?38:e.tank?25:15);if(Math.random()<.1)pickups.push({x:e.x,y:e.y,r:10,life:8,phase:0});tryRaiseUndead(e)}
  }
  for(const b of enemyBullets){
    if(b.life>0&&chosenRole==='ninja'&&player.reflect>0&&dist(b,player)<player.r+b.r+5){b.life=0;bullets.push({x:b.x,y:b.y,vx:-b.vx*1.2,vy:-b.vy*1.2,life:1.8,turret:true,reflected:true});playShieldProtectedSound();burst(b.x,b.y,'#e8f7ff',10);shake=3}
    if(b.life>0){
      const ally=enemies.find(e=>e.friendly&&e.hp>0&&dist(b,e)<e.r+b.r);
      if(ally){b.life=0;ally.hp--;ally.hit=.15;burst(ally.x,ally.y,'#43cfff',9);if(ally.hp<=0&&ally.elite)eliteRespawn=20}
    }
    if(b.life>0){
      const turret=turrets.find(t=>t.hp>0&&dist(b,t)<t.r+b.r);
      if(turret){b.life=0;turret.hit=.18;shake=6;burst(turret.x,turret.y,turret.ultra?'#ffd84d':'#ff9d3d',12);if(!turret.ultra){turret.hp--;if(turret.hp<=0){playBrokenCommonTowerSound();burst(turret.x,turret.y,'#58ffd1',28);notice=tr('WIEŻYCZKA ZNISZCZONA','TURRET DESTROYED');noticeTime=1.4}}}
    }
    if(b.life>0&&player.inv<=0&&!(chosenRole==='ghost'&&player.invisible>0)&&dist(b,player)<player.r+b.r){b.life=0;player.hp-=b.damage;playPlayerDamageSound();player.inv=.45;player.speed=chosenRole==='assassin'?390:chosenRole==='catclaw'?325:260;shake=b.damage===36?5:12;flash=b.damage===36?.06:.12;burst(player.x,player.y,'#ff405d',b.damage===36?10:18);if(player.hp<=0)endGame()}
    if(b.life>0&&remotePlayer&&remotePlayer.hp>0&&remotePlayer.inv<=0&&dist(b,remotePlayer)<remotePlayer.r+b.r){b.life=0;remotePlayer.hp-=b.damage;remotePlayer.inv=.45;shake=b.damage===36?5:12;flash=b.damage===36?.06:.12;burst(remotePlayer.x,remotePlayer.y,'#58ffd1',b.damage===36?10:18);if(remotePlayer.hp<=0)endGame()}
  }
  pickups.forEach(p=>{if(p.life>0&&dist(p,player)<player.r+p.r){p.life=0;player.hp=Math.min(player.maxHp,player.hp+25);addScore(50);burst(p.x,p.y,'#58ffd1',16)}});
  bullets.forEach(b=>{if(blocked(b,3))b.life=0});enemyBullets.forEach(b=>{if(blocked(b,b.r))b.life=0});
  bullets=bullets.filter(b=>b.life>0&&b.x>0&&b.x<WORLD_W&&b.y>0&&b.y<WORLD_H);
  enemyBullets=enemyBullets.filter(b=>b.life>0&&b.x>0&&b.x<WORLD_W&&b.y>0&&b.y<WORLD_H);
  enemies=enemies.filter(e=>e.hp>0);if(catTarget&&catTarget.hp<=0)catTarget=null;if(selectedTurret&&selectedTurret.hp<=0)selectedTurret=null;turrets=turrets.filter(t=>t.hp>0);traps=traps.filter(t=>!t.used);fireTrail=fireTrail.filter(f=>f.life>0);lightningEffects=lightningEffects.filter(e=>e.life>0);catLaserEffects=catLaserEffects.filter(e=>e.life>0);alchemyFields=alchemyFields.filter(e=>e.life>0);particles=particles.filter(p=>p.life>0);explosions=explosions.filter(e=>e.life>0);pickups=pickups.filter(p=>p.life>0);
}

function endGame(){if(!running)return;running=false;if(score>highscore){highscore=score;try{localStorage.setItem(HIGHSCORE_STORAGE_KEY,String(highscore))}catch{}updateHighscore()}const earnedGems=awardGems(kills*gemMultiplier);stopInGameMusic();gameOverSound.currentTime=0;gameOverSound.play().catch(()=>{});finalStats.textContent=tr(`Wynik: ${score.toLocaleString('pl-PL')}  •  Pokonani: ${kills}  •  Fala: ${wave}  •  Zdobyte klejnoty: ${earnedGems}`,`Score: ${score.toLocaleString('en-US')}  •  Defeated: ${kills}  •  Wave: ${wave}  •  Gems earned: ${earnedGems}`);if(networkMode==='host')sendNetwork({type:'end',stats:finalStats.textContent});gameOverScreen.classList.remove('hidden')}

function roleHud(){
  const names={medic:tr('TECHNIK','TECHNICIAN'),tank:'TANK',billionaire:tr('MILIARDER','BILLIONAIRE'),assassin:tr('ASSASYN','ASSASSIN'),ghost:tr('DUCH','GHOST'),manipulator:'MANIPULATOR',alchemist:tr('ALCHEMIK','ALCHEMIST'),sapper:tr('SAPER','SAPPER'),necromancer:tr('NEKROMANTA','NECROMANCER'),engineer:tr('INŻYNIER','ENGINEER'),ninja:'NINJA',madman:tr('SZALENIEC','MADMAN'),electrician:tr('ELEKTRYK','ELECTRICIAN'),catclaw:tr('KOCI PAZUR','CAT CLAW'),assault:tr('SZTURMOWIEC','ASSAULT TROOPER')};
  const ready=tr('GOTOWE','READY');let status='';
  if(chosenRole==='medic')status=`[E] ${player.heal>0?Math.ceil(player.heal)+' S':ready}`;
  if(chosenRole==='ghost')status=player.invisible>0?`${tr('NIEWIDZIALNY','INVISIBLE')} ${Math.ceil(player.invisible)} S`:`[E] ${player.ghostCooldown>0?Math.ceil(player.ghostCooldown)+' S':ready}`;
  if(chosenRole==='manipulator')status=`${player.manipulateReady?tr('POCISK UZBROJONY','SHOT ARMED'):'[E]'}  •  ${tr('POCISKI','SHOTS')} ${player.manipulateCharges} / 3${player.manipulateCharges<3?`  •  +1 ${tr('ZA','IN')} ${Math.ceil(player.manipulateCooldown)} S`:''}`;
  if(chosenRole==='engineer')status=`[E] ${tr('PUŁAPKI','TRAPS')} ${player.traps} / 10${player.traps<10?`  •  +1 ${tr('ZA','IN')} ${Math.ceil(player.trapRecharge)} S`:''}`;
  if(chosenRole==='ninja')status=player.reflect>0?`${tr('ODBICIE','REFLECTION')} ${Math.ceil(player.reflect)} S`:`[E] ${player.ninjaCooldown>0?Math.ceil(player.ninjaCooldown)+' S':ready}`;
  if(chosenRole==='madman'||chosenRole==='sapper')status=`[E] ${player.madmanCooldown>0?Math.ceil(player.madmanCooldown)+' S':tr('WYBUCH GOTOWY','EXPLOSION READY')}`;
  if(chosenRole==='catclaw')status=`[E] ${player.catCooldown>0?Math.ceil(player.catCooldown)+' S':catTarget?tr('CEL ZAZNACZONY','TARGET LOCKED'):tr('WYBIERZ CEL','SELECT TARGET')}`;
  if(chosenRole==='assault')status=`[E] ${player.assaultWeapon==='shotgun'?'SHOTGUN':tr('BROŃ DOMYŚLNA','DEFAULT WEAPON')}${player.assaultWeapon==='shotgun'&&player.shotgunCooldown>0?`  •  ${Math.ceil(player.shotgunCooldown)} S`:''}`;
  if(chosenRole==='alchemist')status=`${tr('LOSOWY EFEKT ZA','RANDOM EFFECT IN')} ${Math.max(0,Math.ceil(player.alchemyCooldown))} S`;
  return `${tr('ROLA','ROLE')}: ${names[chosenRole]}${status?'  •  '+status:''}`;
}

function toggleShop(force){
  if(!running||pauseOpen)return;
  shopOpen=typeof force==='boolean'?force:!shopOpen;
  shopScreen.classList.toggle('hidden',!shopOpen);shopEnergy.textContent=`${credits} ${tr('ENERGII','ENERGY')}`;
  turretHpUpgrade.disabled=turretHpMultiplier>1||credits<500;
  turretHpUpgrade.innerHTML=turretHpMultiplier>1?tr('KUPIONO','PURCHASED'):credits<500?`<strong>500</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>500</strong> ${tr('ENERGII','ENERGY')}`;
  const damageUpgradeCost=(damageUpgradeLevel+1)*300;
  damageUpgrade.disabled=damageUpgradeLevel>=10||credits<damageUpgradeCost;
  damageUpgrade.innerHTML=damageUpgradeLevel>=10?`${tr('MAKS. POZIOM','MAX LEVEL')} 10/10`:credits<damageUpgradeCost?`${tr('POZIOM','LEVEL')} ${damageUpgradeLevel}/10 • <strong>${damageUpgradeCost}</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`${tr('POZIOM','LEVEL')} ${damageUpgradeLevel}/10 • <strong>${damageUpgradeCost}</strong> ${tr('ENERGII','ENERGY')}`;
  regenUpgrade.disabled=healthRegen||credits<750;
  regenUpgrade.innerHTML=healthRegen?tr('KUPIONO','PURCHASED'):credits<750?`<strong>750</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>750</strong> ${tr('ENERGII','ENERGY')}`;
  ultraTurretUpgrade.disabled=ultraTurretPurchased||credits<1500;
  ultraTurretUpgrade.innerHTML=ultraTurretPurchased?tr('KUPIONO','PURCHASED'):credits<1500?`<strong>1500</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>1500</strong> ${tr('ENERGII','ENERGY')}`;
  const fireTrailUpgradeCost=350+fireTrailUpgradeLevel*100;
  fireTrailUpgrade.disabled=fireTrailUpgradeLevel>=15||credits<fireTrailUpgradeCost;
  fireTrailUpgrade.innerHTML=fireTrailUpgradeLevel>=15?`${tr('MAKS. POZIOM','MAX LEVEL')} 15/15`:credits<fireTrailUpgradeCost?`${tr('POZIOM','LEVEL')} ${fireTrailUpgradeLevel}/15 • <strong>${fireTrailUpgradeCost}</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`${tr('POZIOM','LEVEL')} ${fireTrailUpgradeLevel}/15 • <strong>${fireTrailUpgradeCost}</strong> ${tr('ENERGII','ENERGY')}`;
  rapidFireUpgrade.disabled=rapidFirePurchased||credits<2000;
  rapidFireUpgrade.innerHTML=rapidFirePurchased?tr('KUPIONO','PURCHASED'):credits<2000?`<strong>2000</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>2000</strong> ${tr('ENERGII','ENERGY')}`;
  dualShotUpgrade.disabled=dualShotPurchased||credits<3000;
  dualShotUpgrade.innerHTML=dualShotPurchased?tr('KUPIONO','PURCHASED'):credits<3000?`<strong>3000</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>3000</strong> ${tr('ENERGII','ENERGY')}`;
  const playerHpUpgradeCost=500+playerHpUpgradeLevel*250;
  playerHpUpgrade.disabled=playerHpUpgradeLevel>=10||credits<playerHpUpgradeCost;
  playerHpUpgrade.innerHTML=playerHpUpgradeLevel>=10?`${tr('MAKS. POZIOM','MAX LEVEL')} 10/10`:credits<playerHpUpgradeCost?`${tr('POZIOM','LEVEL')} ${playerHpUpgradeLevel}/10 • <strong>${playerHpUpgradeCost}</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`${tr('POZIOM','LEVEL')} ${playerHpUpgradeLevel}/10 • <strong>${playerHpUpgradeCost}</strong> ${tr('ENERGII','ENERGY')}`;
  turretRegenUpgrade.disabled=turretRegenPurchased||credits<3000;
  turretRegenUpgrade.innerHTML=turretRegenPurchased?tr('KUPIONO','PURCHASED'):credits<3000?`<strong>3000</strong> — ${tr('BRAK ENERGII','NOT ENOUGH ENERGY')}`:`<strong>3000</strong> ${tr('ENERGII','ENERGY')}`;
  if(shopOpen)shake=0;
  Object.keys(keys).forEach(k=>keys[k]=false);mouse.down=false;spaceDashQueued=false;turretQueued=false;healQueued=false;
}

function buyTurretHpUpgrade(){
  if(!shopOpen||turretHpMultiplier>1||credits<500)return;
  credits-=500;turretHpMultiplier=2;registerShopUpgradePurchase();
  turrets.forEach(t=>{if(!t.ultra){t.hp*=2;t.maxHp*=2}});
  toggleShop(true);
}

function buyDamageUpgrade(){
  const cost=(damageUpgradeLevel+1)*300;
  if(!shopOpen||damageUpgradeLevel>=10||credits<cost)return;
  credits-=cost;damageUpgradeLevel++;playerDamageMultiplier=1+damageUpgradeLevel*.3;registerShopUpgradePurchase();toggleShop(true);
}

function buyRegenUpgrade(){
  if(!shopOpen||healthRegen||credits<750)return;
  credits-=750;healthRegen=true;registerShopUpgradePurchase();toggleShop(true);
}

function buyTurretRegen(){
  if(!shopOpen||turretRegenPurchased||credits<3000)return;
  credits-=3000;turretRegenPurchased=true;registerShopUpgradePurchase();
  notice=tr('AUTONAPRAWA WIEŻYCZEK AKTYWNA','TURRET AUTO-REPAIR ACTIVE');noticeTime=2;
  toggleShop(true);
}

function buyUltraTurret(){
  if(!shopOpen||ultraTurretPurchased||credits<1500)return;
  if(turrets.some(t=>t.hp>0&&dist(t,player)<65)){notice=tr('NIE MOŻNA POSTAWIĆ ULTRA DZIAŁKA NA INNEJ WIEŻYCZCE','THE ULTRA TURRET CANNOT BE PLACED ON ANOTHER TURRET');noticeTime=2.4;toggleShop(false);return}
  credits-=1500;ultraTurretPurchased=true;registerShopUpgradePurchase();
  turrets.push({x:player.x,y:player.y,r:25,hp:1,maxHp:1,hit:0,angle:player.angle,fire:0,range:650,ultra:true});
  turretEscapeTimer=5;
  playTowerBuildingSound();
  burst(player.x,player.y,'#ffd84d',36);notice=tr('ULTRA DZIAŁKO AKTYWNE','ULTRA TURRET ONLINE');noticeTime=2;
  toggleShop(true);
}

function buyFireTrail(){
  const cost=350+fireTrailUpgradeLevel*100;
  if(!shopOpen||fireTrailUpgradeLevel>=15||credits<cost)return;
  credits-=cost;fireTrailUpgradeLevel++;fireTrailSpawn=0;registerShopUpgradePurchase();
  notice=tr('TOR OGNIA AKTYWNY','FIRE TRAIL ACTIVE');noticeTime=2;
  toggleShop(true);
}

function buyRapidFire(){
  if(!shopOpen||rapidFirePurchased||credits<2000)return;
  credits-=2000;rapidFirePurchased=true;registerShopUpgradePurchase();
  notice=tr('HIPERNAPĘD BRONI AKTYWNY','WEAPON HYPERDRIVE ACTIVE');noticeTime=2;
  toggleShop(true);
}

function buyDualShot(){
  if(!shopOpen||dualShotPurchased||credits<3000)return;
  credits-=3000;dualShotPurchased=true;registerShopUpgradePurchase();
  notice=tr('DWUSTRONNY OSTRZAŁ AKTYWNY','TWO-WAY FIRE ACTIVE');noticeTime=2;
  toggleShop(true);
}

function buyPlayerHp(){
  const cost=500+playerHpUpgradeLevel*250;
  if(!shopOpen||playerHpUpgradeLevel>=10||credits<cost)return;
  credits-=cost;playerHpUpgradeLevel++;player.maxHp+=10;player.hp+=10;registerShopUpgradePurchase();
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

  alchemyFields.forEach(field=>{ctx.save();ctx.globalAlpha=.18+.08*Math.sin(visualTime*6);ctx.fillStyle='#75e85a';ctx.strokeStyle='#b6ff9f';ctx.lineWidth=4;ctx.shadowBlur=24;ctx.shadowColor='#75e85a';ctx.beginPath();ctx.arc(field.x,field.y,field.r,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore()});

  if(bossSpawnTimer>0&&bossSpawnPoint){const p=bossSpawnPoint,t=visualTime;ctx.save();ctx.translate(p.x,p.y);ctx.globalCompositeOperation='lighter';for(let i=0;i<4;i++){ctx.strokeStyle=`rgba(255,25,61,${.25+i*.12})`;ctx.lineWidth=3+i*2;ctx.beginPath();ctx.arc(0,0,35+i*18+Math.sin(t*5+i)*8,t*(i%2?1:-1),t*(i%2?1:-1)+Math.PI*1.45);ctx.stroke()}ctx.fillStyle='rgba(255,25,61,.12)';ctx.beginPath();ctx.arc(0,0,78,0,7);ctx.fill();ctx.restore()}

  bossWaves.forEach(w=>{ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(184,88,255,.24)';ctx.lineWidth=w.width+18;ctx.shadowBlur=30;ctx.shadowColor='#b858ff';ctx.beginPath();ctx.arc(w.x,w.y,w.radius,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='#e3b4ff';ctx.lineWidth=5;ctx.beginPath();ctx.arc(w.x,w.y,w.radius,0,Math.PI*2);ctx.stroke();ctx.restore()});

  enemies.filter(e=>e.redBoss&&e.hp>0).forEach(e=>{ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const a=e.laserAngle+i*Math.PI*2/3;ctx.strokeStyle='rgba(255,20,55,.18)';ctx.lineWidth=28;ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(e.x+Math.cos(a)*4200,e.y+Math.sin(a)*4200);ctx.stroke();ctx.strokeStyle='#ff193d';ctx.lineWidth=5;ctx.shadowBlur=18;ctx.shadowColor='#ff193d';ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(e.x+Math.cos(a)*4200,e.y+Math.sin(a)*4200);ctx.stroke()}if(e.closeBeam>0){ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=22;ctx.shadowBlur=35;ctx.shadowColor='#ff193d';ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(e.x+Math.cos(e.closeAngle)*170,e.y+Math.sin(e.closeAngle)*170);ctx.stroke();ctx.strokeStyle='#ff193d';ctx.lineWidth=38;ctx.globalAlpha=.35;ctx.stroke()}ctx.restore()});
  enemies.filter(e=>e.waveBoss&&e.hp>0&&e.closeBeam>0).forEach(e=>{ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='#ffffff';ctx.lineWidth=24;ctx.shadowBlur=38;ctx.shadowColor='#b858ff';ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(e.x+Math.cos(e.closeAngle)*190,e.y+Math.sin(e.closeAngle)*190);ctx.stroke();ctx.restore()});

  const hoveredTurret=turretUnderPointer();
  turrets.forEach(t=>{if(!t.ultra&&(t===hoveredTurret||t===selectedTurret)){ctx.save();ctx.strokeStyle=t===selectedTurret?'#ffd84d':'#8affdf';ctx.lineWidth=t===selectedTurret?4:3;ctx.globalAlpha=.75+.2*Math.sin(visualTime*7);ctx.shadowBlur=18;ctx.shadowColor=ctx.strokeStyle;ctx.beginPath();ctx.arc(t.x,t.y,31,0,Math.PI*2);ctx.stroke();ctx.restore()}const color=t.ultra?'#ffd84d':'#58ffd1';ctx.save();ctx.translate(t.x,t.y);ctx.rotate(t.angle);ctx.shadowBlur=t.ultra?22:12;ctx.shadowColor=t.hit>0?'#fff':color;ctx.fillStyle=t.hit>0?'#fff':color;ctx.beginPath();ctx.arc(0,0,t.ultra?20:17,0,7);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle=t.ultra?'#322a0d':'#142421';ctx.fillRect(-4,-5,t.ultra?38:31,10);ctx.strokeStyle=t.ultra?'#fff0a3':t.hp===1?'#ff9d3d':'#8affdf';ctx.lineWidth=t.ultra?4:3;ctx.beginPath();ctx.arc(0,0,t.ultra?26:22,0,7);ctx.stroke();ctx.restore();if(!t.ultra){ctx.fillStyle='#20282e';ctx.fillRect(t.x-22,t.y-32,44,4);ctx.fillStyle=t.hp===1?'#ff9d3d':'#58ffd1';ctx.fillRect(t.x-22,t.y-32,44*t.hp/t.maxHp,4);if(t===selectedTurret){ctx.textAlign='center';ctx.font='800 11px JetBrains Mono';ctx.fillStyle='#ffd84d';const level=t.level||1,action=level>=5?tr('MAKS. POZIOM','MAX LEVEL'):`X • 400 ${tr('ENERGII','ENERGY')}`;ctx.fillText(`${tr('POZIOM','LEVEL')} ${level}/5 • ${action}`,t.x,t.y+45);ctx.textAlign='left'}}});

  traps.forEach(t=>{ctx.save();ctx.translate(t.x,t.y);ctx.rotate(t.phase);ctx.globalAlpha=t.arm>0?.45:1;ctx.shadowBlur=14;ctx.shadowColor='#ffd84d';ctx.strokeStyle='#ffd84d';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,rr=i%2?10:23;i?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):ctx.moveTo(Math.cos(a)*rr,Math.sin(a)*rr)}ctx.closePath();ctx.stroke();ctx.fillStyle='rgba(255,216,77,.18)';ctx.fill();ctx.restore()});

  fireTrail.forEach(f=>{const fade=Math.min(1,f.life/.3);ctx.save();ctx.translate(f.x,f.y);ctx.globalAlpha=fade*.65;ctx.fillStyle='#ff552d';ctx.beginPath();ctx.arc(Math.sin(f.phase)*2,0,f.r*.5,0,7);ctx.fill();ctx.fillStyle='#ffd84d';ctx.beginPath();ctx.arc(-2,2,f.r*.2,0,7);ctx.fill();ctx.restore()});

  lightningEffects.forEach(e=>{ctx.save();ctx.globalAlpha=e.life/e.max;ctx.strokeStyle='#79ddff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(e.x1,e.y1);ctx.lineTo((e.x1+e.x2)/2+rand(-5,5),(e.y1+e.y2)/2+rand(-5,5));ctx.lineTo(e.x2,e.y2);ctx.stroke();ctx.restore()});

  catLaserEffects.forEach(l=>{ctx.save();ctx.globalAlpha=l.life/l.max;ctx.strokeStyle='#ff294d';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(l.x,l.y);ctx.lineTo(l.x+Math.cos(l.angle)*4200,l.y+Math.sin(l.angle)*4200);ctx.stroke();ctx.restore()});

  pickups.forEach(p=>{ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.phase);ctx.shadowBlur=16;ctx.shadowColor='#58ffd1';ctx.strokeStyle='#58ffd1';ctx.lineWidth=3;ctx.strokeRect(-8,-8,16,16);ctx.restore()});
  bullets.forEach(b=>{ctx.strokeStyle=b.oneShot?'#ff9d3d':b.special?'#43cfff':b.reflected?'#e8f7ff':b.undead?'#2f8a4f':b.ally?'#75e7ff':'#dfff86';ctx.lineWidth=b.oneShot?7:b.special?8:b.reflected?6:4;ctx.shadowBlur=b.special||b.reflected?18:0;ctx.shadowColor=b.reflected?'#9ee7ff':'#43cfff';ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(b.x-b.vx*.018,b.y-b.vy*.018);ctx.stroke();ctx.shadowBlur=0});
  enemyBullets.forEach(b=>{ctx.shadowBlur=12;ctx.shadowColor='#ff405d';ctx.fillStyle='#ff405d';ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,7);ctx.fill();ctx.shadowBlur=0});
  explosions.forEach(e=>{const progress=1-e.life/e.max,r=e.radius*Math.min(1,progress*1.35),fade=Math.max(0,1-progress);ctx.save();ctx.translate(e.x,e.y);ctx.globalCompositeOperation='lighter';const glow=ctx.createRadialGradient(0,0,0,0,0,Math.max(1,r));glow.addColorStop(0,`rgba(255,245,190,${fade*.55})`);glow.addColorStop(.3,`rgba(255,157,61,${fade*.38})`);glow.addColorStop(1,'rgba(255,64,40,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.fill();for(let i=0;i<3;i++){ctx.strokeStyle=`rgba(${i===0?'255,245,200':'255,110,45'},${fade*(1-i*.2)})`;ctx.lineWidth=Math.max(2,12-i*3)*(1-progress);ctx.shadowBlur=24;ctx.shadowColor='#ff6b2e';ctx.beginPath();ctx.arc(0,0,Math.max(4,r-i*18),0,7);ctx.stroke()}ctx.rotate(progress*2);ctx.strokeStyle=`rgba(255,216,90,${fade*.8})`;ctx.lineWidth=4;for(let i=0;i<12;i++){const a=i*Math.PI/6;ctx.beginPath();ctx.moveTo(Math.cos(a)*r*.35,Math.sin(a)*r*.35);ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);ctx.stroke()}ctx.restore()});
  particles.forEach(p=>{ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle=p.color;ctx.fillRect(p.x-p.size/2,p.y-p.size/2,p.size,p.size)});ctx.globalAlpha=1;

  enemies.forEach(e=>{ctx.save();ctx.translate(e.x,e.y);ctx.rotate(e.angle);ctx.fillStyle=e.hit>0?'#fff':e.undead?'#1f6b3a':e.friendly?'#43cfff':e.yellow?'#ffd84d':e.elite?'#b858ff':e.waveBoss?'#b858ff':e.boss?'#ff193d':e.tank?'#ff9d3d':'#ff405d';ctx.shadowBlur=e.boss?32:e.elite?24:14;ctx.shadowColor=ctx.fillStyle;ctx.beginPath();if(e.boss){for(let i=0;i<8;i++){const a=i*Math.PI/4,rr=e.waveBoss?(i%2?42:62):(i%2?32:48);i?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):ctx.moveTo(Math.cos(a)*rr,Math.sin(a)*rr)}ctx.closePath()}else if(e.yellow){ctx.rect(-10,-10,20,20)}else if(e.tank||e.elite){ctx.rect(e.elite?-23:-20,e.elite?-23:-20,e.elite?46:40,e.elite?46:40)}else{ctx.moveTo(22,0);ctx.lineTo(-15,15);ctx.lineTo(-10,0);ctx.lineTo(-15,-15);ctx.closePath()}ctx.fill();ctx.shadowBlur=0;if(!e.yellow){ctx.fillStyle='#151018';ctx.fillRect(-4,-4,e.r+12,8)}ctx.restore();if(e.hp<e.maxHp||e.elite||e.boss||e.friendly){const bw=e.boss?110:48;ctx.fillStyle='#202830';ctx.fillRect(e.x-bw/2,e.y-e.r-15,bw,6);ctx.fillStyle=e.undead?'#1f6b3a':e.friendly?'#43cfff':e.yellow?'#ffd84d':e.elite?'#b858ff':e.waveBoss?'#b858ff':'#ff193d';ctx.fillRect(e.x-bw/2,e.y-e.r-15,bw*Math.max(0,e.hp)/e.maxHp,6)}});
  enemies.forEach(e=>{if(e.freeze>0){ctx.save();ctx.strokeStyle='#79ddff';ctx.lineWidth=4;ctx.shadowBlur=15;ctx.shadowColor='#79ddff';ctx.beginPath();ctx.arc(e.x,e.y,e.r+7,0,Math.PI*2);ctx.stroke();ctx.restore()}if(e.burn>0){ctx.save();ctx.globalAlpha=.75;ctx.fillStyle='#ff713d';ctx.shadowBlur=12;ctx.shadowColor='#ff713d';for(let i=0;i<3;i++){const a=visualTime*4+i*Math.PI*2/3;ctx.beginPath();ctx.arc(e.x+Math.cos(a)*(e.r+5),e.y+Math.sin(a)*(e.r+5),4,0,Math.PI*2);ctx.fill()}ctx.restore()}});

  if(catTarget&&catTarget.hp>0){ctx.save();ctx.translate(catTarget.x,catTarget.y);ctx.rotate(visualTime*2.5);ctx.strokeStyle=catTarget.boss?'#ff193d':'#ffcf4a';ctx.lineWidth=3;ctx.setLineDash([7,5]);ctx.beginPath();ctx.arc(0,0,catTarget.r+13,0,Math.PI*2);ctx.stroke();ctx.restore()}

  if(player){ctx.save();ctx.translate(player.x,player.y);ctx.rotate(player.angle);ctx.globalAlpha=player.invisible>0?.2:player.inv>0&&Math.floor(player.inv*20)%2?.3:1;ctx.shadowBlur=18;ctx.shadowColor='#c8ff3d';ctx.fillStyle='#c8ff3d';ctx.beginPath();ctx.moveTo(24,0);ctx.lineTo(-15,14);ctx.lineTo(-9,0);ctx.lineTo(-15,-14);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#07100b';ctx.fillRect(1,-4,27,8);ctx.restore()}
  if(remotePlayer){ctx.save();ctx.translate(remotePlayer.x,remotePlayer.y);ctx.rotate(remotePlayer.angle);ctx.globalAlpha=remotePlayer.inv>0&&Math.floor(remotePlayer.inv*20)%2?.3:1;ctx.shadowBlur=18;ctx.shadowColor='#58ffd1';ctx.fillStyle='#58ffd1';ctx.beginPath();ctx.moveTo(24,0);ctx.lineTo(-15,14);ctx.lineTo(-9,0);ctx.lineTo(-15,-14);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#071216';ctx.fillRect(1,-4,27,8);ctx.restore()}
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
  if(turretEscapeTimer>0){const remaining=Math.max(0,turretEscapeTimer);ctx.textAlign='center';ctx.fillStyle='#ffd84d';ctx.font='800 15px JetBrains Mono';ctx.fillText(`${tr('AUTOMATYCZNE WYJŚCIE ZA','AUTOMATIC EJECTION IN')} ${remaining.toFixed(1)} S`,W/2,H-82);ctx.fillStyle='#2d2918';ctx.fillRect(W/2-120,H-72,240,6);ctx.fillStyle='#ffd84d';ctx.fillRect(W/2-120,H-72,240*remaining/5,6);ctx.textAlign='left'}
  if(noticeTime>0){ctx.textAlign='center';ctx.fillStyle=notice.startsWith('WIEŻ')?'#58ffd1':'#ff9d3d';ctx.font='800 18px JetBrains Mono';ctx.fillText(notice,W/2,H-45);ctx.textAlign='left'}
  if(player.dash>0){ctx.fillStyle='#1d2822';ctx.fillRect(45,108,120,3);ctx.fillStyle='#58ffd1';ctx.fillRect(45,108,120*(1-player.dash/1.4),3)}
  if(flash>0){ctx.fillStyle=`rgba(255,64,93,${flash*1.5})`;ctx.fillRect(0,0,W,H)}
}

function loop(t){const dt=Math.min(.033,(t-last)/1000||0);last=t;update(dt);draw();requestAnimationFrame(loop)}
function begin(){if(networkMode==='join'){setNetworkStatus('Tylko host może rozpocząć grę.',true);return}if(networkMode==='host'&&!networkConnected){setNetworkStatus('Najpierw połącz drugiego gracza.',true);return}stopLobbyMusic();stopInGameMusic();gameOverSound.pause();gameOverSound.currentTime=0;reset();gemMultiplier=DIFFICULTIES[chosenDifficulty].gems*(doubleGemsPending?2:1);energyBuffMultiplier=doubleEnergyPending?2:1;if(doubleGemsPending){doubleGemsPending=false;try{localStorage.removeItem(DOUBLE_GEMS_STORAGE_KEY);localStorage.removeItem('neonStormDoubleScorePending')}catch{}updateDoubleGemsBuff()}if(doubleEnergyPending){doubleEnergyPending=false;try{localStorage.removeItem(DOUBLE_ENERGY_STORAGE_KEY)}catch{}updateDoubleEnergyBuff()}running=true;if(networkMode==='host')sendNetwork({type:'start',guestRole:remoteRole});startScreen.classList.add('hidden');gameOverScreen.classList.add('hidden');inGameMusicActive=true;playInGameMusic()}
function togglePause(force){
  if(!running)return;
  pauseOpen=typeof force==='boolean'?force:!pauseOpen;
  if(pauseOpen&&shopOpen){shopOpen=false;shopScreen.classList.add('hidden')}
  pauseScreen.classList.toggle('hidden',!pauseOpen);
  mouse.down=false;spaceDashQueued=false;turretQueued=false;healQueued=false;
  Object.keys(keys).forEach(key=>keys[key]=false);
  if(!pauseOpen)last=performance.now();
}
function returnToCharacterSelect(){
  running=false;stopInGameMusic();shopOpen=false;pauseOpen=false;mouse.down=false;
  Object.keys(keys).forEach(key=>keys[key]=false);
  shopScreen.classList.add('hidden');
  pauseScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  lobbyMusicActive=true;playLobbyMusic();
}
document.getElementById('startBtn').onclick=begin;document.getElementById('restartBtn').onclick=begin;
document.getElementById('mainMenuBtn').onclick=returnToCharacterSelect;
document.getElementById('resumeBtn').onclick=()=>togglePause(false);
document.getElementById('lobbyBtn').onclick=returnToCharacterSelect;
document.getElementById('closeShopBtn').onclick=()=>toggleShop(false);
function setGameVolume(value){
  masterVolume=Number(value)/100;
  gameVolume.value=value;lobbyGameVolume.value=value;
  gameVolumeValue.value=`${value}%`;lobbyGameVolumeValue.value=`${value}%`;
  playerBulletSounds.forEach(sound=>sound.volume=masterVolume);
  gameOverSound.volume=masterVolume;
  dashSound.volume=masterVolume;
  catTeleportSound.volume=masterVolume;
  setTrapSound.volume=masterVolume;
  shieldOnSound.volume=masterVolume;
  shieldProtectedSounds.forEach(sound=>sound.volume=masterVolume);
  electricitySounds.forEach(sound=>sound.volume=masterVolume);
  menuClickSounds.forEach(sound=>sound.volume=masterVolume);
  shopBuyingSound.volume=masterVolume;
  playerDamageSounds.forEach(sound=>sound.volume=masterVolume);
  towerBuildingSounds.forEach(({first,second})=>{first.volume=masterVolume;second.volume=masterVolume});
  commonTowerShotSounds.forEach(sound=>sound.volume=masterVolume);
  brokenCommonTowerSounds.forEach(sound=>sound.volume=masterVolume);
  redBossLaserSounds.forEach(sound=>sound.volume=masterVolume);
  redBossDeadSound.volume=masterVolume;
  enemyShotSounds.forEach(sounds=>sounds.forEach(sound=>sound.volume=masterVolume*.7));
}
function setMusicVolume(value){
  musicVolume=Number(value)/100;
  musicVolumeSlider.value=value;lobbyMusicVolume.value=value;
  musicVolumeValue.value=`${value}%`;lobbyMusicVolumeValue.value=`${value}%`;
  lobbyMusicTracks.forEach(track=>track.volume=musicVolume);
  inGameMusicTracks.forEach(track=>track.volume=musicVolume*.5);
}
gameVolume.addEventListener('input',()=>setGameVolume(gameVolume.value));
lobbyGameVolume.addEventListener('input',()=>setGameVolume(lobbyGameVolume.value));
musicVolumeSlider.addEventListener('input',()=>setMusicVolume(musicVolumeSlider.value));
lobbyMusicVolume.addEventListener('input',()=>setMusicVolume(lobbyMusicVolume.value));
turretHpUpgrade.onclick=buyTurretHpUpgrade;
damageUpgrade.onclick=buyDamageUpgrade;
regenUpgrade.onclick=buyRegenUpgrade;
ultraTurretUpgrade.onclick=buyUltraTurret;
fireTrailUpgrade.onclick=buyFireTrail;
rapidFireUpgrade.onclick=buyRapidFire;
dualShotUpgrade.onclick=buyDualShot;
playerHpUpgrade.onclick=buyPlayerHp;
turretRegenUpgrade.onclick=buyTurretRegen;
buyDoubleGemsBtn.onclick=buyDoubleGemsBuff;
buyDoubleEnergyBtn.onclick=buyDoubleEnergyBuff;
document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
document.querySelectorAll('.role').forEach(btn=>btn.addEventListener('click',()=>{if(!buyRole(btn.dataset.role))return;chosenRole=btn.dataset.role;document.querySelectorAll('.role').forEach(b=>b.classList.toggle('active',b===btn));if(networkMode==='join')sendNetwork({type:'role',role:chosenRole})}));
document.querySelectorAll('.difficulty').forEach(btn=>btn.addEventListener('click',()=>{chosenDifficulty=btn.dataset.difficulty;document.querySelectorAll('.difficulty').forEach(b=>b.classList.toggle('active',b===btn))}));
soloModeBtn.addEventListener('click',()=>selectNetworkMode('solo'));
hostModeBtn.addEventListener('click',()=>selectNetworkMode('host'));
joinModeBtn.addEventListener('click',()=>selectNetworkMode('join'));
networkActionBtn.addEventListener('click',()=>networkMode==='host'?hostNetworkAction():joinNetworkAction());
copyNetworkCodeBtn.addEventListener('click',async()=>{
  if(!networkOutput.value)return;
  try{await navigator.clipboard.writeText(networkOutput.value);setNetworkStatus('Kod skopiowany do schowka.')}catch{networkOutput.focus();networkOutput.select();document.execCommand('copy');setNetworkStatus('Kod skopiowany do schowka.')}
});
document.addEventListener('click',e=>{
  ensureLobbyMusic();
  const button=e.target.closest('button');
  if(!button)return;
  if(button.closest('.offer,.buff-offer'))playShopBuyingSound();
  else playMenuClickSound();
});
addEventListener('keydown',e=>{if(e.target.matches('input, textarea, select')||e.target.isContentEditable)return;if(e.key==='Escape'&&!e.repeat){togglePause();e.preventDefault();return}if(pauseOpen)return;if(e.key.toLowerCase()==='b'&&!e.repeat){toggleShop();return}if(shopOpen)return;keys[e.key.toLowerCase()]=true;if(e.key===' '&&!e.repeat)spaceDashQueued=true;if(e.key.toLowerCase()==='z'&&!e.repeat)turretQueued=true;if(e.key.toLowerCase()==='x'&&!e.repeat)upgradeSelectedTurret();if(e.key.toLowerCase()==='e'&&!e.repeat)healQueued=true;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault()});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
addEventListener('blur',()=>{Object.keys(keys).forEach(k=>keys[k]=false);mouse.down=false;spaceDashQueued=false});
document.addEventListener('visibilitychange',()=>{if(document.hidden){Object.keys(keys).forEach(k=>keys[k]=false);mouse.down=false;spaceDashQueued=false}});
canvas.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect();mouse.x=(e.clientX-r.left)*W/r.width;mouse.y=(e.clientY-r.top)*H/r.height});
canvas.addEventListener('contextmenu',e=>e.preventDefault());
canvas.addEventListener('mousedown',e=>{
  if(e.button!==0)return;
  if(running&&!shopOpen&&!pauseOpen){
    const turret=turretUnderPointer();
    if(turret){selectedTurret=turret;mouse.down=false;notice=tr(`WIEŻYCZKA — POZIOM ${turret.level||1}/5 — X: ULEPSZ ZA 400`,`TURRET — LEVEL ${turret.level||1}/5 — X: UPGRADE FOR 400`);noticeTime=1.8;return}
  }
  if(chosenRole==='catclaw'&&running&&!shopOpen&&!pauseOpen){
    const pointer={x:mouse.x+camera.x,y:mouse.y+camera.y};let target=null,best=Infinity;
    enemies.forEach(e=>{const d=dist(pointer,e);if(e.hp>0&&!e.friendly&&d<e.r+18&&d<best){best=d;target=e}});
    if(target){catTarget=target;mouse.down=false;notice=target.boss?tr('TYTAN ZAZNACZONY — ODPORNY','TITAN SELECTED — IMMUNE'):tr('CEL ZAZNACZONY — NACIŚNIJ E','TARGET LOCKED — PRESS E');noticeTime=1.5;return}
  }
  if(running&&!shopOpen&&!pauseOpen)mouse.down=true;
});addEventListener('mouseup',()=>mouse.down=false);
setLanguage('en');fitGameToScreen();reset();running=false;playLobbyMusic();requestAnimationFrame(loop);
