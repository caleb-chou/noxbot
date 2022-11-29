const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Magic 8-Ball. You know the deal')
        .addStringOption(option => option
            .setName('question')
            .setDescription('What you want to ask the 8-ball'))
        .addBooleanOption(option =>
            option
                .setName('ephemeral')
                .setDescription('Whether or not the echo should be ephemeral')
        ),
    async execute(interaction) {
        const results = [
            ['It is certain.' , 0],
            ['It is decidedly so.' , 0],
            ['Without a doubt.', 0],
            ['Yes definitely.', 0],
            ['You may rely on it.' , 0],
            ['As I see it, yes.' , 0],
            ['Most likely.' , 0],
            ['Outlook good.', 0],
            ['Yes.', 0],
            ['Signs point to yes.' , 0],
            ['Reply hazy, try again.', 1],
            ['Ask again later.', 1],
            ['Better not tell you now.', 1],
            ['Cannot predict now.', 1],
            ['Concentrate and ask again.', 1],
            ['Don\'t count on it.', 2],
            ['My reply is no.', 2],
            ['My sources say no.', 2],
            ['Outlook not so good.', 2],
            ['Very doubtful.' , 2]
        ]
        const result = results[Math.floor(Math.random() * results.length)]
        let color;
        switch(result[1]) {
            case 0: color = 0x00FF00; break;
            case 1: color = 0xFFFF00; break;
            case 2: color = 0xFF0000; break;
            default: color = 0x000000; break;
        }
        let question_field = {name: 'Question', value: interaction.options.getString('question')} ?? {}
        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`🎱 says...`)
            .addFields(
                question_field,
                {
                    name: 'Answer',
                    value: result[0]
                }
            );
        await interaction.reply({
            content: '🎱',
            embeds: [embed],
            ephemeral: interaction.options.getBoolean('ephemeral') ?? false
        });
    }
};