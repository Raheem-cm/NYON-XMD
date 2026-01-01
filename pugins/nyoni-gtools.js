const { cmd } = require('../command')
const { getBuffer, getGroupAdmins } = require('../lib/functions')
const fs = require('fs')

// Common context info for group commands
const getContextInfo = (senderJid, type = "cmd") => {
    return {
        mentionedJid: [senderJid],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363399470975987@newsletter',
            newsletterName: '© 𝐍𝐘𝐎𝐍𝐈 𝐌𝐀𝐑𝐊𝐄𝐓',
            serverMessageId: 428,
        },
        stanzaId: `NYON_${type}_${Date.now()}`,
        participant: '0@s.whatsapp.net',
        quotedMessage: {
            conversation: "© 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐍𝐘𝐎𝐍𝐈 𝐌𝐀𝐑𝐊𝐄𝐓"
        }
    };
};

// ========== GROUP ADMIN COMMANDS ==========

// Mute Group
cmd({
    pattern: "mute",
    alias: ["silence"],
    desc: "Mute group for specific time",
    category: "group",
    react: "🔇",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, sender }) => {
    try {
        if (!isGroup) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐨𝐧𝐥𝐲 𝐰𝐨𝐫𝐤𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        if (!isAdmins && !isBotAdmins) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐘𝐨𝐮 𝐧𝐞𝐞𝐝 𝐚𝐝𝐦𝐢𝐧 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        
        await conn.groupSettingUpdate(from, 'announcement')
        await conn.sendMessage(from, {
            text: `┏━━━━━━━━━━━━━━━━━━┓\n┃  ✅ 𝐆𝐫𝐨𝐮𝐩 𝐌𝐮𝐭𝐞𝐝  \n┃  ━━━━━━━━━━━━━━━  \n┃  • 𝐒𝐞𝐭 𝐭𝐨 𝐚𝐧𝐧𝐨𝐮𝐧𝐜𝐞𝐦𝐞𝐧𝐭 𝐦𝐨𝐝𝐞\n┃  • 𝐎𝐧𝐥𝐲 𝐚𝐝𝐦𝐢𝐧𝐬 𝐜𝐚𝐧 𝐬𝐞𝐧𝐝\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`,
            contextInfo: getContextInfo(sender)
        })
    } catch (e) {
        m.reply(`┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  ${e.message}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`)
    }
})

// Unmute Group
cmd({
    pattern: "unmute",
    alias: ["unsilence"],
    desc: "Unmute group",
    category: "group",
    react: "🔊",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, sender }) => {
    try {
        if (!isGroup) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐨𝐧𝐥𝐲 𝐰𝐨𝐫𝐤𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        if (!isAdmins && !isBotAdmins) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐘𝐨𝐮 𝐧𝐞𝐞𝐝 𝐚𝐝𝐦𝐢𝐧 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        
        await conn.groupSettingUpdate(from, 'not_announcement')
        await conn.sendMessage(from, {
            text: `┏━━━━━━━━━━━━━━━━━━┓\n┃  ✅ 𝐆𝐫𝐨𝐮𝐩 𝐔𝐧𝐦𝐮𝐭𝐞𝐝  \n┃  ━━━━━━━━━━━━━━━  \n┃  • 𝐄𝐯𝐞𝐫𝐲𝐨𝐧𝐞 𝐜𝐚𝐧 𝐬𝐞𝐧𝐝 𝐧𝐨𝐰\n┃  • 𝐂𝐡𝐚𝐭 𝐢𝐬 𝐨𝐩𝐞𝐧 𝐟𝐨𝐫 𝐚𝐥𝐥\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`,
            contextInfo: getContextInfo(sender)
        })
    } catch (e) {
        m.reply(`┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  ${e.message}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`)
    }
})

// Delete Message
cmd({
    pattern: "delete",
    alias: ["clear", "purge"],
    desc: "Delete messages in group",
    category: "group",
    react: "🗑️",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, sender, quoted }) => {
    try {
        if (!isGroup) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐨𝐧𝐥𝐲 𝐰𝐨𝐫𝐤𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        if (!isAdmins && !isBotAdmins) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐘𝐨𝐮 𝐧𝐞𝐞𝐝 𝐚𝐝𝐦𝐢𝐧 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        
        if (quoted) {
            await conn.sendMessage(from, { delete: quoted.key })
            await conn.sendMessage(from, {
                text: `┏━━━━━━━━━━━━━━━━━━┓\n┃  ✅ 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐃𝐞𝐥𝐞𝐭𝐞𝐝  \n┃  ━━━━━━━━━━━━━━━  \n┃  • 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐜𝐥𝐞𝐚𝐫𝐞𝐝 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲\n┃  • 𝐁𝐲: @${sender.split('@')[0]}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`,
                mentions: [sender],
                contextInfo: getContextInfo(sender)
            })
        } else {
            await conn.sendMessage(from, {
                text: `┏━━━━━━━━━━━━━━━━━━┓\n┃  ⚠️ 𝐔𝐬𝐚𝐠𝐞  \n┃  ━━━━━━━━━━━━━━━  \n┃  • 𝐑𝐞𝐩𝐥𝐲 𝐭𝐨 𝐚 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐰𝐢𝐭𝐡:\n┃  • .delete (𝐭𝐨 𝐝𝐞𝐥𝐞𝐭𝐞 𝐢𝐭)\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`,
                contextInfo: getContextInfo(sender)
            })
        }
    } catch (e) {
        m.reply(`┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  ${e.message}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`)
    }
})

// Kick Member
cmd({
    pattern: "kick",
    alias: ["remove"],
    desc: "Kick member from group",
    category: "group",
    react: "👢",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, sender, text, mentionedJid }) => {
    try {
        if (!isGroup) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐨𝐧𝐥𝐲 𝐰𝐨𝐫𝐤𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        if (!isAdmins && !isBotAdmins) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐘𝐨𝐮 𝐧𝐞𝐞𝐝 𝐚𝐝𝐦𝐢𝐧 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        
        const participants = mentionedJid.length ? mentionedJid : [sender]
        
        for (let user of participants) {
            await conn.groupParticipantsUpdate(from, [user], "remove")
        }
        
        await conn.sendMessage(from, {
            text: `┏━━━━━━━━━━━━━━━━━━┓\n┃  ✅ 𝐌𝐞𝐦𝐛𝐞𝐫 𝐊𝐢𝐜𝐤𝐞𝐝  \n┃  ━━━━━━━━━━━━━━━  \n┃  • 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐫𝐞𝐦𝐨𝐯𝐞𝐝\n┃  • 𝐂𝐨𝐮𝐧𝐭: ${participants.length}\n┃  • 𝐁𝐲: @${sender.split('@')[0]}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`,
            mentions: [sender],
            contextInfo: getContextInfo(sender)
        })
    } catch (e) {
        m.reply(`┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  ${e.message}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`)
    }
})

// Tag Member
cmd({
    pattern: "tag",
    desc: "Tag specific member",
    category: "group",
    react: "🏷️",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, sender, text, mentionedJid }) => {
    try {
        if (!isGroup) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐨𝐧𝐥𝐲 𝐰𝐨𝐫𝐤𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        
        const users = mentionedJid.length ? mentionedJid : [sender]
        const names = users.map(u => `@${u.split('@')[0]}`).join(' ')
        
        await conn.sendMessage(from, {
            text: `┏━━━━━━━━━━━━━━━━━━┓\n┃  🏷️ 𝐌𝐞𝐧𝐭𝐢𝐨𝐧  \n┃  ━━━━━━━━━━━━━━━  \n┃  • ${text || "𝐓𝐚𝐠𝐠𝐞𝐝"}\n┃  • ${names}\n┃  • 𝐁𝐲: @${sender.split('@')[0]}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`,
            mentions: [...users, sender],
            contextInfo: getContextInfo(sender)
        })
    } catch (e) {
        m.reply(`┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  ${e.message}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`)
    }
})

// Tag All Members
cmd({
    pattern: "tagall",
    alias: ["everyone"],
    desc: "Tag all group members",
    category: "group",
    react: "📢",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, sender, groupMetadata }) => {
    try {
        if (!isGroup) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐨𝐧𝐥𝐲 𝐰𝐨𝐫𝐤𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        if (!isAdmins && !isBotAdmins) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐘𝐨𝐮 𝐧𝐞𝐞𝐝 𝐚𝐝𝐦𝐢𝐧 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        
        const metadata = await conn.groupMetadata(from)
        const participants = metadata.participants.map(p => p.id)
        const mentions = participants.map(p => `@${p.split('@')[0]}`).join(' ')
        
        await conn.sendMessage(from, {
            text: `┏━━━━━━━━━━━━━━━━━━┓\n┃  📢 𝐓𝐀𝐆 𝐀𝐋𝐋  \n┃  ━━━━━━━━━━━━━━━  \n┃  • 𝐓𝐨𝐭𝐚𝐥 𝐦𝐞𝐦𝐛𝐞𝐫𝐬: ${participants.length}\n┃  • ${mentions}\n┃  • 𝐁𝐲: @${sender.split('@')[0]}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`,
            mentions: participants,
            contextInfo: getContextInfo(sender)
        })
    } catch (e) {
        m.reply(`┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  ${e.message}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`)
    }
})

// Hide Tag
cmd({
    pattern: "hidetag",
    alias: ["hmention"],
    desc: "Tag all without notification",
    category: "group",
    react: "🙈",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, sender, groupMetadata, text }) => {
    try {
        if (!isGroup) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐨𝐧𝐥𝐲 𝐰𝐨𝐫𝐤𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        if (!isAdmins && !isBotAdmins) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐘𝐨𝐮 𝐧𝐞𝐞𝐝 𝐚𝐝𝐦𝐢𝐧 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        
        const metadata = await conn.groupMetadata(from)
        const participants = metadata.participants.map(p => p.id)
        
        await conn.sendMessage(from, {
            text: `┏━━━━━━━━━━━━━━━━━━┓\n┃  🙈 𝐇𝐈𝐃𝐄 𝐓𝐀𝐆  \n┃  ━━━━━━━━━━━━━━━  \n┃  • ${text || "𝐒𝐢𝐥𝐞𝐧𝐭 𝐦𝐞𝐧𝐭𝐢𝐨𝐧"}\n┃  • 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${participants.length}\n┃  • 𝐒𝐞𝐧𝐭 𝐛𝐲 𝐚𝐝𝐦𝐢𝐧\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`,
            mentions: participants,
            contextInfo: getContextInfo(sender)
        })
    } catch (e) {
        m.reply(`┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  ${e.message}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`)
    }
})

// Kick All Members
cmd({
    pattern: "kickall",
    alias: ["removeall"],
    desc: "Remove all non-admin members",
    category: "group",
    react: "🚫",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, sender }) => {
    try {
        if (!isGroup) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐨𝐧𝐥𝐲 𝐰𝐨𝐫𝐤𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        if (!isAdmins && !isBotAdmins) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐘𝐨𝐮 𝐧𝐞𝐞𝐝 𝐚𝐝𝐦𝐢𝐧 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        
        const metadata = await conn.groupMetadata(from)
        const admins = metadata.participants.filter(p => p.admin).map(p => p.id)
        const nonAdmins = metadata.participants.filter(p => !p.admin).map(p => p.id)
        
        if (nonAdmins.length === 0) {
            return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ⚠️ 𝐍𝐨 𝐦𝐞𝐦𝐛𝐞𝐫𝐬 𝐭𝐨 𝐤𝐢𝐜𝐤  \n┃  ━━━━━━━━━━━━━━━  \n┃  • 𝐀𝐥𝐥 𝐮𝐬𝐞𝐫𝐬 𝐚𝐫𝐞 𝐚𝐝𝐦𝐢𝐧𝐬\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        }
        
        // Remove non-admins in batches
        for (let user of nonAdmins) {
            await conn.groupParticipantsUpdate(from, [user], "remove")
        }
        
        await conn.sendMessage(from, {
            text: `┏━━━━━━━━━━━━━━━━━━┓\n┃  ✅ 𝐊𝐢𝐜𝐤𝐞𝐝 𝐀𝐥𝐥  \n┃  ━━━━━━━━━━━━━━━  \n┃  • 𝐑𝐞𝐦𝐨𝐯𝐞𝐝: ${nonAdmins.length}\n┃  • 𝐀𝐝𝐦𝐢𝐧𝐬 𝐤𝐞𝐩𝐭: ${admins.length}\n┃  • 𝐁𝐲: @${sender.split('@')[0]}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`,
            mentions: [sender],
            contextInfo: getContextInfo(sender)
        })
    } catch (e) {
        m.reply(`┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  ${e.message}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`)
    }
})

// Get Group Profile Picture
cmd({
    pattern: "getpic",
    alias: ["gpp", "groupdp"],
    desc: "Get group profile picture",
    category: "group",
    react: "📸",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, sender }) => {
    try {
        if (!isGroup) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐨𝐧𝐥𝐲 𝐰𝐨𝐫𝐤𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        
        const metadata = await conn.groupMetadata(from)
        let ppUrl
        try {
            ppUrl = await conn.profilePictureUrl(from, 'image')
        } catch {
            ppUrl = 'https://files.catbox.moe/ph4c1n.jpg'
        }
        
        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: `┏━━━━━━━━━━━━━━━━━━┓\n┃  📸 𝐆𝐫𝐨𝐮𝐩 𝐏𝐫𝐨𝐟𝐢𝐥𝐞  \n┃  ━━━━━━━━━━━━━━━  \n┃  • 𝐍𝐚𝐦𝐞: ${metadata.subject}\n┃  • 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${metadata.participants.length}\n┃  • 𝐁𝐲: @${sender.split('@')[0]}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`,
            mentions: [sender],
            contextInfo: getContextInfo(sender)
        })
    } catch (e) {
        m.reply(`┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  ${e.message}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`)
    }
})

// Get Group Invite Link
cmd({
    pattern: "link",
    alias: ["invitelink"],
    desc: "Get group invite link",
    category: "group",
    react: "🔗",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, sender }) => {
    try {
        if (!isGroup) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐨𝐧𝐥𝐲 𝐰𝐨𝐫𝐤𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        if (!isAdmins && !isBotAdmins) return m.reply("┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  𝐘𝐨𝐮 𝐧𝐞𝐞𝐝 𝐚𝐝𝐦𝐢𝐧 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛")
        
        const link = await conn.groupInviteCode(from)
        
        await conn.sendMessage(from, {
            text: `┏━━━━━━━━━━━━━━━━━━┓\n┃  🔗 𝐆𝐫𝐨𝐮𝐩 𝐋𝐢𝐧𝐤  \n┃  ━━━━━━━━━━━━━━━  \n┃  • https://chat.whatsapp.com/${link}\n┃  • 𝐂𝐨𝐩𝐲 𝐚𝐛𝐨𝐯𝐞 𝐥𝐢𝐧𝐤\n┃  • 𝐁𝐲: @${sender.split('@')[0]}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`,
            mentions: [sender],
            contextInfo: getContextInfo(sender)
        })
    } catch (e) {
        m.reply(`┏━━━━━━━━━━━━━━━━━━┓\n┃  ❌ 𝐄𝐫𝐫𝐨𝐫  \n┃  ━━━━━━━━━━━━━━━  \n┃  ${e.message}\n┃  ━━━━━━━━━━━━━━━  \n┃  💫 𝐍𝐘𝐎𝐍-𝐗𝐌𝐃\n┗━━━━━━━━━━━━━━━━━━┛`)
    }
})

// Join Group
cmd({
    pattern: "join",
    alias: ["
