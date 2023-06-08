const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('🚮 • Cleare den Chat')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addIntegerOption(option => option.setName("anzahl").setDescription("🚮 • Anzahl der Nachrichten").setRequired(true))
        .addUserOption((option) => option.setName('user').setDescription('🚮 • User von wenn die Nachrichtren gelöscht werden soll').setRequired(false)),

async execute(interaction, client) {

    const {channel, options} = interaction;

    const anzahl = options.getInteger('anzahl');
    const user = options.getUser("user")

    const messages = await channel.messages.fetch({
        limit: anzahl + 1,
})

const res = new EmbedBuilder()
.setColor(0x5fb041)


if(user) {
    let i = 0;

    const filtered = [];

    (await messages).filter((msg) => {
        if(msg.author.id === user.id && anzahl > i) {
            filtered.push(msg)
            i++;
        }
    });
    await channel.bulkDelete(filtered).then(messages => {
        res.setDescription(`\`\`\`${messages.size} Nachrichten\`\`\`\n \ngelöscht von **${user}**`)
        interaction.reply({embeds: [res]})
    })
} else {
    await channel.bulkDelete(anzahl, true).then(messages => {
        res.setDescription(`\`\`\`${messages.size} Nachrichten\`\`\`\n \ngelöscht vom **Channel**`)
        interaction.reply({embeds: [res]})
        })
    }
    }
}
