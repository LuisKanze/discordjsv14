const { SlashCommandBuilder, select } = require("discord.js");
const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("🏓 • Rufe den Ping ab"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    });
    const replymessage = `🏓 Pong \`${client.ws.ping}\``;
    await interaction.editReply({
      content: replymessage,
      ephemeral: true,
    });
  },
};
