const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, resolveColor } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confess')
        .setDescription('Post an anonymous confession')
        .addStringOption(option => option
            .setName('confession')
            .setDescription('What you want to confess')),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('likebutton')
                    .setLabel('Like!')
                    .setStyle(ButtonStyle.Success)
            );
        const embed = new EmbedBuilder()
            .setColor(resolveColor([parseInt(Math.random() * 256), parseInt(Math.random() * 256), parseInt(Math.random() * 256)]))
            .setTitle(`Confession #${parseInt(Math.random() * 100)}`)
            .setDescription(`${interaction.options.getString('confession')}`)
            .setTimestamp()
            .setFooter({ text: `0 Likes` });
        await interaction.channel.send({
            components: [row],
            embeds: [embed],
            // ephemeral: true
        });
        await interaction.reply({
            content: `Posted your confession in ${interaction.channel}`,
            ephemeral: true
        });
    }
}