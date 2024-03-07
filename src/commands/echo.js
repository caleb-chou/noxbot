const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('echo')
        .addStringOption(option => option
            .setName('phrase')
            .setDescription('Phrase to echo')
            .setRequired(true))
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Channel to echo message in')),
    async execute(interaction) {
        let channel = interaction.options.getChannel('channel') ?? interaction.channel;
        
        await channel.send({content: `${interaction.options.getString('phrase')}`})
        await interaction.reply({content: `Echoed '${interaction.options.getString('phrase')}'`, ephemeral: true});
    }
};