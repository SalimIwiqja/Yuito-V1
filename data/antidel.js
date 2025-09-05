const { lite } = require('../lite');
const { getAnti, setAnti } = require('../plugins/anti-delete'); // import database logic

// Command definition
lite({
    pattern: "antidelete",
    alias: ['antidel', 'del'],
    desc: "Toggle anti-delete feature",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, reply, text, isCreator }) => {
    // Only the bot owner can use this command
    if (!isCreator) return reply('❌ This command is only for the bot owner.');

    try {
        // Get the current anti-delete status
        const currentStatus = await getAnti();

        // Show status if no argument or "status"
        if (!text || text.toLowerCase() === 'status') {
            return reply(
                `*AntiDelete Status:* ${currentStatus ? '✅ ON' : '❌ OFF'}\n\nUsage:\n` +
                `• !antidelete on - Enable\n` +
                `• !antidelete off - Disable`
            );
        }

        // Handle user input
        const action = text.toLowerCase().trim();

        if (action === 'on') {
            await setAnti(true);
            return reply('✅ Anti-delete has been enabled.');
        } else if (action === 'off') {
            await setAnti(false);
            return reply('❌ Anti-delete has been disabled.');
        } else {
            return reply(
                '❌ Invalid command.\nUsage:\n' +
                '• !antidelete on\n' +
                '• !antidelete off\n' +
                '• !antidelete status'
            );
        }

    } catch (error) {
        console.error("Error in antidelete command:", error);
        return reply("❌ An error occurred while processing your request.");
    }
});
