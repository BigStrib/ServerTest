// ==========================================
// 1. SUPABASE INITIALIZATION
// ==========================================
const PROJECT_URL = 'https://dnwuhpmlnmnhopzwaayl.supabase.co';
const ANON_PUBLIC_KEY = 'sb_publishable_W2QjBZKx2MM9FfhaWPaPfA_eGk_Bwav';
const supabaseClient = supabase.createClient(PROJECT_URL, ANON_PUBLIC_KEY);

// ==========================================
// 2. DOM ELEMENTS
// ==========================================
const nameInput = document.getElementById('nameInput');
const commentInput = document.getElementById('commentInput');
const submitBtn = document.getElementById('submitBtn');
const commentList = document.getElementById('commentList');
const nameCount = document.getElementById('nameCount');
const commentCount = document.getElementById('commentCount');
const emojiToggleBtn = document.getElementById('emojiToggleBtn');
const emojiModal = document.getElementById('emojiModal');
const emojiOverlay = document.getElementById('emojiOverlay');
const emojiCloseBtn = document.getElementById('emojiCloseBtn');
const emojiGrid = document.getElementById('emojiGrid');
const emojiSearch = document.getElementById('emojiSearch');
const emojiCategoryBar = document.getElementById('emojiCategoryBar');
const commentTotal = document.getElementById('commentTotal');
const refreshBtn = document.getElementById('refreshBtn');
const toast = document.getElementById('toast');

// ==========================================
// 3. VISITOR ID (persistent per browser)
// ==========================================
function getVisitorId() {
    let vid = localStorage.getItem('visitor_id');
    if (!vid) {
        vid = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('visitor_id', vid);
    }
    return vid;
}
const VISITOR_ID = getVisitorId();

// ==========================================
// 4. EMOJI DIRECTORY
// ==========================================
const emojiDirectory = {
    'smileys-emotion': {
        label: 'Smileys & Emotion',
        emojis: [
            '😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇',
            '🥰','😍','🤩','😘','😗','😚','😙','🥲','😋','😛','😜','🤪','😝',
            '🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄',
            '😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🥴',
            '😵','🤯','🥳','🥸','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯',
            '😲','😳','🥺','🥹','😦','😧','😨','😰','😥','😢','😭','😱','😖',
            '😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀',
            '☠️','💩','🤡','👹','👺','👻','👽','👾','🤖','😺','😸','😹','😻',
            '😼','😽','🙀','😿','😾','🙈','🙉','🙊','💌','💘','💝','💖','💗',
            '💓','💞','💕','💟','❣️','💔','❤️','🧡','💛','💚','💙','💜','🖤',
            '🤍','🤎','❤️‍🔥','❤️‍🩹','💯','💢','💥','💫','💦','💨','🕳️','💣',
            '💬','👁️‍🗨️','🗨️','🗯️','💭','💤','🫠','🫢','🫣','🫡','🫥','🫤'
        ]
    },
    'people-body': {
        label: 'People & Body',
        emojis: [
            '👋','🤚','🖐️','✋','🖖','🫱','🫲','🫳','🫴','👌','🤌','🤏','✌️',
            '🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍',
            '👎','✊','👊','🤛','🤜','👏','🙌','🫶','👐','🤲','🤝','🙏','✍️',
            '💅','🤳','💪','🦾','🦿','🦵','🦶','👂','🦻','👃','🧠','🫀','🫁',
            '🦷','🦴','👀','👁️','👅','👄','🫦','👶','🧒','👦','👧','🧑','👱',
            '👨','🧔','👩','🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏',
            '🙇','🤦','🤷','👮','🕵️','💂','🥷','👷','🫅','🤴','👸','👳','👲',
            '🧕','🤵','👰','🤰','🫃','🫄','🤱','👼','🎅','🤶','🦸','🦹','🧙',
            '🧚','🧛','🧜','🧝','🧞','🧟','🧌','💆','💇','🚶','🧍','🧎','🏃',
            '💃','🕺','🕴️','👯','🧖','🧗','🤸','⛹️','🏋️','🚴','🚵','🤼','🤽',
            '🤾','🤺','⛷️','🏂','🏌️','🏇','🏊','🤹','🧘','🛀','🛌','👭','👫','👬'
        ]
    },
    'animals-nature': {
        label: 'Animals & Nature',
        emojis: [
            '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️','🐨','🐯','🦁',
            '🐮','🐷','🐽','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤',
            '🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛',
            '🦋','🐌','🐞','🐜','🪰','🪲','🪳','🦟','🦗','🕷️','🕸️','🦂','🐢',
            '🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🪸','🐡','🐠','🐟',
            '🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏',
            '🐪','🐫','🦒','🦘','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙',
            '🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🪶','🐓','🦃','🦤',
            '🦚','🦜','🦢','🦩','🕊️','🐇','🦝','🦨','🦡','🦫','🦦','🦥','🐁',
            '🐀','🐿️','🦔','🐾','🐉','🐲','🌵','🎄','🌲','🌳','🌴','🪵','🌱',
            '🌿','☘️','🍀','🎍','🪴','🎋','🍃','🍂','🍁','🪺','🪹','🍄','🌾',
            '💐','🌷','🌹','🥀','🌺','🌸','🌼','🌻'
        ]
    },
    'food-drink': {
        label: 'Food & Drink',
        emojis: [
            '🍇','🍈','🍉','🍊','🍋','🍌','🍍','🥭','🍎','🍏','🍐','🍑','🍒',
            '🍓','🫐','🥝','🍅','🫒','🥥','🥑','🍆','🥔','🥕','🌽','🌶️','🫑',
            '🥒','🥬','🥦','🧄','🧅','🥜','🫘','🌰','🫚','🫛','🍞','🥐','🥖',
            '🫓','🥨','🥯','🥞','🧇','🧀','🍖','🍗','🥩','🥓','🍔','🍟','🍕',
            '🌭','🥪','🌮','🌯','🫔','🥙','🧆','🥚','🍳','🥘','🍲','🫕','🥣',
            '🥗','🍿','🧈','🧂','🥫','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍠',
            '🍢','🍣','🍤','🍥','🥮','🍡','🥟','🥠','🥡','🦀','🦞','🦐','🦑',
            '🦪','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭',
            '🍮','🍯','🍼','🥛','☕','🫖','🍵','🍶','🍾','🍷','🍸','🍹','🍺',
            '🍻','🥂','🥃','🫗','🥤','🧋','🧃','🧉','🧊'
        ]
    },
    'travel-places': {
        label: 'Travel & Places',
        emojis: [
            '🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚','🚛',
            '🚜','🛴','🚲','🛵','🏍️','🛺','🚨','🚔','🚍','🚘','🚖','🚡','🚠',
            '🚟','🚃','🚋','🚞','🚝','🚄','🚅','🚈','🚂','🚆','🚇','🚊','🚉',
            '✈️','🛫','🛬','🛩️','💺','🛰️','🚀','🛸','🚁','🛶','⛵','🚤','🛥️',
            '🛳️','⛴️','🚢','🏖️','🏝️','🏜️','🌋','⛰️','🏔️','🗻','🏕️','🏠','🏡',
            '🏢','🏬','🏣','🏤','🏥','🏦','🏨','🏪','🏫','🏰','🏯','🗼','🗽',
            '⛪','🕌','🕍','🛕','⛩️','🌅','🌄','🌇','🌆','🏙️','🌃','🌌','🌉','🌁'
        ]
    },
    'activities': {
        label: 'Activities',
        emojis: [
            '⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸',
            '🏒','🏑','🥍','🏏','🪃','🥅','⛳','🪁','🏹','🎣','🤿','🥊','🥋',
            '🎽','🛹','🛼','🛷','⛸️','🥌','🎿','⛷️','🏂','🏋️','🤸','⛹️','🤺',
            '🤾','🏌️','🏇','🧘','🏄','🏊','🤽','🚣','🧗','🚴','🚵','🏆','🥇',
            '🥈','🥉','🏅','🎗️','🎫','🎟️','🎪','🤹','🎭','🎨','🎬','🎤','🎧',
            '🎼','🎹','🥁','🎷','🎺','🎸','🪕','🎻','🎲','♟️','🎯','🎳','🎮',
            '🕹️','🧩','🎰'
        ]
    },
    'objects': {
        label: 'Objects',
        emojis: [
            '⌚','📱','💻','⌨️','🖥️','🖨️','💽','💾','💿','📀','🧮','🎥','📽️',
            '📺','📷','📸','📹','🔍','🔎','🕯️','💡','🔦','🏮','📔','📕','📖',
            '📗','📘','📙','📚','📓','📒','📃','📜','📄','📰','📑','🔖','🏷️',
            '💰','🪙','💴','💵','💶','💷','💸','💳','✉️','📧','📨','📩','📤',
            '📥','📦','📫','📪','📬','📭','📮','✏️','✒️','🖋️','🖊️','🖌️','🖍️',
            '📝','💼','📁','📂','📅','📆','📇','📈','📉','📊','📋','📌','📍',
            '📎','🖇️','📏','📐','✂️','🔒','🔓','🔑','🗝️','🔨','🪓','⛏️','🔧',
            '🪛','🔩','⚙️','🧲','⚗️','🧪','🧫','🧬','🔬','🔭','📡','💉','💊',
            '🩹','🩺','🚪','🛏️','🛋️','🪑','🚽','🚿','🛁','🧴','🧷','🧹','🧺',
            '🧻','🧼','🧽','🧯','🛒','💎','🎈','🎀','🎁','🎊','🎉','🎏','🏮'
        ]
    },
    'symbols': {
        label: 'Symbols',
        emojis: [
            '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','❤️‍🔥','💔','❣️','💕',
            '💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','☸️','✡️','🔯',
            '☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑',
            '♒','♓','🆔','⚛️','☢️','☣️','🆚','💮','㊙️','㊗️','🅰️','🅱️','🆎',
            '🆑','🅾️','🆘','❌','⭕','🛑','⛔','🚫','💯','💢','♨️','🔞','❗',
            '❕','❓','❔','‼️','⁉️','⚠️','♻️','✅','❇️','✳️','❎','🌐','💠',
            '🌀','💤','▶️','⏸️','⏹️','⏺️','⏭️','⏮️','⏩','⏪','➡️','⬅️','⬆️',
            '⬇️','↗️','↘️','↙️','↖️','↕️','↔️','🔀','🔁','🔂','🔄','🎵','🎶',
            '➕','➖','➗','✖️','♾️','💲','™️','©️','®️','✔️','☑️','🔘','🔴',
            '🟠','🟡','🟢','🔵','🟣','⚫','⚪','🟤','🔺','🔻','🔸','🔹','🔶',
            '🔷','🔳','🔲','🟥','🟧','🟨','🟩','🟦','🟪','⬛','⬜','🟫','🔔',
            '🔕','📣','📢','💬','💭','🗯️','♠️','♣️','♥️','♦️','🃏'
        ]
    },
    'flags': {
        label: 'Flags',
        emojis: [
            '🏁','🚩','🎌','🏴','🏳️','🏳️‍🌈','🏳️‍⚧️','🏴‍☠️','🇦🇩','🇦🇪',
            '🇦🇫','🇦🇬','🇦🇱','🇦🇲','🇦🇷','🇦🇸','🇦🇹','🇦🇺','🇦🇿','🇧🇦',
            '🇧🇧','🇧🇩','🇧🇪','🇧🇬','🇧🇭','🇧🇮','🇧🇯','🇧🇲','🇧🇳','🇧🇴',
            '🇧🇷','🇧🇸','🇧🇹','🇧🇼','🇧🇾','🇧🇿','🇨🇦','🇨🇩','🇨🇫','🇨🇬',
            '🇨🇭','🇨🇮','🇨🇱','🇨🇲','🇨🇳','🇨🇴','🇨🇷','🇨🇺','🇨🇻','🇨🇾',
            '🇨🇿','🇩🇪','🇩🇯','🇩🇰','🇩🇲','🇩🇴','🇩🇿','🇪🇨','🇪🇪','🇪🇬',
            '🇪🇷','🇪🇸','🇪🇹','🇪🇺','🇫🇮','🇫🇯','🇫🇰','🇫🇲','🇫🇷','🇬🇦',
            '🇬🇧','🇬🇩','🇬🇪','🇬🇭','🇬🇮','🇬🇲','🇬🇳','🇬🇶','🇬🇷','🇬🇹',
            '🇬🇺','🇬🇾','🇭🇰','🇭🇳','🇭🇷','🇭🇹','🇭🇺','🇮🇩','🇮🇪','🇮🇱',
            '🇮🇳','🇮🇶','🇮🇷','🇮🇸','🇮🇹','🇯🇲','🇯🇴','🇯🇵','🇰🇪','🇰🇬',
            '🇰🇭','🇰🇮','🇰🇲','🇰🇳','🇰🇵','🇰🇷','🇰🇼','🇰🇿','🇱🇦','🇱🇧',
            '🇱🇨','🇱🇮','🇱🇰','🇱🇷','🇱🇸','🇱🇹','🇱🇺','🇱🇻','🇱🇾','🇲🇦',
            '🇲🇨','🇲🇩','🇲🇪','🇲🇬','🇲🇭','🇲🇰','🇲🇱','🇲🇲','🇲🇳','🇲🇴',
            '🇲🇶','🇲🇷','🇲🇸','🇲🇹','🇲🇺','🇲🇻','🇲🇼','🇲🇽','🇲🇾','🇲🇿',
            '🇳🇦','🇳🇪','🇳🇬','🇳🇮','🇳🇱','🇳🇴','🇳🇵','🇳🇷','🇳🇺','🇳🇿',
            '🇴🇲','🇵🇦','🇵🇪','🇵🇬','🇵🇭','🇵🇰','🇵🇱','🇵🇲','🇵🇳','🇵🇷',
            '🇵🇸','🇵🇹','🇵🇼','🇵🇾','🇶🇦','🇷🇴','🇷🇸','🇷🇺','🇷🇼','🇸🇦',
            '🇸🇧','🇸🇨','🇸🇩','🇸🇪','🇸🇬','🇸🇮','🇸🇰','🇸🇱','🇸🇲','🇸🇳',
            '🇸🇴','🇸🇷','🇸🇸','🇸🇹','🇸🇻','🇸🇽','🇸🇾','🇸🇿','🇹🇩','🇹🇬',
            '🇹🇭','🇹🇯','🇹🇰','🇹🇱','🇹🇲','🇹🇳','🇹🇴','🇹🇷','🇹🇹','🇹🇻',
            '🇹🇼','🇹🇿','🇺🇦','🇺🇬','🇺🇳','🇺🇸','🇺🇾','🇺🇿','🇻🇦','🇻🇨',
            '🇻🇪','🇻🇬','🇻🇮','🇻🇳','🇻🇺','🇼🇸','🇾🇪','🇿🇦','🇿🇲','🇿🇼'
        ]
    }
};

let allEmojisFlat = [];
Object.entries(emojiDirectory).forEach(([group, data]) => {
    data.emojis.forEach(e => {
        allEmojisFlat.push({ character: e, group, label: data.label });
    });
});

// ==========================================
// 5. EMOJI DISPLAY
// ==========================================
function displayEmojiGroup(groupKey) {
    emojiGrid.innerHTML = '';
    const group = emojiDirectory[groupKey];
    if (!group) return;

    const label = document.createElement('div');
    label.className = 'emoji-section-label';
    label.textContent = group.label;
    emojiGrid.appendChild(label);

    group.emojis.forEach(char => {
        const btn = document.createElement('button');
        btn.className = 'emoji-item';
        btn.textContent = char;
        btn.addEventListener('click', () => {
            insertEmoji(char);
            closeEmojiModal();
        });
        emojiGrid.appendChild(btn);
    });
}

function searchEmojis(query) {
    emojiGrid.innerHTML = '';
    const q = query.toLowerCase();
    const results = allEmojisFlat.filter(e =>
        e.label.toLowerCase().includes(q) || e.character.includes(q)
    );

    if (results.length === 0) {
        emojiGrid.innerHTML = '<div class="emoji-loading"><i class="fas fa-search"></i> No emojis found</div>';
        return;
    }

    const grouped = {};
    results.forEach(r => {
        if (!grouped[r.group]) grouped[r.group] = { label: r.label, emojis: [] };
        grouped[r.group].emojis.push(r.character);
    });

    Object.values(grouped).forEach(g => {
        const label = document.createElement('div');
        label.className = 'emoji-section-label';
        label.textContent = g.label;
        emojiGrid.appendChild(label);
        g.emojis.forEach(char => {
            const btn = document.createElement('button');
            btn.className = 'emoji-item';
            btn.textContent = char;
            btn.addEventListener('click', () => {
                insertEmoji(char);
                closeEmojiModal();
            });
            emojiGrid.appendChild(btn);
        });
    });
}

function insertEmoji(char) {
    const start = commentInput.selectionStart;
    const end = commentInput.selectionEnd;
    const text = commentInput.value;
    commentInput.value = text.substring(0, start) + char + text.substring(end);
    commentInput.focus();
    const newPos = start + char.length;
    commentInput.setSelectionRange(newPos, newPos);
    updateCharCount(commentInput, commentCount, 500);
}

// ==========================================
// 6. EMOJI MODAL
// ==========================================
function openEmojiModal() {
    emojiModal.classList.add('visible');
    emojiOverlay.classList.add('visible');
    emojiSearch.value = '';
    emojiSearch.focus();
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.cat-btn').classList.add('active');
    displayEmojiGroup('smileys-emotion');
}

function closeEmojiModal() {
    emojiModal.classList.remove('visible');
    emojiOverlay.classList.remove('visible');
}

emojiToggleBtn.addEventListener('click', openEmojiModal);
emojiCloseBtn.addEventListener('click', closeEmojiModal);
emojiOverlay.addEventListener('click', closeEmojiModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && emojiModal.classList.contains('visible')) closeEmojiModal();
});

emojiCategoryBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    emojiSearch.value = '';
    displayEmojiGroup(btn.dataset.group);
});

let searchTimeout;
emojiSearch.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const val = e.target.value.trim();
    searchTimeout = setTimeout(() => {
        if (val.length > 0) {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            searchEmojis(val);
        } else {
            const ab = document.querySelector('.cat-btn.active') || document.querySelector('.cat-btn');
            if (ab) { ab.classList.add('active'); displayEmojiGroup(ab.dataset.group); }
        }
    }, 150);
});

// ==========================================
// 7. CHARACTER COUNTERS
// ==========================================
function updateCharCount(input, countEl, max) {
    const len = input.value.length;
    countEl.textContent = `${len}/${max}`;
    countEl.style.color = len >= max * 0.9 ? '#a34a50' : '#3a3c42';
}
nameInput.addEventListener('input', () => updateCharCount(nameInput, nameCount, 50));
commentInput.addEventListener('input', () => updateCharCount(commentInput, commentCount, 500));

// ==========================================
// 8. HELPERS
// ==========================================
function getRelativeTime(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffSec = Math.floor((now - date) / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
}

function showToast(message, iconClass = 'fas fa-check-circle', iconColor = '#4caf50') {
    toast.querySelector('.toast-text').textContent = message;
    toast.querySelector('.toast-icon').className = 'toast-icon ' + iconClass;
    toast.querySelector('.toast-icon').style.color = iconColor;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3000);
}

// ==========================================
// 9. REACTIONS — SUPABASE
// ==========================================
async function handleReaction(commentId, type, btnEl) {
    // Disable button during request
    btnEl.disabled = true;

    const isReacted = btnEl.classList.contains('reacted');
    const countSpan = btnEl.querySelector('.count');
    const currentCount = parseInt(countSpan.textContent) || 0;

    if (isReacted) {
        // REMOVE reaction
        // Optimistic UI
        btnEl.classList.remove('reacted');
        countSpan.textContent = Math.max(0, currentCount - 1) || '';

        const { error } = await supabaseClient
            .from('reactions')
            .delete()
            .eq('comment_id', commentId)
            .eq('reaction_type', type)
            .eq('visitor_id', VISITOR_ID);

        if (error) {
            console.error('Remove reaction error:', error);
            // Revert
            btnEl.classList.add('reacted');
            countSpan.textContent = currentCount || '';
        }
    } else {
        // ADD reaction
        // Optimistic UI
        btnEl.classList.add('reacted');
        countSpan.textContent = currentCount + 1;

        const { error } = await supabaseClient
            .from('reactions')
            .upsert({
                comment_id: commentId,
                reaction_type: type,
                visitor_id: VISITOR_ID
            }, {
                onConflict: 'comment_id,reaction_type,visitor_id'
            });

        if (error) {
            console.error('Add reaction error:', error);
            // Revert
            btnEl.classList.remove('reacted');
            countSpan.textContent = currentCount || '';
        }
    }

    btnEl.disabled = false;
}

// ==========================================
// 10. FETCH & DISPLAY COMMENTS
// ==========================================
async function fetchComments() {
    commentList.innerHTML = `
        <div class="loading-state">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading comments...</span>
        </div>
    `;

    // Fetch comments
    const { data: comments, error: commentsError } = await supabaseClient
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

    if (commentsError) {
        console.error('Error fetching comments:', commentsError);
        commentList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-circle"></i>
                <strong>Failed to load comments</strong>
                <span>Please try refreshing</span>
            </div>
        `;
        commentTotal.innerHTML = '<i class="far fa-comment"></i> 0';
        return;
    }

    commentTotal.innerHTML = `<i class="far fa-comment"></i> ${comments.length}`;

    if (comments.length === 0) {
        commentList.innerHTML = `
            <div class="empty-state">
                <i class="far fa-comments"></i>
                <strong>No comments yet</strong>
                <span>Be the first to share your thoughts!</span>
            </div>
        `;
        return;
    }

    // Fetch ALL reactions in one query
    const commentIds = comments.map(c => c.id);
    const { data: reactions, error: reactionsError } = await supabaseClient
        .from('reactions')
        .select('comment_id, reaction_type, visitor_id')
        .in('comment_id', commentIds);

    // Build lookup: { commentId: { like: count, love: count, haha: count, mine: {like: bool, ...} } }
    const lookup = {};
    commentIds.forEach(id => {
        lookup[id] = {
            like: 0, love: 0, haha: 0,
            mine: { like: false, love: false, haha: false }
        };
    });

    if (!reactionsError && reactions) {
        reactions.forEach(r => {
            if (lookup[r.comment_id] && lookup[r.comment_id].hasOwnProperty(r.reaction_type)) {
                lookup[r.comment_id][r.reaction_type]++;
                if (r.visitor_id === VISITOR_ID) {
                    lookup[r.comment_id].mine[r.reaction_type] = true;
                }
            }
        });
    }

    // Render
    commentList.innerHTML = '';
    comments.forEach((comment, i) => {
        renderComment(comment, i, lookup[comment.id]);
    });
}

function renderComment(commentData, index, reactions) {
    const card = document.createElement('div');
    card.classList.add('comment-card');
    card.style.animationDelay = `${index * 0.04}s`;

    const safeName = escapeHTML(commentData.author_name);
    const safeText = escapeHTML(commentData.comment_text);
    const time = getRelativeTime(commentData.created_at);
    const cid = commentData.id;

    card.innerHTML = `
        <div class="comment-card-header">
            <div class="comment-author">
                <i class="fas fa-user-circle" style="color:#8b3a3f; font-size:0.9rem;"></i>
                <span class="author-name">${safeName}</span>
            </div>
            <span class="comment-time"><i class="far fa-clock"></i> ${time}</span>
        </div>
        <div class="comment-body">${safeText}</div>
        <div class="comment-reactions">
            <button class="reaction-btn ${reactions.mine.like ? 'reacted' : ''}" data-type="like" data-comment="${cid}">
                <i class="${reactions.mine.like ? 'fas' : 'far'} fa-thumbs-up"></i>
                <span class="count">${reactions.like > 0 ? reactions.like : ''}</span>
            </button>
            <button class="reaction-btn ${reactions.mine.love ? 'reacted' : ''}" data-type="love" data-comment="${cid}">
                <i class="${reactions.mine.love ? 'fas' : 'far'} fa-heart"></i>
                <span class="count">${reactions.love > 0 ? reactions.love : ''}</span>
            </button>
            <button class="reaction-btn ${reactions.mine.haha ? 'reacted' : ''}" data-type="haha" data-comment="${cid}">
                <i class="${reactions.mine.haha ? 'fas' : 'far'} fa-face-laugh-squint"></i>
                <span class="count">${reactions.haha > 0 ? reactions.haha : ''}</span>
            </button>
        </div>
    `;

    // Wire up reaction buttons
    card.querySelectorAll('.reaction-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const type = btn.dataset.type;
            const icon = btn.querySelector('i');

            await handleReaction(cid, type, btn);

            // Toggle icon fill
            if (btn.classList.contains('reacted')) {
                icon.className = icon.className.replace('far', 'fas');
            } else {
                icon.className = icon.className.replace('fas', 'far');
            }
        });
    });

    commentList.appendChild(card);
}

// ==========================================
// 11. SUBMIT
// ==========================================
submitBtn.addEventListener('click', async () => {
    const nameValue = nameInput.value.trim();
    const commentValue = commentInput.value.trim();

    if (!nameValue || !commentValue) {
        showToast('Please fill out both fields', 'fas fa-exclamation-triangle', '#e2a03f');
        if (!nameValue) nameInput.focus(); else commentInput.focus();
        return;
    }

    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Posting...';
    submitBtn.querySelector('.btn-icon').className = 'btn-icon fas fa-spinner fa-spin';

    const { error } = await supabaseClient
        .from('comments')
        .insert([{ author_name: nameValue, comment_text: commentValue }]);

    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Post Comment';
    submitBtn.querySelector('.btn-icon').className = 'btn-icon fas fa-paper-plane';

    if (error) {
        console.error('Error inserting comment:', error);
        showToast('Failed to post comment', 'fas fa-times-circle', '#e74c3c');
    } else {
        nameInput.value = '';
        commentInput.value = '';
        updateCharCount(nameInput, nameCount, 50);
        updateCharCount(commentInput, commentCount, 500);
        showToast('Comment posted!', 'fas fa-check-circle', '#4caf50');
        fetchComments();
    }
});

// ==========================================
// 12. REFRESH
// ==========================================
refreshBtn.addEventListener('click', () => {
    refreshBtn.style.transition = 'transform 0.4s';
    refreshBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => { refreshBtn.style.transition = 'none'; refreshBtn.style.transform = ''; }, 450);
    fetchComments();
});

// ==========================================
// 13. KEYBOARD SHORTCUT
// ==========================================
commentInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') submitBtn.click();
});

// ==========================================
// 14. REALTIME — auto-update for all visitors
// ==========================================
supabaseClient
    .channel('public-reactions')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'reactions' }, () => {
        fetchComments();
    })
    .subscribe();

supabaseClient
    .channel('public-comments')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments' }, () => {
        fetchComments();
    })
    .subscribe();

// ==========================================
// 15. INIT
// ==========================================
fetchComments();