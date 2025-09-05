// mod.js
// Created by dev sung 🤴

const { lite } = require('../lite');
const config = require('../settings');

lite({
    pattern: "mod",
    alias: ["mods", "moderators"],
    desc: "Shows the list of bot moderators",
    category: "owner",
    react: "🛡️",
    filename: __filename
}, async (conn, mek, m, { from }) => {

    let modList = `
╭───「 🛡️ *Bot Moderators* 🛡️ 」
│
│ 👑 *Owner:* ${config.OWNER_NAME}
│ 📱 *Owner Number:* ${config.OWNER_NUMBER}
│
│ 🔹 *Moderators List:*
│    • Salim (Creator)
│   contact: wa.me/+212605158422
│    • Imad (Main Mod)
│   contact: wa.me/+212667876859
│
╰───────────────────────────╯
`;

    const buttons = [
        { buttonId: "v_malvin", buttonText: { displayText: "Salim" }, type: 1 },
        { buttonId: "v_sung", buttonText: { displayText: "Imad" }, type: 1 },
        { buttonId: "back_menu", buttonText: { displayText: "🏠 Back to Main" }, type: 1 }
    ];

    const buttonMessage = {
        text: modList,
        footer: "💠 Powered by Nexus !",
        buttons: buttons,
        headerType: 4
    };

    await conn.sendMessage(from, buttonMessage, { quoted: mek });
});

// ────────────────────────────────
// Moderator vCards
// ────────────────────────────────
const modsVCards = {
    v_malvin: { name: "Salim", number: "212605158422" },
    v_sung: { name: "Imad", number: "212667876859" }
};

for (const key in modsVCards) {
    lite({
        pattern: key,
        dontAddCommandList: true,
        filename: __filename
    }, async (conn, mek, m, { from }) => {
        const mod = modsVCards[key];
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${mod.name}
TEL;type=CELL;type=VOICE;waid=${mod.number}:${mod.number}
END:VCARD`;

        await conn.sendMessage(from, {
            contacts: {
                displayName: mod.name,
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
