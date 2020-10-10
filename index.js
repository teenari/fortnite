class Locker {
    constructor() {
        this.cosmetics = null;
        this.rarities = null;
    }

    async set() {
        this.cosmetics = await this.getCosmetics();
    }

    async getCosmetics() {
        const cosmetics = (await (await fetch('http://blobry.herokuapp.com/api/cosmetics')).json()).data;
        const data = {
            all: cosmetics
        };
        const types = [...new Set(cosmetics.map(({ type: { value } }) => value))];
        for (const type of types) {
            data[type] = cosmetics.filter(e => e.type.value === type);
            data[`${type}-series`] = cosmetics.filter(e => e.type.value === type && e.series && e.series.image);
        }
        this.cosmetics = data;
        return this.cosmetics;
    }

    setSkin(item) {
        function adjust(color, amount) {
            return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
        }
        const skin = $('#skin');
        skin.children()[0].children[0].src = item.images.icon;
        if(item.series) {
            const VectorParameterValues = item.series.VectorParameterValues;
            if(VectorParameterValues[0]) {
                skin.children().eq(1).css('background', VectorParameterValues[0].Hex);
                skin.children().eq(1).css('border-left', `2px solid ${adjust(VectorParameterValues[0].Hex, 50)}`);
            }
        }
        else {
            console.log(item.rarity.displayValue)
            if(this.rarities && this.rarities[item.rarity.displayValue]) {
                const rarity = this.rarities[item.rarity.displayValue];
                skin.children().eq(1).css('background', rarity.Color1);
                skin.children().eq(1).css('border-left', `2px solid ${adjust(rarity.Color2, 50)}`);
                console.log(rarity);
            }
        }
        locker.itemEvent();
        return this;
    }

    itemEvent() {
        $('.item').children('div').hover((e) => {
            const target = e.currentTarget.parentElement;
            target.children[0].children[0].style.width = '155px';
            target.children[0].children[0].style.left = '-21px';
            target.children[1].style.top = '118px';
        }, (e) => {
             const target = e.currentTarget.parentElement;
             target.children[0].children[0].style.width = '';
             target.children[0].children[0].style.left = '';
             target.children[1].style.top = '';
        });
        return this;
    }
}

const locker = new Locker();

$(document).ready(async () => {
    locker.rarities = {
        "Common": {
            "Color1": "#B1B1B1",
            "Color2": "#79858E"
        },
        "Uncommon": {
            "Color1": "#5BFD00",
            "Color2": "#1E8500"
        },
        "Rare": {
            "Color1": "#00FFF6",
            "Color2": "#006DFF"
        },
        "Epic": {
            "Color1": "#D505FF",
            "Color2": "#9D19FF"
        },
        "Legendary": {
            "Color1": "#F68B20",
            "Color2": "#FF4203"
        }
    };
    await locker.set();
    locker.itemEvent();
    for (const item of locker.cosmetics.outfit) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await locker.setSkin(item);
    }
});