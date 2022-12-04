const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder, resolveColor } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('User Information')
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setImage(interaction.targetUser.avatarURL())
            .setTitle(`${interaction.targetUser.username}#${interaction.targetUser.discriminator}`);
        await interaction.reply({content: `\u200b`, embeds: [embed], ephemeral: true})
    }
}