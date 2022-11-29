const fs = require('node:fs');
const path = require('node:path')
var seedrandom = require('seedrandom');
const auth = JSON.parse(fs.readFileSync('auth/d.json'));

const commandPath = 'src/commands';

const { Client, GatewayIntentBits, Collection, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`)
});

client.login(auth.BOT_TOKEN)

client.commands = new Collection();
commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join('../', commandPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		console.log(`[DEBUG] Loaded command '${command.data.name}'`)
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARN] The command at ${filePath} is missing 'data' and/or 'execute'`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isButton()) {
		if (interaction.customId === 'likebutton') {
			const embed = EmbedBuilder.from(interaction.message.embeds[0]);
			// console.log(embed);
			var likes = embed.data.footer.text;//replace(/^D+/g, '');
			// console.log(likes);
			embed.setFooter({text: `${parseInt(likes) + 1} Likes`})
			await interaction.update({embeds : [embed]})
		}
		if (interaction.customId === 'pumpitup') {
			var pumps = parseInt(interaction.component.label);
			const rng = seedrandom(interaction.message.createdTimestamp);
			if(pumps > parseInt(rng() * 100) + 1) {
				const new_embed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setTitle('The balloon popped!')
					.setDescription(`${interaction.member.displayName} popped the balloon after ${pumps} pumps!`)
				await interaction.update({content:'💥', embeds : [new_embed], components : []})
				
			} else {		
				const new_button = ButtonBuilder.from(interaction.component);

				new_button.setLabel(`${pumps + 1} Pump(s)`)
				await interaction.update({components: [
					new ActionRowBuilder().addComponents(
						new_button
					)
				]});
			}
		}
	}
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
