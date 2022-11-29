const { SlashCommandBuilder } = require('discord.js')



module.exports = {
    data: new SlashCommandBuilder()
        .setName('addbirthday')
        .setDescription('Set your Birthday')
        .addIntegerOption(option => option
            .setName('month')
            .setDescription('The month you were born')
            .addChoices(
                { name: 'January', value: 1 },
                { name: 'February', value: 2 },
                { name: 'March', value: 3 },
                { name: 'April', value: 4 },
                { name: 'May', value: 5 },
                { name: 'June', value: 6 },
                { name: 'July', value: 7 },
                { name: 'August', value: 8 },
                { name: 'September', value: 9 },
                { name: 'October', value: 10 },
                { name: 'November', value: 11 },
                { name: 'December', value: 12 },
            )
            .setRequired(true)
        )
        .addIntegerOption(option => option
            .setName('day')
            .setDescription('The day you were born')
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.reply({ content: `${interaction.options.getInteger('month')}/${interaction.options.getInteger('day')}`, ephemeral: true })
    }
}