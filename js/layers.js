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
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Base Quarks", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(x) { if(hasUpgrade("q", 15)){
        return new Decimal(0.6)
    }
    else {
        return new Decimal(0.5)
    }

}, // Prestige currency exponent
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
        
    }},
    effect() {let effect = new Decimal(1).add(1).pow(player.q.points)
        return effect},
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Stimulate Up Quarks",
            description: "Double Up Quarks Base Point Gain",
            cost: new Decimal(3),
            currencyDisplayName: "Up Quarks",
            currencyLocation() {return player[this.layer].buyables},
            currencyInternalName: 11,
        },
        
        12: {
            title: "More Up Quarks",
            description: "Makes Up Quarks cost scale at slower. Also unlock Down Quarks",
            cost: new Decimal(5),
            currencyDisplayName: "Up Quarks",
            currencyLocation() {return player[this.layer].buyables},
            currencyInternalName: 11,
            unlocked() { return hasUpgrade("q", 11)},
        },
        13: {
            title: "Stimulate Down Quarks",
            description: "Double Down Quark effect.",
            cost: new Decimal(3),
            currencyDisplayName: "Down Quarks",
            currencyLocation() {return player[this.layer].buyables},
            currencyInternalName: 12,
            unlocked() { return hasUpgrade("q", 12)},
        },
        14: {
            title: "More Down Quarks",
            description: "Down Quarks cost scale at slower.",
            cost: new Decimal(5),
            currencyDisplayName: "Down Quarks",
            currencyLocation() {return player[this.layer].buyables},
            currencyInternalName: 12,
            unlocked() { return hasUpgrade("q", 13)},
        },
        15: {
            title: "Faster Base Quarks",
            description: "Buffs the Base Quark Exponent. Also unlocks Strange Quarks.",
            cost: new Decimal (50),
            unlocked() { return hasUpgrade("q", 14)},
        },
        21: {
            title: "Up Booster",
            description: "Double Up Quark Point Gain.",
            cost: new Decimal(3),
            currencyDisplayName: "Strange Quarks",
            currencyLocation() {return player[this.layer].buyables},
            currencyInternalName: 21,
            unlocked() { return hasUpgrade("q", 15)},
        },
        22: {
            title: "Placeholder",
            description: "Base Quarks multiply Point Gain",
            cost: new Decimal(4),
            currencyDisplayName: "Strange Quarks",
            currencyLocation() {return player[this.layer].buyables},
            currencyInternalName: 21,
            unlocked() { return hasUpgrade("q", 21)},
        },
        23: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 22)},
        },
        24: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 23)},
        },
        25: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 24)},
        },
        31: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 25)},
        },
        32: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 31)},
        },
        33: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 32)},
        },
        34: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 33)},
        },
        35: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 34)},
        },
        41: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 35)},
        },
        42: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 41)},
        },
        43: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 42)},
        },
        44: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 43)},
        },
        45: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 44)},
        },
        51: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 45)},
        },
        52: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 51)},
        },
        53: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 52)},
        },
        54: {
            title: "Placeholder",
            unlocked() { return hasUpgrade("q", 53)},
        },
        55: {
            title: "Begin Combination",
            description: "Unlock Hadrons",
            unlocked() { return hasUpgrade("q", 54)},
        },
    },
    buyables: {
        rows: 3,
        cols: 2,
        11: { 
            title: "Up Quarks",
            cost(x) { if (hasUpgrade("q", 12)) {
                return new Decimal(2).mul(new Decimal (1.4).pow(player.q.buyables[11]))
            } else {
                return new Decimal(2).mul(new Decimal (1.5).pow(player.q.buyables[11]))
            } },
            display() { return "Cost: " + formatWhole(this.cost()) + " Base Quarks. Amount: " + formatWhole(player.q.buyables[11])},
            canAfford() { return player.q.points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount("q", 11, getBuyableAmount("q", 11).add(1))
            },
            effect(x) { if (hasUpgrade("q", 21)) {
                let effect = new Decimal(2.5).mul(getBuyableAmount("q", 11))
                return effect
            }
            else { if (hasUpgrade("q", 11)) {
                let effect = new Decimal(2).mul(getBuyableAmount("q", 11))
                return effect
            }
            else {
                let effect = new Decimal(1).mul(getBuyableAmount("q", 11))
                return effect
            }
        }
            
            },
        },
        12: {
            title: "Down Quarks",
            display() { return "Cost: " + formatWhole(this.cost(x)) + " Base Quarks. Amount: " + formatWhole(player.q.buyables[12]) + " Multiplies Point Gain by x" + format(this.effect())},
            cost(x) { if (hasUpgrade("q", 14)) {
                return new Decimal(5).mul(new Decimal(1.4).pow(player.q.buyables[12]))
            }
            else {
                return new Decimal(5).mul(new Decimal(1.6).pow(player.q.buyables[12]))
            }
                
            },
            canAfford() {return player[this.layer].points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount("q", 12, getBuyableAmount("q", 12).add(1)) ;
            },
            effect(x){ if (hasUpgrade("q", 13)) {
                let effect = new Decimal(2.6).mul(getBuyableAmount("q", 12))
                return effect
            }
            else {
                let effect = new Decimal(1.3).mul(getBuyableAmount("q", 12))
                return effect
            }
            },
            unlocked() { return hasUpgrade("q", 12)},
        },
        21: {
            title: "Strange Quarks",
            display() { return "Cost: " + formatWhole(this.cost(x)) + " Base Quarks. Amount: " + formatWhole(player.q.buyables[21]) + " Subtracts "+ format(this.effect()) + " From Point gain BEFORE multipliers. Then multiplies Point gain by x" + format(this.effect())},
            cost(x) { return new Decimal(101).mul(new Decimal(2.5).pow(player.q.buyables[21]))},
            canAfford() {return player[this.layer].points.gte(this.cost())},
            unlocked() { return hasUpgrade("q", 15)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount("q", 21, getBuyableAmount("q", 21).add(1));
            },
            effect(x) {
                let effect = new Decimal(1.25).mul(getBuyableAmount("q", 21))
                return effect
            }

        },
        22: {
            title: "Charm Quark",
            display() { return "Cost: " + formatWhole(this.cost(x)) + " Base Quarks. Amount: " + formatWhole(player.q.buyables[22])},
            cost(x) { return new Decimal(1300)},
            canAfford() {return player[this.layer].points.gte(this.cost())}
        },
        31: {
            title: "Bottom Quark",
            display() { return "Cost: " + formatWhole(this.cost(x)) + " Base Quarks. Amount: " + formatWhole(player.q.buyables[31])},
            cost(x) { return new Decimal(4200)},
            canAfford() {return player[this.layer].points.gte(this.cost())}
        },
        32: {
            title: "Top Quark",
            display() { return "Cost: " + formatWhole(this.cost(x)) + " Base Quarks. Amount: " + formatWhole(player.q.buyables[32])},
            cost(x) { return new Decimal(171000)},
            canAfford() {return player[this.layer].points.gte(this.cost())}
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
    layerShown() { if (hasUpgrade ("q", 55)) return true, {
        
    } }
})