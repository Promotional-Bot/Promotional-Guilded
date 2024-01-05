const { Embed } = require("guilded.js");

module.exports = {
  name: "ping",
  aliases: ["p"],
  execute: async (msg) => {
    const currentTime = Date.now();

    const botMsg = await msg.send(
      new Embed()
        .setTitle("")
        .setTimestamp(new Date())
        .setColor(16776960)
        .setDescription("Grabbing current ping...")
        .setAuthor("Promotional", "https://i.ibb.co/W5QdSFy/Promotional.jpg"),
    );

    let message = `Ping: ${Date.now() - currentTime}ms`;

    await botMsg.edit(
      new Embed()
        .setTitle("")
        .setTimestamp(new Date())
        .setColor(65280)
        .setDescription(message)
        .setAuthor("Promotional", "https://i.ibb.co/W5QdSFy/Promotional.jpg"),
    );
  },
};
