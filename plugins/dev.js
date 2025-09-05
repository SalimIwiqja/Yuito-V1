const { lite, commands } = require('../lite');
const config = require('../settings'); // Make sure MENU_IMAGE_URL is defined in settings.js

// Fake ChatGPT vCard (for quoting)
const fakevCard = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "© Nexus",
            vcard: `BEGIN:VCARD
VERSION:3.0
FN:Meta
ORG:META AI;
TEL;type=CELL;type=VOICE;waid=🪤:🪤
END:VCARD`
        }
    }
};

// Real owner vCard
const ownerVCard = `BEGIN:VCARD
VERSION:3.0
FN:Nexus
ORG:Yuito;
TEL;type=CELL;type=VOICE;waid=😛:😃
END:VCARD`;

lite({
    pattern: "owner",
    alias: ["developer", "dev"],
    desc: "Displays the developer info",
    category: "owner",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, {
    from, reply, pushname
}) => {
    try {
        const name = pushname || "Hunter";

        const text = `
┏━〔 ⚔️ *© Nexus* : *developers* ⚔️ 〕━┓
┃
┃ ✨ 🌸 *Konnichiwaaa* (๑>ᴗ<๑), ${name}*...
┃
┃    I'm *Yuito* ✨ 🍀 My prefix is *"!"* ~
┃
┃ 🧩 *DEVELOPER DETAILS*
┃ ──────────────────────
┃ 🩸 *Name*    : Salim
┃ ⏳ *Age*     : 20
┃ 📞 *Contact* : wa.me/+212605158422
┃ 🎥 *YouTube* :
┃    Not yet 😛
┃
┃ ⚡ Powered by *© Nexus*.
┃
┗━━━━━━━━━━━━━━━━━━━━━━━┛`.trim();

        // Send styled developer info message with image
        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/qjtp8v.jpg' },
            caption: text,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: '『 Yuito 』',
                    serverMessageId: 143
                }
            }
        }, { quoted: fakevCard });

        // Send the real owner contact card
        await conn.sendMessage(from, {
            contacts: {
                displayName: "Nexus",
                contacts: [{ vcard: ownerVCard }]
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in .dev command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
