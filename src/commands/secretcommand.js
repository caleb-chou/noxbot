const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('secret')
        .setDescription('a super secret command!')
        .addRoleOption(option => option
            .setName('rinput')
            .setDescription('rinput'))
        .addUserOption(option => option
            .setName('uinput')
            .setDescription('uinput')),
    async execute(interaction) {
        interaction.guild.roles.cache.sort(function compareFn(a, b) {
            if (a.rawPosition < b.rawPosition) return -1;
            if (a.rawPosition === b.rawPosition) return 0;
            return 1; 
        }).forEach(element => {
            console.log(element.name)
        });
        let user = interaction.options.getMember('uinput') ?? interaction.member;
        await user.roles.add(interaction.options.getRole('rinput'));
        await interaction.reply({content : `Attempted to add role...`, ephemeral: true});
    }
}