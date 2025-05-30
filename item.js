export function item() {
    return {
        name: "item",
        description: "Create a new item.",
        options: [
            {
                name: "name",
                description: "The name of the item.",
                type: 3,
                required: true
            },
            {
                name: "description",
                description: "The description of the item.",
                type: 3,
                required: true
            }
        ],
        execute: async (interaction) => {
            const name = interaction.options.getString("name");
            const description = interaction.options.getString("description");
            const item = { name, description };
            await interaction.reply(`Item created: ${JSON.stringify(item)}`);
        }
    };
}