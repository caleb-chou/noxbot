const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('goodmorning')
        .setDescription('DMs a user \'Good Morning!\'')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('User to DM')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option
                .setName('ephemeral')
                .setDescription('Whether or not the echo should be ephemeral')
        ),
    async execute(interaction) {
        await interaction.reply({ content: `Messaged ${interaction.options.getUser('target')} 'Good Morning'`, ephemeral: interaction.options.getBoolean('ephemeral') });
        await interaction.options.getUser('target').send({ files: ['https://cdn.discordapp.com/attachments/971610281266520164/1014041554253516891/image0.gif'] })
            .then(message => console.log(`Sent message ${message}`))
            .catch(console.error);
    }
}