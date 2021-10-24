const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;
const { newWorldStatusToken } = require('../config.json');

axios.defaults.baseURL = 'https://firstlight.newworldstatus.com/ext/v1';
axios.defaults.headers.common['Authorization'] = `Bearer ${newWorldStatusToken}`;

const getServer = (serverName, interaction) => {
	axios.get(`/worlds/${serverName}`)
		.then(async (response) => {
			// handle success
			// console.log(response.data);
			const { message: { players_current, players_maximum, queue_current, queue_wait_time_minutes, status_enum } } = response.data;

			// Server is down
			if (!status_enum) {
				await interaction.reply(`**${toTitleCase(serverName)}** is currently down.`);
				return;
			}

			const player_count = `There are currently ${players_current}/${players_maximum} players connected to **${toTitleCase(serverName)}**.`;

			// Server has no queue
			if (queue_current > 0) {
				await interaction.reply(`${player_count} The estimated queue length is **${queue_current}**, with an estimated wait time of **${queue_wait_time_minutes} minutes**.`);
			} else {
				await interaction.reply(`${player_count} There is no queue!`);
			}
		})
		.catch(async (error) => {
			// handle error
			// console.log(error);
			await interaction.reply({ content:`Could not retrieve server info for **${toTitleCase(serverName)}**. [Check the server name was entered correctly](https://www.newworld.com/en-us/support/server-status) and try again.`, ephemeral: true });
		})
		.then(() => {
			// always executed
		});
};

const toTitleCase = (string) => {
	return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nwqueue')
		.setDescription('Replies with queue length and player count for a specific New World server.')
		.addStringOption(option =>
			option.setName('server')
				.setDescription('The name of the New World server')
				.setRequired(true)),
	async execute(interaction) {
		const serverName = interaction.options.getString('server');
		getServer(serverName, interaction);
	},
};