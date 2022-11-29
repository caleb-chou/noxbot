const { SlashCommandBuilder, EmbedBuilder, resolveColor } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll a dice!')
        .addIntegerOption(option => option
            .setName('sides')
            .setDescription('Number of sides on the dice'))
        .addIntegerOption(option => option
                .setName('dice')
                .setDescription('Number of dice to roll'))
        .addBooleanOption(option => option
            .setName('ephemeral')
            .setDescription('Whether the response should be ephemeral')),
    async execute(interaction) {
        let dice = interaction.options.getInteger('dice') ?? 1;
        let sides = interaction.options.getInteger('sides') ?? 6;
        const embed = new EmbedBuilder()
            .setColor(resolveColor([parseInt(Math.random() * 256), parseInt(Math.random() * 256), parseInt(Math.random() * 256)]))
            .setTitle(`${interaction.member.displayName}'s Dice Rolls`)
            .setDescription(`Rolled ${dice} ${sides}-sided dice`);
        for (var i = 0; i < dice; i++) {
            embed.addFields(
                {
                    name: `Roll ${i + 1}`,
                    value: `${parseInt(Math.random() * sides) + 1}`
                }
            )
        }
        await interaction.reply({
            content: '🎲',
            embeds: [
                embed
            ],
            ephemeral: interaction.options.getBoolean('ephemeral') ?? false
        })
    }
};