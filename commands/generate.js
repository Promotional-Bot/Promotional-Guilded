const { Embed } = require("guilded.js");

module.exports = {
    name: "generate",
    aliases: ["g"],
    execute: async (msg) => {
        const count = 4;

        const botMsg = await msg.send(
          new Embed()
            .setTitle("")
            .setTimestamp(new Date())
            .setColor(16776960)
            .setDescription("Requesting self generated promotional links...")
            .setAuthor("Promotional", "https://i.ibb.co/W5QdSFy/Promotional.jpg")
        );

        try {
          let links = [];

          const data = {
            partnerUserId: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,               
              (function(t) {
                  const e = 16 * Math.random() | 0;
                  return ("x" === t ? e : 3 & e | 8).toString(16)
              }))
          };

          for (let i = 0; i < count; i++) {
            const response = await fetch(
              "https://api.discord.gx.games/v1/direct-fulfillment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              },
            );

            if (!response.ok) {
              links.push(
                `Failed! Status: ${response.status}`,
              );
            }

            if (response.ok) {
              const responseData = await response.json();

              links.push(
                `https://discord.com/billing/partner-promotions/1180231712274387115/${responseData.token}`,
              );
            }
          }

          let linksText;

          if (true) {
            linksText = links.slice(0, 4).map((link, index) => {
            if (link.startsWith("https")) {
             return `${index + 1}. [Claim Promotional](${link})`;
            } else {
             return `${index + 1}. ${link}`;
            }
          }).join("\n");

          await botMsg.edit(
            new Embed()
              .setColor(65280)
              .setDescription(`Requests fulfilled. Claim your discord promotionals:\n\n${linksText}`)
              .setAuthor("Promotional", "https://i.ibb.co/W5QdSFy/Promotional.jpg")
              .setTimestamp(new Date())
          );
          
          links = links.slice(4);
        }
          
        } catch (error) {
          console.error("Error:", error);
        }
    },
};
