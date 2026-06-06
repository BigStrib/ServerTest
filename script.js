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
// 3. FULL BUILT-IN EMOJI DIRECTORY
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
            '💐','🌷','🌹','🥀','🌺','🌸','🌼','🌻','🌞','🌝','🌛','🌜','🌚',
            '🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','🌙','🌎','🌍','🌏','🪐',
            '💫','⭐','🌟','✨','⚡','☄️','💥','🔥','🌪️','🌈','☀️','🌤️','⛅',
            '🌥️','☁️','🌦️','🌧️','⛈️','🌩️','🌨️','❄️','☃️','⛄','🌬️','💨',
            '💧','💦','🫧','☔','☂️','🌊','🌫️'
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
            '🍻','🥂','🥃','🫗','🥤','🧋','🧃','🧉','🧊','🥢','🍽️','🍴','🥄',
            '🔪','🫙','🏺'
        ]
    },
    'travel-places': {
        label: 'Travel & Places',
        emojis: [
            '🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚','🚛',
            '🚜','🦯','🦽','🦼','🛴','🚲','🛵','🏍️','🛺','🚨','🚔','🚍','🚘',
            '🚖','🛞','🚡','🚠','🚟','🚃','🚋','🚞','🚝','🚄','🚅','🚈','🚂',
            '🚆','🚇','🚊','🚉','✈️','🛫','🛬','🛩️','💺','🛰️','🚀','🛸','🚁',
            '🛶','⛵','🚤','🛥️','🛳️','⛴️','🚢','⚓','🛟','🪝','⛽','🚧','🚦',
            '🚥','🚏','🗺️','🗿','🗽','🗼','🏰','🏯','🏟️','🎡','🎢','🎠','⛲',
            '⛱️','🏖️','🏝️','🏜️','🌋','⛰️','🏔️','🗻','🏕️','🛖','🏠','🏡',
            '🏘️','🏚️','🏗️','🏭','🏢','🏬','🏣','🏤','🏥','🏦','🏨','🏪','🏫',
            '🏩','💒','🏛️','⛪','🕌','🕍','🛕','🕋','⛩️','🛤️','🛣️','🗾','🎑',
            '🏞️','🌅','🌄','🌠','🎇','🎆','🌇','🌆','🏙️','🌃','🌌','🌉','🌁'
        ]
    },
    'activities': {
        label: 'Activities',
        emojis: [
            '⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸',
            '🏒','🏑','🥍','🏏','🪃','🥅','⛳','🪁','🛝','🏹','🎣','🤿','🥊',
            '🥋','🎽','🛹','🛼','🛷','⛸️','🥌','🎿','⛷️','🏂','🪂','🏋️','🤼',
            '🤸','⛹️','🤺','🤾','🏌️','🏇','🧘','🏄','🏊','🤽','🚣','🧗','🚴',
            '🚵','🎖️','🏆','🥇','🥈','🥉','🏅','🎗️','🏵️','🎫','🎟️','🎪','🤹',
            '🎭','🩰','🎨','🎬','🎤','🎧','🎼','🎹','🥁','🪘','🎷','🎺','🪗',
            '🎸','🪕','🎻','🪈','🎲','♟️','🎯','🎳','🎮','🕹️','🧩','🪅','🪩',
            '🪆','♠️','♥️','♦️','♣️','🃏','🀄','🎴','🎰'
        ]
    },
    'objects': {
        label: 'Objects',
        emojis: [
            '⌚','📱','📲','💻','⌨️','🖥️','🖨️','🖱️','🖲️','💽','💾','💿','📀',
            '🧮','🎥','🎞️','📽️','🎬','📺','📷','📸','📹','📼','🔍','🔎','🕯️',
            '💡','🔦','🏮','🪔','📔','📕','📖','📗','📘','📙','📚','📓','📒',
            '📃','📜','📄','📰','🗞️','📑','🔖','🏷️','💰','🪙','💴','💵','💶',
            '💷','💸','💳','🧾','💹','✉️','📧','📨','📩','📤','📥','📦','📫',
            '📪','📬','📭','📮','🗳️','✏️','✒️','🖋️','🖊️','🖌️','🖍️','📝','💼',
            '📁','📂','🗂️','📅','📆','🗒️','🗓️','📇','📈','📉','📊','📋','📌',
            '📍','📎','🖇️','📏','📐','✂️','🗃️','🗄️','🗑️','🔒','🔓','🔏','🔐',
            '🔑','🗝️','🔨','🪓','⛏️','⚒️','🛠️','🗡️','⚔️','💣','🪃','🏹','🛡️',
            '🪚','🔧','🪛','🔩','⚙️','🗜️','⚖️','🦯','🔗','⛓️','🪝','🧰','🧲',
            '🪜','⚗️','🧪','🧫','🧬','🔬','🔭','📡','💉','🩸','💊','🩹','🩼',
            '🩺','🩻','🚪','🛗','🪞','🪟','🛏️','🛋️','🪑','🚽','🪠','🚿','🛁',
            '🪤','🪒','🧴','🧷','🧹','🧺','🧻','🪣','🧼','🫧','🪥','🧽','🧯',
            '🛒','🚬','⚰️','🪦','⚱️','🧿','🪬','🗿','🪧','🪪','💎','🎈','🎏',
            '🎀','🎁','🎊','🎉','🎎','🏮','🎐','🧧','✨','🎋','🎍'
        ]
    },
    'symbols': {
        label: 'Symbols',
        emojis: [
            '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','❤️‍🔥','❤️‍🩹','💔',
            '❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️',
            '☸️','🪯','✡️','🔯','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋',
            '♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️','🉑','☢️','☣️',
            '📴','📳','🈶','🈚','🈸','🈺','🈷️','✴️','🆚','💮','🉐','㊙️','㊗️',
            '🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🆑','🅾️','🆘','❌','⭕','🛑',
            '⛔','📛','🚫','💯','💢','♨️','🚷','🚯','🚳','🚱','🔞','📵','🚭',
            '❗','❕','❓','❔','‼️','⁉️','🔅','🔆','〽️','⚠️','🚸','🔱','⚜️',
            '🔰','♻️','✅','🈯','💹','❇️','✳️','❎','🌐','💠','Ⓜ️','🌀','💤',
            '🏧','🚾','♿','🅿️','🛗','🈳','🈂️','🛂','🛃','🛄','🛅','🚹','🚺',
            '🚼','⚧️','🚻','🚮','🎦','🛜','📶','🈁','🔣','ℹ️','🔤','🔡','🔠',
            '🆖','🆗','🆙','🆒','🆕','🆓','0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣',
            '6️⃣','7️⃣','8️⃣','9️⃣','🔟','🔢','#️⃣','*️⃣','⏏️','▶️','⏸️','⏯️',
            '⏹️','⏺️','⏭️','⏮️','⏩','⏪','⏫','⏬','◀️','🔼','🔽','➡️','⬅️',
            '⬆️','⬇️','↗️','↘️','↙️','↖️','↕️','↔️','↪️','↩️','⤴️','⤵️','🔀',
            '🔁','🔂','🔄','🔃','🎵','🎶','➕','➖','➗','✖️','🟰','♾️','💲',
            '💱','™️','©️','®️','〰️','➰','➿','🔚','🔙','🔛','🔝','🔜',
            '✔️','☑️','🔘','🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🟤','🔺',
            '🔻','🔸','🔹','🔶','🔷','🔳','🔲','▪️','▫️','◾','◽','◼️','◻️',
            '🟥','🟧','🟨','🟩','🟦','🟪','⬛','⬜','🟫','🔈','🔇','🔉','🔊',
            '🔔','🔕','📣','📢','👁️‍🗨️','💬','💭','🗯️','♠️','♣️','♥️','♦️',
            '🃏','🎴','🀄','🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'
        ]
    },
    'flags': {
        label: 'Flags',
        emojis: [
            '🏁','🚩','🎌','🏴','🏳️','🏳️‍🌈','🏳️‍⚧️','🏴‍☠️','🇦🇨','🇦🇩',
            '🇦🇪','🇦🇫','🇦🇬','🇦🇮','🇦🇱','🇦🇲','🇦🇴','🇦🇶','🇦🇷','🇦🇸',
            '🇦🇹','🇦🇺','🇦🇼','🇦🇽','🇦🇿','🇧🇦','🇧🇧','🇧🇩','🇧🇪','🇧🇫',
            '🇧🇬','🇧🇭','🇧🇮','🇧🇯','🇧🇱','🇧🇲','🇧🇳','🇧🇴','🇧🇶','🇧🇷',
            '🇧🇸','🇧🇹','🇧🇻','🇧🇼','🇧🇾','🇧🇿','🇨🇦','🇨🇨','🇨🇩','🇨🇫',
            '🇨🇬','🇨🇭','🇨🇮','🇨🇰','🇨🇱','🇨🇲','🇨🇳','🇨🇴','🇨🇵','🇨🇷',
            '🇨🇺','🇨🇻','🇨🇼','🇨🇽','🇨🇾','🇨🇿','🇩🇪','🇩🇬','🇩🇯','🇩🇰',
            '🇩🇲','🇩🇴','🇩🇿','🇪🇦','🇪🇨','🇪🇪','🇪🇬','🇪🇭','🇪🇷','🇪🇸',
            '🇪🇹','🇪🇺','🇫🇮','🇫🇯','🇫🇰','🇫🇲','🇫🇴','🇫🇷','🇬🇦','🇬🇧',
            '🇬🇩','🇬🇪','🇬🇫','🇬🇬','🇬🇭','🇬🇮','🇬🇱','🇬🇲','🇬🇳','🇬🇵',
            '🇬🇶','🇬🇷','🇬🇸','🇬🇹','🇬🇺','🇬🇼','🇬🇾','🇭🇰','🇭🇲','🇭🇳',
            '🇭🇷','🇭🇹','🇭🇺','🇮🇨','🇮🇩','🇮🇪','🇮🇱','🇮🇲','🇮🇳','🇮🇴',
            '🇮🇶','🇮🇷','🇮🇸','🇮🇹','🇯🇪','🇯🇲','🇯🇴','🇯🇵','🇰🇪','🇰🇬',
            '🇰🇭','🇰🇮','🇰🇲','🇰🇳','🇰🇵','🇰🇷','🇰🇼','🇰🇾','🇰🇿','🇱🇦',
            '🇱🇧','🇱🇨','🇱🇮','🇱🇰','🇱🇷','🇱🇸','🇱🇹','🇱🇺','🇱🇻','🇱🇾',
            '🇲🇦','🇲🇨','🇲🇩','🇲🇪','🇲🇫','🇲🇬','🇲🇭','🇲🇰','🇲🇱','🇲🇲',
            '🇲🇳','🇲🇴','🇲🇵','🇲🇶','🇲🇷','🇲🇸','🇲🇹','🇲🇺','🇲🇻','🇲🇼',
            '🇲🇽','🇲🇾','🇲🇿','🇳🇦','🇳🇨','🇳🇪','🇳🇫','🇳🇬','🇳🇮','🇳🇱',
            '🇳🇴','🇳🇵','🇳🇷','🇳🇺','🇳🇿','🇴🇲','🇵🇦','🇵🇪','🇵🇫','🇵🇬',
            '🇵🇭','🇵🇰','🇵🇱','🇵🇲','🇵🇳','🇵🇷','🇵🇸','🇵🇹','🇵🇼','🇵🇾',
            '🇶🇦','🇷🇪','🇷🇴','🇷🇸','🇷🇺','🇷🇼','🇸🇦','🇸🇧','🇸🇨','🇸🇩',
            '🇸🇪','🇸🇬','🇸🇭','🇸🇮','🇸🇯','🇸🇰','🇸🇱','🇸🇲','🇸🇳','🇸🇴',
            '🇸🇷','🇸🇸','🇸🇹','🇸🇻','🇸🇽','🇸🇾','🇸🇿','🇹🇦','🇹🇨','🇹🇩',
            '🇹🇫','🇹🇬','🇹🇭','🇹🇯','🇹🇰','🇹🇱','🇹🇲','🇹🇳','🇹🇴','🇹🇷',
            '🇹🇹','🇹🇻','🇹🇼','🇹🇿','🇺🇦','🇺🇬','🇺🇲','🇺🇳','🇺🇸','🇺🇾',
            '🇺🇿','🇻🇦','🇻🇨','🇻🇪','🇻🇬','🇻🇮','🇻🇳','🇻🇺','🇼🇫','🇼🇸',
            '🇽🇰','🇾🇪','🇾🇹','🇿🇦','🇿🇲','🇿🇼','🏴󠁧󠁢󠁥󠁮󠁧󠁿','🏴󠁧󠁢󠁳󠁣󠁴󠁿','🏴󠁧󠁢󠁷󠁬󠁳󠁿'
        ]
    }
};

// Flatten for search
let allEmojisFlat = [];
Object.entries(emojiDirectory).forEach(([group, data]) => {
    data.emojis.forEach(e => {
        allEmojisFlat.push({ character: e, group: group, label: data.label });
    });
});

// ==========================================
// 4. EMOJI DISPLAY
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

function displayAllEmojis() {
    emojiGrid.innerHTML = '';
    Object.entries(emojiDirectory).forEach(([key, data]) => {
        const label = document.createElement('div');
        label.className = 'emoji-section-label';
        label.textContent = data.label;
        emojiGrid.appendChild(label);

        data.emojis.forEach(char => {
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

function searchEmojis(query) {
    emojiGrid.innerHTML = '';
    const q = query.toLowerCase();

    // Unicode name matching via basic character analysis
    const results = allEmojisFlat.filter(e => {
        return e.label.toLowerCase().includes(q) ||
               e.character.includes(q);
    });

    if (results.length === 0) {
        emojiGrid.innerHTML = '<div class="emoji-loading"><i class="fas fa-search"></i> No emojis found</div>';
        return;
    }

    // Group results by their category
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
// 5. EMOJI MODAL CONTROLS
// ==========================================
function openEmojiModal() {
    emojiModal.classList.add('visible');
    emojiOverlay.classList.add('visible');
    emojiSearch.value = '';
    emojiSearch.focus();
    // Show first category by default
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
    if (e.key === 'Escape' && emojiModal.classList.contains('visible')) {
        closeEmojiModal();
    }
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
            const activeBtn = document.querySelector('.cat-btn.active') || document.querySelector('.cat-btn');
            if (activeBtn) {
                activeBtn.classList.add('active');
                displayEmojiGroup(activeBtn.dataset.group);
            }
        }
    }, 150);
});

// ==========================================
// 6. CHARACTER COUNTERS
// ==========================================
function updateCharCount(input, countEl, max) {
    const len = input.value.length;
    countEl.textContent = `${len}/${max}`;
    countEl.style.color = len >= max * 0.9 ? '#a34a50' : '#3a3c42';
}

nameInput.addEventListener('input', () => updateCharCount(nameInput, nameCount, 50));
commentInput.addEventListener('input', () => updateCharCount(commentInput, commentCount, 500));

// ==========================================
// 7. HELPERS
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
// 8. REACTIONS
// ==========================================
const reactionStore = {};

function getReactions(commentId) {
    if (!reactionStore[commentId]) {
        reactionStore[commentId] = {
            like: { count: 0, reacted: false },
            love: { count: 0, reacted: false },
            haha: { count: 0, reacted: false }
        };
    }
    return reactionStore[commentId];
}

function toggleReaction(commentId, type, btnEl) {
    const reactions = getReactions(commentId);
    const r = reactions[type];

    if (r.reacted) {
        r.count = Math.max(0, r.count - 1);
        r.reacted = false;
        btnEl.classList.remove('reacted');
    } else {
        r.count++;
        r.reacted = true;
        btnEl.classList.add('reacted');
    }

    const countSpan = btnEl.querySelector('.count');
    countSpan.textContent = r.count > 0 ? r.count : '';
}

// ==========================================
// 9. FETCH & DISPLAY COMMENTS
// ==========================================
async function fetchComments() {
    commentList.innerHTML = `
        <div class="loading-state">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading comments...</span>
        </div>
    `;

    const { data, error } = await supabaseClient
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching comments:', error);
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

    commentList.innerHTML = '';
    commentTotal.innerHTML = `<i class="far fa-comment"></i> ${data.length}`;

    if (data.length === 0) {
        commentList.innerHTML = `
            <div class="empty-state">
                <i class="far fa-comments"></i>
                <strong>No comments yet</strong>
                <span>Be the first to share your thoughts!</span>
            </div>
        `;
        return;
    }

    data.forEach((comment, i) => renderComment(comment, i));
}

function renderComment(commentData, index = 0) {
    const card = document.createElement('div');
    card.classList.add('comment-card');
    card.style.animationDelay = `${index * 0.04}s`;

    const safeName = escapeHTML(commentData.author_name);
    const safeText = escapeHTML(commentData.comment_text);
    const time = getRelativeTime(commentData.created_at);
    const cid = commentData.id;
    const reactions = getReactions(cid);

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
            <button class="reaction-btn ${reactions.like.reacted ? 'reacted' : ''}" data-type="like">
                <i class="far fa-thumbs-up"></i>
                <span class="count">${reactions.like.count || ''}</span>
            </button>
            <button class="reaction-btn ${reactions.love.reacted ? 'reacted' : ''}" data-type="love">
                <i class="far fa-heart"></i>
                <span class="count">${reactions.love.count || ''}</span>
            </button>
            <button class="reaction-btn ${reactions.haha.reacted ? 'reacted' : ''}" data-type="haha">
                <i class="far fa-face-laugh-squint"></i>
                <span class="count">${reactions.haha.count || ''}</span>
            </button>
        </div>
    `;

    card.querySelectorAll('.reaction-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleReaction(cid, btn.dataset.type, btn);
        });
    });

    commentList.appendChild(card);
}

// ==========================================
// 10. SUBMIT
// ==========================================
submitBtn.addEventListener('click', async () => {
    const nameValue = nameInput.value.trim();
    const commentValue = commentInput.value.trim();

    if (!nameValue || !commentValue) {
        showToast('Please fill out both fields', 'fas fa-exclamation-triangle', '#e2a03f');
        if (!nameValue) nameInput.focus();
        else commentInput.focus();
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
        showToast('Comment posted successfully!', 'fas fa-check-circle', '#4caf50');
        fetchComments();
    }
});

// ==========================================
// 11. REFRESH
// ==========================================
refreshBtn.addEventListener('click', () => {
    refreshBtn.style.transition = 'transform 0.4s';
    refreshBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        refreshBtn.style.transition = 'none';
        refreshBtn.style.transform = '';
    }, 450);
    fetchComments();
});

// ==========================================
// 12. KEYBOARD SHORTCUT
// ==========================================
commentInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        submitBtn.click();
    }
});

// ==========================================
// 13. INIT
// ==========================================
fetchComments();