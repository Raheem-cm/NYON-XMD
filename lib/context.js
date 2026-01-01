// Fichier : lib/context.js

/**
 * Génère le contexte Newsletter (Channel) pour les messages
 * SANS externalAdReply (juste le tag "Transféré")
 * @param {Object} config - La configuration globale
 */
function getNewsletterContext(config) {
    return {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
            newsletterJid: config.NEWSLETTER_JID || "120363399470975987@newsletter",
            newsletterName: config.BOT_NAME || "RAHEEM-XMD-BOTS",
            serverMessageId: 100
        }
    };
}

module.exports = { getNewsletterContext };
