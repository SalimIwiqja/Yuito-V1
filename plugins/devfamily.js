// Devfamily.js
// Created by Sung

const { lite } = require('../lite');
const config = require('../settings');

lite({
    pattern: "devfamily",
    alias: ["family", "friends", "fam"],
    desc: "Shows the developer's family & friends list",
    category: "owner",
    react: "👨‍👩‍👦",
    filename: __filename
}, async (conn, mek, m, { from }) => {

    let familyList = `
╭───「 👨‍👩‍👦 *Dev Family & Friends* 👨‍👩‍👦 」
│
│ 💙 *Owner:* ${config.OWNER_NAME}
│ 📱 *Owner Number:* ${config.OWNER_NUMBER}
│
│ 👑 *Close Fam & Friends:*
│    • 🕶️ dev Imad (dev)
│
╰───────────────────────────╯
`;

    const buttons = [
        { buttonId: "v_owner", buttonText: { displayText: "👑 Owner" }, type: 1 },
        { buttonId: "v_friend", buttonText: { displayText: "🤝 Imad" }, type: 1 },
        { buttonId: "back_menu", buttonText: { displayText: "🏠 Back to Main" }, type: 1 }
    ];

    const buttonMessage = {
        text: familyList,
        footer: "💠 Powered by Nexus",
        buttons: buttons,
        headerType: 4
    };

    await conn.sendMessage(from, buttonMessage, { quoted: mek });
});

// ────────────────────────────────
// Family vCards
// ────────────────────────────────
const familyVCards = {
    v_owner: {
        name: config.OWNER_NAME,
        number: config.OWNER_NUMBER
    },
    v_friend: {
        name: "dev imad",
        number: "212667876859"
    }
};

for (const key in familyVCards) {
    lite({
        pattern: key,
        dontAddCommandList: true,
        filename: __filename
    }, async (conn, mek, m, { from }) => {
        const member = familyVCards[key];
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${member.name}
TEL;type=CELL;type=VOICE;waid=${member.number}:${member.number}
END:VCARD`;

        await conn.sendMessage(from, {
            contacts: {
                displayName: member.name,
                contacts: [{ vcard }]
            }
        }, { quoted: mek });
    });
}

// ────────────────────────────────
// Back to Main Menu
// ────────────────────────────────
lite({
    pattern: "back_menu",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from }) => {
    await conn.sendMessage(from, { text: "🏠 Returning to Main Menu..." }, { quoted: mek });
    // Auto-call your menu command
    require("./menu")(conn, mek, m, { from });
});
