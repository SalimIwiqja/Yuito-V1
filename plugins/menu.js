const fs = require('fs');
const config = require('../settings');
const { lite, commands } = require('../lite');
const axios = require('axios');
const { getPrefix } = require('../lib/prefix');
const { runtime } = require('../lib/functions');
const moment = require('moment-timezone');

// Register the "menu" command
lite({
    name: "menu",
    category: "main",
    alias: ["allmenu"],
    desc: "Nexus Menu",
    filename: __filename
}, async (client, m, args, { from, quoted, pushname, reply }) => {
    try {
        // Get prefix
        let prefix = await getPrefix(from);

        // Date & Time
        let time = moment.tz('Africa/Casablanca').format('HH:mm:ss');
        let date = moment.tz('Africa/Casablanca').format('DD/MM/YYYY');

        // Uptime
        let up = runtime(process.uptime());

        // Prepare categories
        let categories = {
            main: "",
            group: "",
            download: "",
            ai: "",
            anime: "",
            economy: "",
            react: "",
            fun: "",
            logo: "",
            settings: "",
            convert: "",
            other: ""
        };

        // Collect commands per category
        for (let cmd of commands) {
            if (cmd.name && !cmd.dontAddCommandList && categories.hasOwnProperty(cmd.category)) {
                categories[cmd.category] += `${prefix}${cmd.name}, `;
            }
        }

        // Remove last comma/space
        for (let cat in categories) {
            if (categories[cat].endsWith(", ")) {
                categories[cat] = categories[cat].slice(0, -2);
            }
        }

        // Count total commands
        let totalCommands = commands.length;

        // Build styled menu text
        let menuText = `
⛩️❯─「 *Nexus Inc* 」─❮⛩️

🌸 *Konnichiwaaa* (๑>ᴗ<๑) @${m.sender.split('@')[0]}
I'm *${config.BOT_NAME}* ✨
🍀 My prefix is *"${prefix}"* ~

*📭 Command List 📭*

❯──── Main ────❮
➠ \`\`\`${categories.main}\`\`\`

❯──── Group ────❮
➠ \`\`\`${categories.group}\`\`\`

❯──── Download ────❮
➠ \`\`\`${categories.download}\`\`\`

❯──── AI ────❮
➠ \`\`\`${categories.ai}\`\`\`

❯──── Anime ────❮
➠ \`\`\`${categories.anime}\`\`\`

❯──── Economy ────❮
➠ \`\`\`${categories.economy}\`\`\`

❯──── React ────❮
➠ \`\`\`${categories.react}\`\`\`

❯──── Fun ────❮
➠ \`\`\`${categories.fun}\`\`\`

❯──── Logo ────❮
➠ \`\`\`${categories.logo}\`\`\`

❯──── Settings ────❮
➠ \`\`\`${categories.settings}\`\`\`

❯──── Convert ────❮
➠ \`\`\`${categories.convert}\`\`\`

❯──── Other ────❮
➠ \`\`\`${categories.other}\`\`\`

📝 *Hint:* Use *${prefix}help <command_name>* for detailed info!  
🌟 *Arigato for Choosing Nexus!* 🌟
`;

        // Send menu with image
        await client.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || "https://files.catbox.moe/qjtp8v.jpg" },
            caption: menuText,
            mentions: [m.sender]
        }, { quoted });

    } catch (err) {
        console.error(err);
        reply("⚠️ Error while generating menu.");
    }
});
