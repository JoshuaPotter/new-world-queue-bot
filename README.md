# New World Queue Discord Bot

Displays the queue length and player count for any New World server. Built with [Discord.js](https://discord.js.org/#/docs/main/stable/general/welcome) framework.

Data provided by [New World Status](https://newworldstatus.com) Unofficial Status API. As a result, all data is an estimation.

## Requirements
- Node

## Config
Rename `config.sample.json` to `config.json`. Both `token` and `clientId` come from the Discord application. `newWorldStatusToken` is for API connection.

## Commands
Commands are stored in `commands/` directory. Each file represents a slash command, loaded programmatically from `index.js`. To deploy commands when installing the bot, run `node deploy-commands.js`. This must also be run whenever new commands are added to the bot or command parameters are edited. This does NOT need to be run when editing the command functionality.
