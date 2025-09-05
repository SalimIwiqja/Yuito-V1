const { lite } = require('../lite');
const os = require('os');
const { runtime } = require('../lib/functions');
const config = require('../settings');

lite({
    pattern: "alive",
    alias: ["status", "online", "alive"],
    desc: "Check if bot is alive and running",
    category: "main",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
        const uptime = runtime(process.uptime());

        const caption = `
┏━━━━━ ⚔️ 〔 *NEXUS SYSTEM IS ONLINE* 〕 ⚔️ ━━━━━┓
┃
┃ ❤️ *Monarch:* ${config.OWNER_NAME}
┃ 📜 *Version:* ${config.version}
┃ 🌓 *Prefix:* [ ${config.PREFIX} ]
┃ 🌌 *Mode:* [ ${config.MODE} ]
┃ 🔮 *Mana (RAM):* ${heapUsed}MB / ${totalMem}MB
┃ 🏯 *Domain Core:* ${os.hostname()}
┃ ⏳ *Shadow Uptime:* ${uptime}
┃
┗━━━━━━━━━━━「 ⚔️ ${config.BOT_NAME} ⚔️ 」━━━━━━━━━━━┛
⚔️ ${config.DESCRIPTION}
        `.trim();

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398430045533@newsletter',
                    newsletterName: 'Nexus',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});
