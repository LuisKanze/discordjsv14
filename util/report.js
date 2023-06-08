const {
  SlashCommandBuilder,
  Colors,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName("report")
  .setDescription("📝 | Melde ein User").addUserOption((option) => option.setName("user").setDescription("👤 | Wähle ein User aus").setRequired(true))
  .addStringOption((option) => option.setName("grund").setDescription("📝 | Grund für den Report").setRequired(true)),
  async execute(interaction, client) {
    const reportedUser = interaction.options.getUser('user');
    const grund = interaction.options.getString('grund');

    if (reportedUser.id == interaction.user.id) {
      return await interaction.reply({ content: '`❌` | Du kannst dich nicht selber reporten.', ephemeral: true });
    }
    if (reportedUser.bot == true) {
      return await interaction.reply({ content: '`❌` | Du kannst keine Bots reporten.', ephemeral: true });
    }
    const button = new ActionRowBuilder().setComponents(
    new ButtonBuilder()
      .setLabel(reportedUser.tag)
      .setStyle(ButtonStyle.Link)
      .setURL(`https://discordapp.com/users/${reportedUser.id}`),
      new ButtonBuilder()
      .setLabel(interaction.user.tag)
      .setStyle(ButtonStyle.Link)
      .setURL(`https://discordapp.com/users/${interaction.user.id}`)
    )
    const reportEmbed = new EmbedBuilder()
        .setTitle(`\`📝\` | Neuer Report von ${interaction.user.tag}`)
        .setColor(Colors.Red)
        .addFields([
          {
            name: '`👤` | **User**',
            value: reportedUser.toString(),
          },
          {
            name: '`🫅` | **Von**',
            value: interaction.user.toString(),
          },
          {
            name: '`📝` | **Grund**',
            value: grund,
          },
        ])

    const modChannel = interaction.guild.channels.cache.find(channel => channel.id === "REPORT_CHANNEL_ID");
    if (modChannel) {
        modChannel.send({ embeds: [reportEmbed], components: [button]});
        await interaction.reply({content: "`✅` | Report wurde **gesendet**", ephemeral: true});
    } else {
        await interaction.reply({ content: '`❌` | Es wurde kein **Report** Kanal gefunden', ephemeral: true});
    }

},

        
};
