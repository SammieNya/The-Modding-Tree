addLayer("q", {
    name: "Quarks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Q", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Quarks", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){ if (player.points >= 0) return true, {
        
    } },
    
    upgrades: {
        rows: 5,
        cols: 5,
        
        11: {
            description: "Blah",
            cost: new Decimal(1),
        }
    },
    buyables: {
        rows: 1,
        cols: 1,
        11: { 
            cost(x) { return new Decimal(1).mul(new Decimal (1.15).pow(player.q.buyables[11])) },
            display() { return "Cost: " + format(this.cost()) + " Quarks. Amount: " + formatWhole(player.q.buyables[11])},
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                player[this.layer].buyables[11] = player[this.layer].buyables[11].add(1)
            },
        },
}
})
addLayer("H", {
    name: "Hadrons",
    symbol: "H",
    positon: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(100),
    resource: "Hadrons",
    row: 1,
    baseResource: "Quarks",
    baseAmount() {return player.points},
    requires: new Decimal(1),
    type: "normal",
    exponent: 0.5,
    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal (1)
    },
    layerShown() { if (hasUpgrade ("q", 11)) return true, {
        
    } }
})