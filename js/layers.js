addLayer("q", {
    branches: ["h"],
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
            title: "More Up Quarks",
            description: "Makes Up Quarks scale at half speed.",
            cost: new Decimal(5),
            currencyDisplayName: "Up Quarks",
            currencyLocation() {return player[this.layer].buyables},
            currencyInternalName: 11,
        },
        12: {
            title: "More Down Quarks",
            description: "Down Quarks scale at half speed.",
            cost: new Decimal(5),
            currencyDisplayName: "Down Quarks",
            currencyLocation() {return player[this.layer].buyables},
            currencyInternalName: 12,
        },
    },
    buyables: {
        rows: 1,
        cols: 2,
        11: { 
            title: "Up Quarks",
            cost(x) { if (hasUpgrade("q", 11)) {
                return new Decimal(1).mul(new Decimal (1.25).pow(player.q.buyables[11]))
            } else {
                return new Decimal(1).mul(new Decimal (1.5).pow(player.q.buyables[11]))
            } },
            display() { return "Cost: " + format(this.cost()) + " Quarks. Amount: " + formatWhole(player.q.buyables[11])},
            canAfford() { return player.q.points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount("q", 11, getBuyableAmount("q", 11).add(1))
            },
            effect(){
                let effect = new Decimal(0.5).mul(getBuyableAmount("q", 11))
                return effect
            },
        },
        12: {
            title: "Down Quarks",
            display() { return "Cost: " + format(this.cost(x)) + " Base Quarks. Amount: " + formatWhole(player.q.buyables[12]) + " Multiplies Point Gain by x" + format(this.effect())},
            cost(x) { if (hasUpgrade("q", 12)) {
                return new Decimal(2.14).mul(new Decimal(1.35).pow(player.q.buyables[12]))
            }
            else {
                return new Decimal(2.14).mul(new Decimal(1.7).pow(player.q.buyables[12]))
            }
                
            },
            canAfford() {return player[this.layer].points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount("q", 12, getBuyableAmount("q", 12).add(1)) ;
            },
            currencyDisplayName: "2 Base Quarks, 2 Up Quarks",
            currencyLayer: "q",
            currencyInternalName: "Quarks", 
            effect(){
                let effect = new Decimal(1.1).mul(getBuyableAmount("q", 12))
                return effect
            },
        },
}
})
addLayer("h", {
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
    baseAmount() {return player.q.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal (1)
    },
    currencyLayer: "q",
    layerShown() { if (hasUpgrade ("q", 11)) return true, {
        
    } }
})