const { cmd } = require('../command');
cmd({
    pattern: "ping",
    desc: "Check bot latency",
    category: "general",
    react: "⚡",
    filename: __filename
},
async(socket, m, { }) => {
    const start = new Date().getTime();
    const msg = await socket.sendMessage(m.key.remoteJid, { text: '🔄 ᴄᴀʟᴄᴜʟᴀᴛɪɴɢ ʟᴀᴛᴇɴᴄʏ...' });
    const end = new Date().getTime();
    const ping = end - start;

    await socket.sendMessage(m.key.remoteJid, { 
        text: `*⚡ sᴘᴇᴇᴅ :* ${ping}ᴍs\n> *🦾 sᴛᴀᴛᴜs :* nyoni ᴏɴʟɪɴᴇ`,
        edit: msg.key 
    });
});
