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
            displayName: "© suho ai",
            vcard: `BEGIN:VCARD
VERSION:3.0
FN:Meta
ORG:META AI;
TEL;type=CELL;type=VOICE;waid=13135550002:+13135550002
END:VCARD`
        }
    }
};

// Real owner vCard
const ownerVCard = `BEGIN:VCARD
VERSION:3.0
FN:Mr Sung
ORG:Suho-MD;
TEL;type=CELL;type=VOICE;waid=27649342626:+27 64 934 2626
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
┏━〔 ⚔️ 𝗦𝗨𝗛𝗢-𝗠𝗗: 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥 ⚔️ 〕━┓
┃
┃ ✨ *Greetings, ${name}*...
┃
┃ 🕶️ In the shadows I remain —
┃    The *Architect* of this realm.
┃
┃ 🧩 *DEVELOPER DETAILS*
┃ ──────────────────────
┃ 🩸 *Name*    : Mr Sung
┃ ⏳ *Age*     : +20
┃ 📞 *Contact* : wa.me/1(236)362-1958
┃ 🎥 *YouTube* :
┃    https://youtube.com/@malvintech2
┃
┃ ⚡ Forged in Darkness, Powered by
┃    the Will of *Mr Sung*.
┃
┗━━━━━━━━━━━━━━━━━━━━━━━┛`.trim();

        // Send styled developer info message with image
        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || 'https://telegra.ph/file/3b66b4f8bd5c0556d4fb9.jpg' },
            caption: text,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: '『 sᴜʜᴏ ᴍᴅ 』',
                    serverMessageId: 143
                }
            }
        }, { quoted: fakevCard });

        // Send the real owner contact card
        await conn.sendMessage(from, {
            contacts: {
                displayName: "Mr Sung",
                contacts: [{ vcard: ownerVCard }]
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in .dev command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
