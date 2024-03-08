//Funktioniert mit MongoDB
const { EmbedBuilder } = require("@discordjs/builders");
const {
  SlashCommandBuilder,
  Colors,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { connection } = require("mongoose");
const moment = require("moment");
function rState(val) {
  var status = " ";
  switch (val) {
    case 0:
      status = `\`🔴\` Nicht Verbunden`;
      break;
    case 1:
      status = `\`🟢\` Verbunden`;
      break;
    case 2:
      status = `\`🟡\` Verbinde`;
      break;
    case 3:
      status = `\`🟣\` Trenne Verbindung`;
      break;
  }
  return status;
}
module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot-info")
    .setDescription("🤖 • Rufe die Bot Info ab"),
  async execute(interaction, client) {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    let webLatency = new Date() - interaction.createdAt;
    let apiLatency = client.ws.ping;

    let emLatency = {
      Green: "🟢",
      Yellow: "🟡",
      Red: "🔴",
    };
    const devcontact = new ButtonBuilder()
      .setLabel(`Developer`)
      .setStyle(ButtonStyle.Link)
      .setURL("https://discordapp.com/users/531896089096486922");
    const embed = new EmbedBuilder()
      .setTitle(`<:kern:1109030899422609408> • System Bot`)
      .setColor(Colors.Orange)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: `Made with ♥️ by Vxnsin` })
      .addFields([
        {
          name: `<:person:1077910061910851615> • Zuständig`,
          value: `> Ich bin der **Kern** des Server, Ich **unterstützte** viele Commands und **Systeme**.\n> **Ohne mich Läuft hier garnichts**`,
          inline: false,
        },
        {
          name: `\`🤖\` • Hauptinfos`,
          value: [
            `\`❕\` • Status:  Custom`,
            `\`🏓\` • Ping:  ${client.ws.ping}ms`,
            `\`⏱️\` • Online: \n\`\`\`\n${days}Tage, ${hours}Stunden, ${minutes}Minuten, ${seconds}Sekunden\n\`\`\``,
          ].join("\n"),
          inline: true,
        },
        {
          name: "`👾` • Datenbank",
          value: [
            `\`🪧\` • MongoDB`,
            `\`❕\` • Status: ${rState(connection.readyState)}`,
          ].join("\n"),
        },
      ]);

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
      components: [new ActionRowBuilder().addComponents(devcontact)],
    });
  },
};
