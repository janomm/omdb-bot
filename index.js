const env = require('./.env');
const { Telegraf } = require('telegraf');
const bot = new Telegraf(env.TOKEN);
const axios = require('axios');

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name;
    await ctx.reply(`Seja bem vindo ${name}!`);
    await ctx.reply(`Digite o nome do filme ou série em inglês para obter informações do mesmo!`);
});

bot.on('text',async ctx => {
    const movie = ctx.update.message.text;
    axios.get(env.URL + movie).then(ret => {
        if (ret.data.Response === "False") {
            ctx.reply(`Título ${movie} não encontrado!`);
        } else {
            const data = ret.data;
            ctx.reply(`
Título: ${data.Title}
Ano: ${data.Year}
Nota IMDB: ${data.imdbRating}
Gênero: ${data.Genre}
Diretor: ${data.Director}`);
        }
        
    })
});

bot.startPolling();

console.log("Rodando...");
