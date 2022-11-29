const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, resolveColor, ActionRowBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balloongame')
        .setDescription('Play Balloon Game')
        .addBooleanOption(option =>
            option
                .setName('ephemeral')
                .setDescription('Whether or not the echo should be ephemeral')
        ),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(resolveColor([parseInt(Math.random() * 256), parseInt(Math.random() * 256), parseInt(Math.random() * 256)]))
            .setTitle('Rules')
            .setDescription('The balloon will pop after a random number of pumps. If you pop the balloon, you lose! Click the \'Pump\' Button to pump the balloon!')
            .setTimestamp()
            .setFooter({text: `Game Started by ${interaction.member.displayName}`});
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('pumpitup')
                .setLabel('0 Pump(s)')
                .setStyle(ButtonStyle.Primary)
        );
        
        await interaction.reply({
            content: '🎈',            
            components: [row],
            embeds: [embed],
            ephemeral: interaction.options.getBoolean('ephemeral')
        });
    }
};