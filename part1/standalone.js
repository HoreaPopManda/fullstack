setTimeout(() => console.log("This"), 0);

for (let i = 0; i < 1000000000; i++) {} // Blocks the thread

console.log("That");
