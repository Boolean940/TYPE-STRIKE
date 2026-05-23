(function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const mobileInput = document.getElementById('mobile-input');

  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    
    if (player.x > W) player.x = W / 2;
    
    stars.forEach(star => { 
      if (star.x > W) star.x = Math.random() * W; 
    });
  });

  let audioCtx;
  function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  function playBeep(freq = 440, duration = 0.1, type = 'square', vol = 0.1) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

const wordBank = {
    easy: [
      'a', 'at', 'be', 'cat', 'dog', 'sun', 'car', 'hat', 'pig', 'top', 'bin', 'map', 'key', 'ice', 'joy',
      'run', 'fly', 'sad', 'mad', 'bad', 'red', 'box', 'cup', 'pen', 'bus', 'bed', 'cow', 'toy', 'leg', 'arm', 
      'eye', 'ear', 'boy', 'pan', 'jar', 'bat', 'ant', 'bug', 'bag', 'man', 'mom', 'dad', 'day', 'way', 'say', 
      'pay', 'big', 'dig', 'zip', 'lip', 'tip', 'sip', 'dip', 'hop', 'mop', 'cop', 'pop', 'hot', 'pot', 'lot', 
      'cot', 'dot', 'not', 'cut', 'but', 'nut', 'hut', 'mud', 'bud', 'rug', 'hug', 'mug', 'web', 'net', 'pet', 
      'wet', 'get', 'let', 'set', 'yet', 'win', 'pin', 'fin', 'tin', 'fat', 'mat', 'rat', 'sat', 'pat', 'can', 
      'fan', 'van', 'cap', 'nap', 'tap', 'lap', 'gap', 'yes', 'no', 'do', 'go', 'so', 'we', 'me', 'he', 'she', 
      'it', 'is', 'in', 'on', 'up', 'out', 'all', 'any', 'are', 'one', 'two', 'six', 'ten'
    ],
    medium: [
      'apple', 'brave', 'cloud', 'dance', 'eagle', 'flame', 'grape', 'house', 'image', 'joker', 'kite', 'lemon', 
      'moon', 'night', 'ocean', 'water', 'paper', 'music', 'tiger', 'snake', 'mouse', 'horse', 'sheep', 'train', 
      'plane', 'plant', 'grass', 'green', 'black', 'white', 'brown', 'bread', 'clean', 'dirty', 'happy', 'angry', 
      'sleep', 'dream', 'phone', 'chair', 'table', 'clock', 'watch', 'shirt', 'shoes', 'socks', 'pants', 'skirt', 
      'dress', 'party', 'beach', 'river', 'stone', 'track', 'truck', 'block', 'board', 'glass', 'class', 'smart', 
      'laugh', 'smile', 'heart', 'earth', 'world', 'space', 'alien', 'robot', 'magic', 'ghost', 'light', 'sound', 
      'color', 'shape', 'circle', 'square', 'movie', 'video', 'radio', 'story', 'book', 'paint', 'brush', 'fruit', 
      'juice', 'sweet', 'candy', 'sugar', 'cream', 'toast', 'bacon', 'cheese', 'pizza', 'salad', 'soup', 'spoon', 
      'knife', 'plate', 'bowl', 'mouth', 'teeth', 'tooth', 'brain', 'blood', 'bone', 'skin', 'hair', 'voice', 
      'noise', 'quiet', 'loud', 'right', 'wrong', 'left'
    ],
    hard: [
      'banana', 'candle', 'dragon', 'engine', 'forest', 'galaxy', 'hammer', 'island', 'jungle', 'knight', 'laptop', 
      'magnet', 'needle', 'orange', 'planet', 'morning', 'picture', 'diamond', 'monster', 'holiday', 'library', 
      'airport', 'science', 'history', 'teacher', 'student', 'doctor', 'window', 'brother', 'sister', 'mother', 
      'father', 'parent', 'friend', 'family', 'animal', 'monkey', 'rabbit', 'turtle', 'spider', 'lizard', 'winter', 
      'summer', 'spring', 'autumn', 'weather', 'thunder', 'balloon', 'camera', 'kitchen', 'bedroom', 'blanket', 
      'pillow', 'jacket', 'sweater', 'pocket', 'mirror', 'rocket', 'secret', 'ticket', 'market', 'garden', 'bridge', 
      'castle', 'palace', 'village', 'police', 'author', 'farmer', 'singer', 'dancer', 'memory', 'moment', 'person', 
      'people', 'number', 'letter', 'bottle', 'button', 'butter', 'peanut', 'cookie', 'muffin', 'carrot', 'tomato', 
      'potato', 'yellow', 'purple', 'silver', 'golden', 'triangle', 'battery', 'plastic', 'cotton', 'leather', 
      'wooden', 'crystal', 'journey', 'danger', 'safely', 'puzzle', 'guitar', 'violin', 'melody', 'rhythm'
    ],
    expert: [
      'avalanche', 'building', 'computer', 'dinosaur', 'elephant', 'fireball', 'hospital', 'internet', 'keyboard', 
      'labyrinth', 'mountain', 'notebook', 'strawberry', 'butterfly', 'helicopter', 'television', 'basketball', 
      'dictionary', 'motorcycle', 'restaurant', 'sunglasses', 'watermelon', 'woodpecker', 'toothbrush', 'toothpaste', 
      'wheelchair', 'microphone', 'microscope', 'telescope', 'submarine', 'spaceship', 'superhero', 'lighthouse', 
      'skateboard', 'snowboard', 'trampoline', 'volleyball', 'photograph', 'chocolate', 'hamburger', 'spaghetti', 
      'croissant', 'vegetable', 'chameleon', 'rhinoceros', 'crocodile', 'alligator', 'porcupine', 'chimpanzee', 
      'centipede', 'caterpillar', 'grasshopper', 'bumblebee', 'snowflake', 'lightning', 'hurricane', 'tornado', 
      'earthquake', 'waterfall', 'fireworks', 'moonlight', 'sunflower', 'adventure', 'discovery', 'knowledge', 
      'education', 'beautiful', 'wonderful', 'fantastic', 'excellent', 'dangerous', 'important', 'impossible', 
      'different', 'signature', 'passenger', 'direction', 'condition', 'attention', 'detective', 'scientist', 
      'astronaut', 'president', 'carpenter', 'yesterday', 'tomorrow', 'afternoon', 'september', 'november', 
      'december', 'february', 'wednesday', 'thursday', 'saturday', 'furniture', 'apartment', 'telephone', 
      'escalator', 'elevator', 'professor'
    ]
  };

  let gameState = 'menu';
  let stateTimer = 0; 
  let baseDifficulty = 'auto'; 
  let score = 0;
  let highScore = parseInt(localStorage.getItem('typeStrikeHighScore')) || 0;
  let newHighScoreTriggered = false; // New animation flag
  
  let health = 5;
  const maxHealth = 5;
  let enemiesPassed = 0; 
  const enemiesToDamage = 5;

  let combo = 0;
  let comboTimer = 0;
  const COMBO_TIMEOUT = 180;
  let frameCount = 0;

  let tutorialStep = 0;
  let tutorialTimer = 0;
  let botTimer = 0;

  const player = {
    x: W / 2, 
    targetX: W / 2, 
    y: H - 100, 
    radius: 20,
    shieldActive: false, 
    shieldTimer: 0, 
    hitFlash: 0 
  };
  
  let playerTrails = []; // Dash animation trails

  let enemies = [];
  let spawnTimer = 0;
  const MAX_ENEMIES = 10;
  let particles = [];
  let shockwaves = [];
  let floatingTexts = []; 
  
  let abilityButtons = [];
  // Added 'heal' and 'freeze' powerups
  const POWERUP_TYPES = ['slow', 'double', 'shield', 'nuke', 'heal', 'freeze'];
  let abilitySpawnTimer = 0;
  
  let freezeMotion = false;
  let freezeTimer = 0;

  const stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * W, 
      y: Math.random() * H,
      size: Math.random() * 2 + 0.5, 
      speed: Math.random() * 2 + 1,
      color: Math.random() > 0.8 ? '#ff007f' : '#00f3ff',
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  let shakeAmount = 0;
  let shakeDuration = 0;
  let slowMotion = false;
  let slowTimer = 0;
  let inputBuffer = '';
  let targetEnemy = null;
  let beamAlpha = 0;
  
  let activeClickZones = [];

  function changeState(newState) {
    gameState = newState;
    stateTimer = 0; 
  }

  function getRandomWord(difficulty = 'medium') {
    const list = wordBank[difficulty] || wordBank.medium;
    return list[Math.floor(Math.random() * list.length)];
  }
  
  function getDifficulty() {
    if (baseDifficulty !== 'auto') return baseDifficulty;
    if (score < 150) return 'easy';
    if (score < 400) return 'medium';
    if (score < 800) return 'hard';
    return 'expert';
  }

  const neonColors = ['#ff003c', '#00f3ff', '#bc13fe', '#ffaa00', '#00ff66'];

  function spawnEnemy() {
    if (enemies.length >= MAX_ENEMIES) return;
    
    const difficulty = getDifficulty();
    const word = getRandomWord(difficulty);
    
    let speedMult = 1.0;
    let speedScoreFactor = 0; 

    if (baseDifficulty === 'easy') {
      speedMult = 0.8; speedScoreFactor = 0; 
    } else if (baseDifficulty === 'medium') {
      speedMult = 1.1; speedScoreFactor = 0; 
    } else if (baseDifficulty === 'hard') {
      speedMult = 1.4; speedScoreFactor = score * 0.0002; 
    } else if (baseDifficulty === 'expert') {
      speedMult = 1.5; speedScoreFactor = score * 0.0003; 
    } else if (baseDifficulty === 'auto') {
      if (difficulty === 'easy') speedMult = 0.2;
      else if (difficulty === 'medium') speedMult = 1.0;
      else if (difficulty === 'hard') speedMult = 1.15;
      else speedMult = 1.35;
      speedScoreFactor = score * 0.002; 
    }

    const baseSpeed = (H / 600) * (0.6 + speedScoreFactor) * speedMult;
    const speed = baseSpeed * (0.7 + Math.random() * 0.6);
    const margin = Math.min(100, W * 0.1);
    
    enemies.push({
      x: margin + Math.random() * (W - margin * 2),
      y: -50,
      word: word, 
      typed: '', 
      speed: speed, 
      radius: 22,
      color: neonColors[Math.floor(Math.random() * neonColors.length)],
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      scale: 0 // New spawn animation scaling property
    });
  }

  function spawnAbilityButton() {
    const type = POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)];
    let color = '#ff003c';
    
    if (type === 'slow') color = '#00f3ff';
    else if (type === 'double') color = '#ffaa00';
    else if (type === 'shield') color = '#00ff66';
    else if (type === 'heal') color = '#ff007f';
    else if (type === 'freeze') color = '#00aaff';
    
    const margin = 80;
    abilityButtons.push({
      x: margin + Math.random() * (W - margin * 2),
      y: margin + Math.random() * (H / 1.5 - margin * 2),
      type: type, 
      color: color, 
      radius: 30, 
      life: 300, 
      maxLife: 300
    });
  }

  function createExplosion(x, y, color = '#ffaa00', count = 30) {
    shockwaves.push({ x, y, radius: 5, maxRadius: 80 + Math.random() * 50, alpha: 1, color });
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 8;
      particles.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed, 
        vy: Math.sin(angle) * speed,
        life: 30 + Math.random() * 40, maxLife: 70,
        color: Math.random() > 0.4 ? color : '#ffffff', 
        size: 2 + Math.random() * 4
      });
    }
  }

  // Modified to support size adjustments
  function spawnFloatingText(x, y, text, color, life = 60, vy = -1.5, size = 22) {
    floatingTexts.push({ x, y, text, color, life, maxLife: life, vy, size });
  }

  function playerHitAnimation() {
    createExplosion(player.x, player.y, '#ff003c', 40);
    applyScreenShake(15);
    player.hitFlash = 20; 
    playBeep(100, 0.4, 'sawtooth', 0.2);
  }

  function applyScreenShake(intensity = 5) {
    shakeAmount = intensity;
    shakeDuration = 12;
  }

  function activateNuke() {
    for (const enemy of enemies) {
      createExplosion(enemy.x, enemy.y, enemy.color);
      spawnFloatingText(enemy.x, enemy.y - 20, '+10', '#ffffff');
      score += 10;
    }
    enemies = [];
    applyScreenShake(20);
    playBeep(150, 0.8, 'sawtooth', 0.3);
    
    shockwaves.push({ x: W / 2, y: H / 2, radius: 10, maxRadius: Math.max(W, H), alpha: 0.9, color: '#ffffff' });
  }

  function restartGame() {
    score = 0; 
    health = maxHealth; 
    enemiesPassed = 0;
    combo = 0; 
    comboTimer = 0;
    newHighScoreTriggered = false;
    
    changeState('playing');
    
    enemies = []; particles = []; shockwaves = []; floatingTexts = []; abilityButtons = []; playerTrails = [];
    
    inputBuffer = ''; targetEnemy = null;
    slowMotion = false; slowTimer = 0;
    freezeMotion = false; freezeTimer = 0;
    
    player.shieldActive = false; player.shieldTimer = 0; player.hitFlash = 0;
    player.targetX = W / 2; player.x = W / 2;
    
    spawnTimer = 0; abilitySpawnTimer = 0; frameCount = 0; beamAlpha = 0;
    
    mobileInput.focus(); 
  }

  function startInteractiveTutorial() {
    restartGame();
    changeState('tutorial_play');
    tutorialStep = 0; tutorialTimer = 0; stateTimer = 0; 
  }

  function processType(char) {
    if (gameState !== 'playing' && gameState !== 'tutorial_play') return;
    initAudio();
    
    if (char === 'Backspace') {
      if (inputBuffer.length > 0) {
        inputBuffer = inputBuffer.slice(0, -1);
        if (targetEnemy) {
          targetEnemy.typed = inputBuffer;
          if (inputBuffer === '') {
            targetEnemy = null; combo = 0; comboTimer = 0; beamAlpha = 0;
          } else { 
            beamAlpha = 0.7; 
          }
        }
      }
      return;
    }

    if (char.length !== 1 || !/[a-z]/i.test(char)) return;
    
    char = char.toLowerCase();
    inputBuffer += char;

    if (!targetEnemy || !enemies.includes(targetEnemy) || !targetEnemy.word.startsWith(inputBuffer)) {
      targetEnemy = null;
      for (const enemy of enemies) {
        if (enemy.word.startsWith(inputBuffer)) {
          targetEnemy = enemy; 
          break;
        }
      }
    }

    if (targetEnemy) {
      targetEnemy.typed = inputBuffer;
      beamAlpha = 1.0; 
      playBeep(600 + inputBuffer.length * 50, 0.05, 'square');
      for(let i = 0; i < 4; i++) {
         particles.push({
          x: targetEnemy.x + (Math.random() - 0.5) * 20, y: targetEnemy.y + 15,
          vx: (Math.random() - 0.5) * 3, vy: Math.random() * 4,
          life: 15, maxLife: 15, color: '#00f3ff', size: 2
        });
      }

      if (targetEnemy.typed === targetEnemy.word) {
        createExplosion(targetEnemy.x, targetEnemy.y, targetEnemy.color);
        applyScreenShake(4);
        playBeep(900, 0.15, 'sine');

        combo++; 
        comboTimer = COMBO_TIMEOUT;
        const comboMultiplier = 1 + (combo - 1) * 0.5;
        const pts = Math.floor(targetEnemy.word.length * 10 * comboMultiplier);
        score += pts;
        
        spawnFloatingText(targetEnemy.x, targetEnemy.y - 20, `+${pts}`, '#00ff66');
        
        // Massive combo milestone animation
        if (combo > 1 && combo % 5 === 0) {
          spawnFloatingText(W / 2, H / 3, `COMBO x${combo}!`, '#ffaa00', 90, -1, 40);
          playBeep(1000, 0.3, 'sine', 0.2);
        }
        
        // High Score Trigger Animation
        if (highScore > 0 && score > highScore && !newHighScoreTriggered) {
          newHighScoreTriggered = true;
          spawnFloatingText(W / 2, H / 2, "NEW HIGH SCORE!", "#ffaa00", 120, -0.5, 45);
          playBeep(1200, 0.4, 'sine', 0.2);
          applyScreenShake(10);
        }

        enemies = enemies.filter(e => e !== targetEnemy);
        targetEnemy = null; inputBuffer = ''; mobileInput.value = ''; 
      }
    } else {
      inputBuffer = ''; targetEnemy = null; combo = 0; comboTimer = 0; beamAlpha = 0;
      mobileInput.value = ''; applyScreenShake(2);
    }
  }

  window.addEventListener('keydown', (e) => {
    if (e.repeat) return; 
    if (e.key === 'Enter') {
      if (gameState === 'menu' || gameState === 'gameover' || (gameState === 'tutorial_play' && tutorialStep === 3)) restartGame();
      return;
    }
    if (e.key === 'Escape') {
      if (gameState === 'playing' || gameState === 'paused') changeState(gameState === 'paused' ? 'playing' : 'paused');
      return;
    }
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    
    if (e.key === 'Backspace') {
      processType('Backspace'); e.preventDefault();
    } else {
      processType(e.key);
    }
  });

  mobileInput.addEventListener('input', (e) => {
    if (gameState !== 'playing' && gameState !== 'tutorial_play') return;
    const val = mobileInput.value;
    if (val.length < inputBuffer.length) processType('Backspace');
    else if (val.length > inputBuffer.length) processType(val.slice(-1));
  });

  function handleInteraction(e) {
    initAudio();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (!clientX) return;

    for (const zone of activeClickZones) {
      if (clientX >= zone.x && clientX <= zone.x + zone.w &&
          clientY >= zone.y && clientY <= zone.y + zone.h) {
        zone.action(); return; 
      }
    }

    if (gameState === 'playing' || gameState === 'tutorial_play') {
       mobileInput.focus(); 
       for (let i = 0; i < abilityButtons.length; i++) {
         const btn = abilityButtons[i];
         const dx = clientX - btn.x;
         const dy = clientY - btn.y;
         
         if (Math.sqrt(dx * dx + dy * dy) <= btn.radius + 15) { 
           applyPowerUp(btn); 
           abilityButtons.splice(i, 1); 
           
           if (gameState === 'tutorial_play' && tutorialStep === 2) {
              tutorialStep = 3; stateTimer = 0;
           }
           return;
         }
       }
    }
  }

  canvas.addEventListener('mousedown', handleInteraction);
  canvas.addEventListener('touchstart', (e) => {
    if (e.target === canvas) e.preventDefault(); 
    handleInteraction(e);
  }, { passive: false });

  function updateBot() {
    botTimer++;
    if (botTimer > (10 + Math.random() * 8)) { 
      botTimer = 0;
      if (!targetEnemy && enemies.length > 0) {
         let lowest = null;
         for (let e of enemies) { if (!lowest || e.y > lowest.y) lowest = e; }
         if (lowest && lowest.y > 50) { targetEnemy = lowest; inputBuffer = ''; }
      }
      
      if (targetEnemy) {
         if (inputBuffer.length < targetEnemy.word.length) {
           inputBuffer += targetEnemy.word[inputBuffer.length];
           targetEnemy.typed = inputBuffer;
           beamAlpha = 1.0;
           for(let i = 0; i < 2; i++) {
              particles.push({
               x: targetEnemy.x + (Math.random() - 0.5) * 20, y: targetEnemy.y + 15,
               vx: (Math.random() - 0.5) * 3, vy: Math.random() * 4,
               life: 10, maxLife: 10, color: '#00f3ff', size: 2
             });
           }
         }
         
         if (inputBuffer === targetEnemy.word) {
           createExplosion(targetEnemy.x, targetEnemy.y, targetEnemy.color);
           enemies = enemies.filter(e => e !== targetEnemy);
           targetEnemy = null; inputBuffer = '';
         }
      }
    }
  }

  function update() {
    frameCount++;
    stateTimer++;
    
    const dt = slowMotion ? 0.3 : 1.0;

    const speedBoost = 1 + (combo * 0.1);
    for (const star of stars) {
      star.stretch = star.speed * speedBoost * (slowMotion ? 0.3 : 1);
      star.y += star.stretch;
      if (star.y > H) { 
        star.y = -50; star.x = Math.random() * W; 
      }
    }

    if (gameState === 'playing' || gameState === 'menu' || gameState === 'tutorial_play') {
      if (gameState === 'menu') updateBot();

      if (targetEnemy) player.targetX = targetEnemy.x;
      else player.targetX = W / 2;
      
      // Update dash trails if moving fast
      if (Math.abs(player.targetX - player.x) > 3 && frameCount % 2 === 0) {
        playerTrails.push({ x: player.x, y: player.y, life: 12, maxLife: 12 });
      }
      
      player.x += (player.targetX - player.x) * 0.12; 
      player.y = H - 100 + Math.sin(frameCount * 0.08) * 8;

      if (comboTimer > 0) { 
        comboTimer--; 
        if (comboTimer === 0) combo = 0; 
      }
      if (slowMotion) { 
        slowTimer--; 
        if (slowTimer <= 0) slowMotion = false; 
      }
      if (freezeMotion) {
        freezeTimer--;
        if (freezeTimer <= 0) freezeMotion = false;
      }
      if (player.shieldActive) { 
        player.shieldTimer--; 
        if (player.shieldTimer <= 0) player.shieldActive = false; 
      }
      if (player.hitFlash > 0) player.hitFlash--;

      if (beamAlpha > 0 && (!targetEnemy || inputBuffer === '')) {
        beamAlpha -= 0.15; if (beamAlpha < 0) beamAlpha = 0;
      } else if (beamAlpha < 1 && targetEnemy && inputBuffer.length > 0) {
        beamAlpha += 0.2; if (beamAlpha > 1) beamAlpha = 1;
      }

      if (gameState === 'playing') {
        spawnTimer += dt;
        
        let baseDelay = 110;
        let spawnScoreFactor = 0; 

        if (baseDifficulty === 'easy') {
          baseDelay = 160; spawnScoreFactor = 0; 
        } else if (baseDifficulty === 'medium') {
          baseDelay = 110; spawnScoreFactor = 0; 
        } else if (baseDifficulty === 'hard') {
          baseDelay = 100; spawnScoreFactor = score * 0.015; 
        } else if (baseDifficulty === 'expert') {
          baseDelay = 85; spawnScoreFactor = score * 0.02; 
        } else if (baseDifficulty === 'auto') {
          const currentDiff = getDifficulty();
          if (currentDiff === 'easy') baseDelay = 160;
          else if (currentDiff === 'medium') baseDelay = 110;
          else if (currentDiff === 'hard') baseDelay = 100;
          else baseDelay = 85;
          spawnScoreFactor = score * 0.06; 
        }

        const spawnDelay = Math.max(20, baseDelay - spawnScoreFactor);
        
        if (spawnTimer >= spawnDelay) {
          spawnTimer = 0; spawnEnemy();
        }

        abilitySpawnTimer += dt;
        if (abilitySpawnTimer > 400 && abilityButtons.length < 2 && Math.random() < 0.01) {
          abilitySpawnTimer = 0; spawnAbilityButton();
        }

      } else if (gameState === 'tutorial_play') {
        if (tutorialStep === 0) {
          if (enemies.length === 0 && tutorialTimer === 0) {
            enemies.push({ x: W / 2, y: -50, word: 'sys', typed: '', speed: (H / 600) * 0.4, radius: 25, color: neonColors[0], rotation: 0, rotSpeed: 0.02, scale: 0 });
            tutorialTimer = 1;
          }
          if (enemies.length === 0 && tutorialTimer === 1) {
            tutorialStep = 1; tutorialTimer = 0; stateTimer = 0; 
          }
        } 
        else if (tutorialStep === 1) {
          if (enemies.length === 0 && tutorialTimer === 0) {
            enemies.push({ x: W / 3, y: -50, word: 'lock', typed: '', speed: (H / 600) * 0.4, radius: 25, color: neonColors[1], rotation: 0, rotSpeed: 0.02, scale: 0 });
            enemies.push({ x: (W / 3) * 2, y: -150, word: 'load', typed: '', speed: (H / 600) * 0.4, radius: 25, color: neonColors[2], rotation: 0, rotSpeed: 0.02, scale: 0 });
            tutorialTimer = 1;
          }
          if (enemies.length === 0 && tutorialTimer === 1) {
            tutorialStep = 2; tutorialTimer = 0; stateTimer = 0; 
          }
        } 
        else if (tutorialStep === 2) {
          if (abilityButtons.length === 0 && tutorialTimer === 0) {
            abilityButtons.push({ x: W / 2, y: H / 2, type: 'nuke', color: '#ffaa00', radius: 35, life: 9999, maxLife: 9999 });
            tutorialTimer = 1;
          }
        }
      }

      for (const enemy of enemies) {
        if (enemy.scale < 1) enemy.scale = Math.min(1, enemy.scale + 0.08); // Spawn scaling animation
        
        if (!freezeMotion) {
          enemy.y += enemy.speed * dt;
          enemy.rotation += enemy.rotSpeed * dt;
        }
        
        if (Math.random() > 0.6) {
           particles.push({
             x: enemy.x + (Math.random() - 0.5) * 10, y: enemy.y - enemy.radius,
             vx: 0, vy: -enemy.speed * (freezeMotion ? 0 : 0.5),
             life: 10, maxLife: 10, color: freezeMotion ? '#00aaff' : enemy.color, size: 1.5
           });
        }

        if (enemy.y > H + 50) {
          if (gameState === 'playing') {
            if (!player.shieldActive) {
              enemiesPassed++; 
              applyScreenShake(3);
              
              if (enemiesPassed >= enemiesToDamage) {
                health--; 
                enemiesPassed = 0; 
                playerHitAnimation();
                
                if (health <= 0) {
                  changeState('gameover');
                  if (score > highScore) {
                    highScore = score; localStorage.setItem('typeStrikeHighScore', highScore);
                  }
                  createExplosion(player.x, player.y, '#00f3ff', 80);
                }
              } else {
                spawnFloatingText(W / 2, H - 40, `LEAK DETECTED: ${enemiesPassed}/5`, '#ff003c');
              }
            } else {
              createExplosion(enemy.x, H - 30, '#00ff66');
            }
          } else if (gameState === 'tutorial_play') {
            enemy.y = -50; 
          } else {
            createExplosion(enemy.x, H - 30, enemy.color, 15);
          }
          
          if (gameState !== 'tutorial_play') {
            enemies = enemies.filter(e => e !== enemy);
            if (targetEnemy === enemy) { targetEnemy = null; inputBuffer = ''; beamAlpha = 0; }
          }
        }
      }
    }
    
    // Update trails
    for (const t of playerTrails) t.life -= dt;
    playerTrails = playerTrails.filter(t => t.life > 0);
    
    for (const p of particles) {
      p.life--; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.94; p.vy *= 0.94;
    }
    particles = particles.filter(p => p.life > 0);

    for (const ft of floatingTexts) { ft.life--; ft.y += ft.vy * dt; }
    floatingTexts = floatingTexts.filter(ft => ft.life > 0);

    for (const sw of shockwaves) {
      sw.radius += (sw.maxRadius - sw.radius) * 0.15 * dt; sw.alpha -= 0.03 * dt;
    }
    shockwaves = shockwaves.filter(sw => sw.alpha > 0);

    for (const btn of abilityButtons) btn.life -= dt; 
    abilityButtons = abilityButtons.filter(btn => btn.life > 0);

    if (shakeDuration > 0) { shakeDuration--; shakeAmount *= 0.85; } 
    else { shakeAmount = 0; }
  }

  function applyPowerUp(pu) {
    playBeep(800, 0.2, 'sine');
    createExplosion(pu.x, pu.y, pu.color, 20);
    spawnFloatingText(pu.x, pu.y, pu.type.toUpperCase(), pu.color);
    
    switch (pu.type) {
      case 'slow': slowMotion = true; slowTimer = 400; break;
      case 'double': score += 50; spawnFloatingText(pu.x, pu.y - 20, '+50', '#ffaa00'); break;
      case 'shield': player.shieldActive = true; player.shieldTimer = 600; break;
      case 'nuke': activateNuke(); break;
      case 'heal': 
        health = Math.min(maxHealth, health + 1);
        enemiesPassed = 0;
        spawnFloatingText(pu.x, pu.y - 20, 'SYSTEM RESTORED', '#ff007f'); 
        break;
      case 'freeze': 
        freezeMotion = true; freezeTimer = 300; 
        spawnFloatingText(W / 2, H / 2, 'SYSTEM FROZEN', '#00aaff', 60, -1, 36);
        break;
    }
  }

  function drawBackground() {
    ctx.fillStyle = '#020208'; 
    ctx.fillRect(0, 0, W, H);
    
    const grad = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, Math.max(W, H));
    grad.addColorStop(0, 'rgba(10, 5, 25, 0.8)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = grad; 
    ctx.fillRect(0, 0, W, H);

    for (const star of stars) {
      ctx.strokeStyle = star.color; ctx.globalAlpha = star.alpha; ctx.lineWidth = star.size;
      ctx.beginPath(); ctx.moveTo(star.x, star.y);
      const tail = star.stretch ? star.stretch * 2 : star.size * 2;
      ctx.lineTo(star.x, star.y - tail); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  
  function drawPlayerTrails() {
    for (const t of playerTrails) {
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate((player.targetX - t.x) * 0.01); 
        ctx.globalAlpha = (t.life / t.maxLife) * 0.4;
        ctx.fillStyle = '#00f3ff';
        ctx.beginPath(); 
        ctx.moveTo(0, -30); ctx.lineTo(25, 20); ctx.lineTo(10, 12);
        ctx.lineTo(0, 18); ctx.lineTo(-10, 12); ctx.lineTo(-25, 20); 
        ctx.closePath(); ctx.fill(); 
        ctx.restore();
    }
  }

  function drawPlayer() {
    ctx.save(); 
    ctx.translate(player.x, player.y);

    ctx.shadowBlur = 20; 
    ctx.shadowColor = '#00f3ff';
    
    const trackTilt = (player.targetX - player.x) * 0.05; 
    ctx.rotate(trackTilt * 0.2);
    const flameHeight = 20 + Math.random() * 15;
    ctx.fillStyle = '#00f3ff'; 
    ctx.beginPath();
    ctx.moveTo(-8, 12); ctx.lineTo(0, 12 + flameHeight); ctx.lineTo(8, 12); ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = (player.hitFlash > 0 && Math.floor(frameCount / 3) % 2 === 0) ? '#ff003c' : '#111';
    ctx.strokeStyle = '#00f3ff'; 
    ctx.lineWidth = 3; ctx.lineJoin = 'round';

    ctx.beginPath(); 
    ctx.moveTo(0, -30); ctx.lineTo(25, 20); ctx.lineTo(10, 12);
    ctx.lineTo(0, 18); ctx.lineTo(-10, 12); ctx.lineTo(-25, 20); 
    ctx.closePath(); ctx.fill(); ctx.stroke();
    
    ctx.fillStyle = 'rgba(0, 243, 255, 0.7)'; 
    ctx.beginPath();
    ctx.moveTo(0, -12); ctx.lineTo(6, 2); ctx.lineTo(-6, 2); ctx.fill();
    
    if (player.shieldActive) {
      ctx.save(); 
      ctx.rotate(-frameCount * 0.03);
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.8)'; 
      ctx.lineWidth = 3; ctx.shadowBlur = 15; ctx.shadowColor = '#00ff66';
      for(let i = 0; i < 6; i++) {
         ctx.beginPath(); ctx.arc(0, 0, player.radius + 20, i * Math.PI / 3, (i + 0.7) * Math.PI / 3); ctx.stroke();
      }
      ctx.restore();
    }
    ctx.restore();
  }

  function drawLaserBeam() {
    if (!targetEnemy || beamAlpha <= 0) return;
    ctx.save(); ctx.globalAlpha = beamAlpha;
    const dx = targetEnemy.x - player.x;
    const dy = targetEnemy.y - player.y + 25;
    ctx.translate(player.x, player.y - 30);
    ctx.shadowColor = '#00f3ff'; ctx.shadowBlur = 20;
    const pulse = Math.sin(frameCount * 0.5) * 3;
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.6)'; ctx.lineWidth = 8 + pulse;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(dx, dy); ctx.stroke();
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3 + (pulse / 2);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(dx, dy); ctx.stroke();
    ctx.translate(dx, dy); ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(0, 0, 10 + pulse, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawEnemies() {
    for (const enemy of enemies) {
      ctx.save(); 
      ctx.translate(enemy.x, enemy.y);
      ctx.scale(enemy.scale, enemy.scale); // Applied spawn scaling
      
      const hover = Math.sin(frameCount * 0.1 + enemy.x) * 4; 
      ctx.translate(0, hover);
      ctx.rotate(enemy.rotation);
      
      ctx.fillStyle = 'rgba(10, 10, 20, 0.9)'; 
      ctx.strokeStyle = freezeMotion ? '#00aaff' : enemy.color; // Ice effect
      ctx.lineWidth = 3; 
      ctx.shadowBlur = 15; 
      ctx.shadowColor = freezeMotion ? '#00aaff' : enemy.color;

      ctx.beginPath(); 
      ctx.moveTo(0, -enemy.radius); ctx.lineTo(enemy.radius, 0);
      ctx.lineTo(0, enemy.radius); ctx.lineTo(-enemy.radius, 0);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      
      ctx.fillStyle = freezeMotion ? '#00aaff' : enemy.color; 
      ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2); ctx.fill();
      
      ctx.rotate(-enemy.rotation);
      if (enemy === targetEnemy) {
        ctx.save(); ctx.rotate(frameCount * 0.1);
        ctx.strokeStyle = '#00f3ff'; ctx.lineWidth = 3; 
        const size = enemy.radius + 15;
        ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI / 2 - 0.3); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, size, Math.PI, Math.PI * 1.5 - 0.3); ctx.stroke();
        ctx.restore();
      }
      const fullWord = enemy.word; 
      const typedPart = enemy.typed || '';
      const remainingPart = fullWord.slice(typedPart.length);
      
      ctx.font = 'bold 20px "Orbitron", sans-serif'; 
      const typedWidth = ctx.measureText(typedPart).width;
      const remainWidth = ctx.measureText(remainingPart).width;
      const totalWidth = typedWidth + remainWidth;
      
      const boxW = totalWidth + 30; const boxH = 30; const boxY = enemy.radius + 15;
      ctx.fillStyle = 'rgba(5, 5, 15, 0.9)'; ctx.shadowBlur = 0;
      ctx.beginPath(); ctx.roundRect(-boxW / 2, boxY, boxW, boxH, 8); ctx.fill();
      
      ctx.strokeStyle = enemy === targetEnemy ? '#00f3ff' : (freezeMotion ? '#00aaff' : enemy.color);
      ctx.lineWidth = 2; ctx.stroke();
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      let startX = -totalWidth / 2; 
      
      if (typedPart.length > 0) {
        ctx.fillStyle = '#00f3ff'; ctx.shadowBlur = 10; ctx.shadowColor = '#00f3ff';
        ctx.fillText(typedPart, startX, boxY + boxH / 2); startX += typedWidth;
      }
      if (remainingPart.length > 0) {
        ctx.fillStyle = '#777788'; ctx.shadowBlur = 0;
        ctx.fillText(remainingPart, startX, boxY + boxH / 2);
      }
      ctx.restore();
    }
  }

  function drawParticlesAndText() {
    for (const sw of shockwaves) {
      ctx.save(); ctx.globalAlpha = sw.alpha; ctx.beginPath(); ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color; ctx.lineWidth = 4; ctx.shadowBlur = 15; ctx.shadowColor = sw.color;
      ctx.stroke(); ctx.restore();
    }
    ctx.globalCompositeOperation = 'lighter';
    for (const p of particles) {
      const alpha = p.life / p.maxLife; ctx.fillStyle = p.color; ctx.globalAlpha = alpha;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    for (const ft of floatingTexts) {
      ctx.save(); ctx.globalAlpha = ft.life / ft.maxLife; ctx.fillStyle = ft.color;
      ctx.font = `bold ${ft.size || 22}px "Orbitron"`; // Dynamic font sizing
      ctx.textAlign = 'center'; ctx.shadowBlur = 10; ctx.shadowColor = ft.color;
      ctx.fillText(ft.text, ft.x, ft.y); ctx.restore();
    }
  }

  function drawAbilityButtons() {
    for (const btn of abilityButtons) {
      ctx.save(); ctx.translate(btn.x, btn.y);
      const scale = 1 + Math.sin(btn.life * 0.1) * 0.1; ctx.scale(scale, scale);
      if (btn.life < 60) ctx.globalAlpha = btn.life / 60;
      
      ctx.shadowColor = btn.color; ctx.shadowBlur = 20;
      ctx.strokeStyle = btn.color; ctx.lineWidth = 3; ctx.fillStyle = 'rgba(10,10,20,0.9)';

      ctx.beginPath(); ctx.arc(0, 0, btn.radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.rotate(frameCount * 0.05); ctx.setLineDash([10, 10]);
      ctx.beginPath(); ctx.arc(0, 0, btn.radius + 8, 0, Math.PI * 2); ctx.stroke();
      
      ctx.setLineDash([]); ctx.rotate(-frameCount * 0.05);
      ctx.shadowBlur = 0; ctx.fillStyle = btn.color; ctx.font = 'bold 12px "Share Tech Mono"';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      
      let icon = 'PWR';
      if (btn.type === 'slow') icon = 'TIME';
      else if (btn.type === 'double') icon = 'x2';
      else if (btn.type === 'shield') icon = 'SHIELD';
      else if (btn.type === 'nuke') icon = 'NUKE';
      else if (btn.type === 'heal') icon = 'HP';
      else if (btn.type === 'freeze') icon = 'FREEZE';
      
      ctx.fillText('TAP', 0, -8); ctx.fillText(icon, 0, 8);
      ctx.restore();
    }
  }

  function drawHUD() {
    const padding = 20;
    ctx.fillStyle = '#00f3ff'; ctx.font = 'bold 20px "Orbitron", sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText(`SCORE // ${score}`, padding, padding);
    
    // High Score Flash Animation
    if (newHighScoreTriggered) {
      ctx.fillStyle = (Math.floor(frameCount / 5) % 2 === 0) ? '#ffaa00' : '#bc13fe';
    } else {
      ctx.fillStyle = '#bc13fe'; 
    }
    ctx.font = '16px "Share Tech Mono"';
    ctx.fillText(`HIGH: ${Math.max(highScore, score)}`, padding, padding + 25);
    
    if (combo > 0) {
      const mult = (1 + (combo - 1) * 0.5).toFixed(1);
      const comboShake = combo > 5 ? (Math.random() - 0.5) * 4 : 0;
      ctx.fillStyle = '#ffaa00'; ctx.font = 'bold 24px "Orbitron", sans-serif';
      ctx.textAlign = 'center'; ctx.shadowBlur = 10; ctx.shadowColor = '#ffaa00';
      ctx.fillText(`COMBO x${mult}`, W / 2 + comboShake, padding + comboShake); 
      ctx.shadowBlur = 0;
    }
    const barWidth = 24; const spacing = 8;
    const totalHealthWidth = maxHealth * (barWidth + spacing);
    const startX = W - padding - totalHealthWidth;
    
    ctx.fillStyle = '#00ff66'; ctx.textAlign = 'right'; ctx.font = '16px "Share Tech Mono"';
    ctx.fillText('Health', startX - 10, padding + 4);

    for (let i = 0; i < maxHealth; i++) {
      ctx.beginPath(); ctx.rect(startX + i * (barWidth + spacing), padding, barWidth, 14);
      if (i < health) {
        ctx.fillStyle = '#00ff66'; ctx.shadowBlur = 10; ctx.shadowColor = '#00ff66'; ctx.fill();
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; ctx.lineWidth = 2; ctx.shadowBlur = 0; ctx.stroke();
      }
    } 
    ctx.shadowBlur = 0;

    const breachStartX = W - padding - totalHealthWidth;
    ctx.fillStyle = '#ff003c'; ctx.fillText('BREACH', breachStartX - 10, padding + 34);
    
    for (let i = 0; i < enemiesToDamage; i++) {
      ctx.beginPath(); ctx.rect(breachStartX + i * (barWidth + spacing), padding + 30, barWidth, 10);
      if (i < enemiesPassed) {
        ctx.fillStyle = '#ff003c'; ctx.shadowBlur = 10; ctx.shadowColor = '#ff003c'; ctx.fill();
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; ctx.lineWidth = 2; ctx.shadowBlur = 0; ctx.stroke();
      }
    } 
    ctx.shadowBlur = 0;

    const pBtn = { x: padding, y: H - padding - 40, w: 40, h: 40 };
    activeClickZones.push({ x: pBtn.x, y: pBtn.y, w: pBtn.w, h: pBtn.h, action: () => changeState('paused') });
    ctx.fillStyle = 'rgba(0, 243, 255, 0.1)'; ctx.strokeStyle = '#00f3ff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(pBtn.x, pBtn.y, pBtn.w, pBtn.h, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#00f3ff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('||', pBtn.x + pBtn.w / 2, pBtn.y + pBtn.h / 2);
  }

  function drawSpaceIconButton(cx, cy, radius, iconType, label, color, offsetTime) {
    const pulse = Math.sin(frameCount * 0.05 + offsetTime) * 3;
    const hoverY = cy + Math.sin(frameCount * 0.03 + offsetTime) * 5;
    const slideOffset = Math.max(0, 50 - stateTimer * 3);
    const finalY = hoverY + slideOffset;
    const alpha = Math.min(1, stateTimer / 15);

    ctx.save(); ctx.globalAlpha = alpha; ctx.translate(cx, finalY);
    ctx.fillStyle = 'rgba(10, 15, 30, 0.7)'; ctx.strokeStyle = color; ctx.lineWidth = 2 + pulse * 0.3;
    ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.save(); ctx.rotate(frameCount * 0.02 + offsetTime); ctx.setLineDash([4, 8]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(0, 0, radius + 6 + pulse * 0.2, 0, Math.PI * 2); ctx.stroke(); ctx.restore();

    ctx.beginPath(); ctx.arc(0, 0, radius - 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; ctx.lineWidth = 1; ctx.stroke();

    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    const s = radius * 0.4; 

    ctx.beginPath();
    if (iconType === 'play') {
      ctx.moveTo(-s * 0.6, -s); ctx.lineTo(s, 0); ctx.lineTo(-s * 0.6, s); ctx.closePath(); ctx.fill();
    } else if (iconType === 'info') {
      ctx.font = `bold ${radius}px "Share Tech Mono"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', 0, 2);
    } else if (iconType === 'diff') {
      const levels = ['auto', 'easy', 'medium', 'hard', 'expert'];
      let idx = levels.indexOf(baseDifficulty);
      const barW = 4; const gap = 4; let startX = -((4 * barW + 3 * gap) / 2) + barW / 2;
      for (let i = 1; i <= 4; i++) {
        const h = i * 5 + 2; ctx.beginPath(); ctx.moveTo(startX, s); ctx.lineTo(startX, s - h);
        ctx.strokeStyle = (baseDifficulty === 'auto' || i <= idx) ? '#fff' : 'rgba(255,255,255,0.2)'; ctx.stroke();
        startX += barW + gap;
      }
    } else if (iconType === 'back') {
      ctx.moveTo(s * 0.5, -s * 0.6); ctx.lineTo(-s * 0.5, 0); ctx.lineTo(s * 0.5, s * 0.6); ctx.stroke();
    } else if (iconType === 'reboot') {
      ctx.beginPath(); ctx.arc(0, 0, s, 0, Math.PI * 2); ctx.stroke();
    } else if (iconType === 'abort') {
      ctx.moveTo(-s, -s); ctx.lineTo(s, s); ctx.moveTo(s, -s); ctx.lineTo(-s, s); ctx.stroke();
    }

    ctx.fillStyle = color; ctx.font = 'bold 14px "Orbitron"'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText(`[ ${label} ]`, 0, radius + 15);
    ctx.restore();
    return { x: cx - radius, y: finalY - radius, w: radius * 2, h: radius * 2 + 40 };
  }

  function drawMenu() {
    ctx.fillStyle = 'rgba(2, 2, 8, 0.65)'; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)'; ctx.lineWidth = 2;
    const p = 30; const l = 20; 
    ctx.beginPath(); ctx.moveTo(p, p+l); ctx.lineTo(p, p); ctx.lineTo(p+l, p); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W-p, p+l); ctx.lineTo(W-p, p); ctx.lineTo(W-p-l, p); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(p, H-p-l); ctx.lineTo(p, H-p); ctx.lineTo(p+l, H-p); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W-p, H-p-l); ctx.lineTo(W-p, H-p); ctx.lineTo(W-p-l, H-p); ctx.stroke();
    ctx.fillStyle = 'rgba(0, 243, 255, 0.4)'; ctx.font = '12px "Share Tech Mono"'; ctx.textAlign = 'left';
    
    const titleAlpha = Math.min(1, stateTimer / 20);
    const titleY = Math.max(H / 3 - 40, H / 3 - 60 + (20 - stateTimer));
    
    ctx.save(); ctx.globalAlpha = titleAlpha; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '900 64px "Orbitron"'; ctx.fillStyle = '#fff'; ctx.fillText('TYPE STRIKE', W / 2, titleY);
    ctx.fillStyle = '#00f3ff'; ctx.font = '400 20px "Share Tech Mono"'; ctx.fillText('H Y P E R D R I V E   O S', W / 2, titleY + 60); ctx.restore();

    const r = 45; const gap = 60; const totalW = (r * 2 * 3) + (gap * 2); 
    const startX = W / 2 - totalW / 2 + r; const startY = H / 2 + 80;

    let b1 = drawSpaceIconButton(startX, startY, r, 'play', 'START', '#00f3ff', 0);
    activeClickZones.push({ ...b1, action: restartGame });

    let b2 = drawSpaceIconButton(startX + r * 2 + gap, startY, r, 'info', 'TUTORIAL', '#ffaa00', 1);
    activeClickZones.push({ ...b2, action: startInteractiveTutorial });

    let b3 = drawSpaceIconButton(startX + (r * 2 + gap) * 2, startY, r, 'diff', `LVL: ${baseDifficulty.toUpperCase()}`, '#bc13fe', 2);
    activeClickZones.push({
      ...b3, action: () => {
        const diffs = ['auto', 'easy', 'medium', 'hard', 'expert'];
        baseDifficulty = diffs[(diffs.indexOf(baseDifficulty) + 1) % diffs.length];
      }
    });
    
    if (stateTimer > 40) {
       ctx.save(); ctx.globalAlpha = 0.5 + Math.sin(frameCount * 0.05) * 0.3;
       ctx.fillStyle = '#fff'; ctx.font = '14px "Share Tech Mono"'; ctx.textAlign = 'center';
       ctx.fillText('[ Credits : Mohamed Boolean ]', W / 2, H - 30); ctx.restore();
    }
  }

  function drawTutorialInteractive() {
    ctx.save();
    ctx.fillStyle = 'rgba(2, 2, 8, 0)'; ctx.fillRect(0, 0, W, 60); ctx.fillRect(0, H - 60, W, 60);
    const scanY = (frameCount * 3) % H; ctx.fillStyle = 'rgba(0, 243, 255, 0.1)'; ctx.fillRect(0, scanY, W, 2);
    ctx.fillStyle = '#00f3ff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

    const chars = Math.floor(stateTimer * 0.5); const cursor = (frameCount % 30 < 15) ? '_' : '';

    if (tutorialStep === 0) {
      const msg = "DIRECTIVE 01: INTERCEPT SINGLE THREAT. TYPE 'SYS' TO ELIMINATE.";
      ctx.font = 'bold 16px "Share Tech Mono"'; ctx.fillText(msg.substring(0, chars) + (chars < msg.length ? cursor : ''), W / 2, 600);
      if (enemies[0]) {
         ctx.save(); ctx.translate(enemies[0].x, enemies[0].y); ctx.rotate(frameCount * 0.02);
         ctx.strokeStyle = 'rgba(255, 0, 60, 0.6)'; ctx.lineWidth = 1; ctx.setLineDash([10, 15]);
         ctx.beginPath(); ctx.arc(0, 0, 45, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      }
    } else if (tutorialStep === 1) {
      const msg = "DIRECTIVE 02: MULTIPLE THREATS DETECTED. ELIMINATE BOTH FOR COMBO.";
      ctx.font = 'bold 16px "Share Tech Mono"'; ctx.fillText(msg.substring(0, chars) + (chars < msg.length ? cursor : ''), W / 2, 600);
      for (const e of enemies) {
         ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(-frameCount * 0.02);
         ctx.strokeStyle = 'rgba(0, 243, 255, 0.5)'; ctx.lineWidth = 1; ctx.setLineDash([5, 10]);
         ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      }
    } else if (tutorialStep === 2) {
      const msg = "DIRECTIVE 03: TACTICAL ASSET DEPLOYED. CLICK OR TAP ICON TO ACTIVATE.";
      ctx.font = 'bold 16px "Share Tech Mono"'; ctx.fillText(msg.substring(0, chars) + (chars < msg.length ? cursor : ''), W / 2, 600);
    } else if (tutorialStep === 3) {
      ctx.fillStyle = 'rgba(2, 2, 8, 0.95)'; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#00ff66'; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(W/2 - 150, H/2 - 90); ctx.lineTo(W/2 + 150, H/2 - 90);
      ctx.moveTo(W/2 - 150, H/2 + 50); ctx.lineTo(W/2 + 150, H/2 + 50); ctx.stroke();
      ctx.fillStyle = '#00ff66'; ctx.font = 'bold 36px "Orbitron"'; ctx.fillText('SYSTEM CALIBRATED', W / 2, H / 2 - 40);
      ctx.fillStyle = '#fff'; ctx.font = '16px "Share Tech Mono"';
      ctx.fillText('5 Breaches = 1 System Health Failure.', W / 2, H / 2 + 5);
      ctx.fillText('Defend the mainframe at all costs.', W / 2, H / 2 + 30);
      let b1 = drawSpaceIconButton(W / 2, H / 2 + 120, 45, 'play', 'DEPLOY', '#00f3ff', 0);
      activeClickZones.push({ ...b1, action: restartGame });
    }
    ctx.restore();
  }

  function drawGameOver() {
    ctx.fillStyle = 'rgba(255, 0, 60, 0.3)'; ctx.fillRect(0, 0, W, H);
    const alpha = Math.min(1, stateTimer / 20); ctx.save(); ctx.globalAlpha = alpha;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 55px "Orbitron"'; ctx.fillStyle = '#ff003c'; ctx.shadowBlur = 20; ctx.shadowColor = '#ff003c';
    ctx.fillText('SYSTEM FAILURE', W / 2, H / 3 - 20);
    ctx.font = '24px "Share Tech Mono"'; ctx.fillStyle = '#fff'; ctx.shadowBlur = 0;
    ctx.fillText(`FINAL SCORE: ${score}`, W / 2, H / 2 - 20); ctx.restore();

    const r = 45; const gap = 60; const startX = W / 2 - r - gap / 2;
    let b1 = drawSpaceIconButton(startX, H / 2 + 80, r, 'reboot', 'REBOOT', '#00ff66', 0);
    activeClickZones.push({ ...b1, action: restartGame });
    let b2 = drawSpaceIconButton(startX + r * 2 + gap, H / 2 + 80, r, 'back', 'MENU', '#777788', 1);
    activeClickZones.push({ ...b2, action: () => changeState('menu') });
  }

  function drawPaused() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; ctx.fillRect(0, 0, W, H);
    const alpha = Math.min(1, stateTimer / 10); ctx.save(); ctx.globalAlpha = alpha;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 45px "Orbitron"'; ctx.fillStyle = '#00f3ff'; ctx.shadowBlur = 15; ctx.shadowColor = '#00f3ff';
    ctx.fillText('SYSTEM PAUSED', W / 2, H / 3); ctx.restore();

    const r = 45; const gap = 60; const startX = W / 2 - r - gap / 2;
    let b1 = drawSpaceIconButton(startX, H / 2 + 40, r, 'play', 'RESUME', '#00ff66', 0);
    activeClickZones.push({ ...b1, action: () => { changeState('playing'); mobileInput.focus(); } });
    let b2 = drawSpaceIconButton(startX + r * 2 + gap, H / 2 + 40, r, 'abort', 'ABORT', '#ff003c', 1);
    activeClickZones.push({ ...b2, action: () => changeState('menu') });
  }

  function draw() {
    activeClickZones = []; 
    ctx.save();
    if (shakeAmount > 0) {
      const dx = (Math.random() - 0.5) * shakeAmount; const dy = (Math.random() - 0.5) * shakeAmount; ctx.translate(dx, dy);
    }
    drawBackground();

    if (gameState === 'playing' || gameState === 'gameover' || gameState === 'paused' || gameState === 'menu' || gameState === 'tutorial_play') {
      drawLaserBeam(); drawEnemies();
      
      if (gameState !== 'gameover') {
        drawPlayerTrails(); drawPlayer();
      }
      
      drawParticlesAndText();
      
      if (gameState === 'playing') { drawAbilityButtons(); drawHUD(); }
      if (gameState === 'tutorial_play') { drawAbilityButtons(); drawTutorialInteractive(); }
    }
    ctx.restore();

    if (gameState === 'menu') drawMenu();
    else if (gameState === 'gameover') drawGameOver();
    else if (gameState === 'paused') drawPaused();
  }

  function gameLoop() { 
    update(); 
    draw();
    requestAnimationFrame(gameLoop); 
  }
  gameLoop();
})();