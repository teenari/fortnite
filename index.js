class Locker {
    constructor() {
        this.cosmetics = null;
    }

    async set() {
        this.cosmetics = await this.getCosmetics();
    }

    async getCosmetics() {
        const cosmetics = (await (await fetch('http://localhost:300/api/cosmetics')).json()).data;
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
        skin.children().eq(1).css('background', '');
        if(item.series && item.series.image) {
            const VectorParameterValues = item.series.VectorParameterValues;
            const background = adjust(VectorParameterValues[0].Hex, -40);
            if(VectorParameterValues[0]) {
                skin.children().eq(1).css('background', VectorParameterValues[0].Hex);
                skin.css('background', background);
            }
        }
        return this;
    }
}

const locker = new Locker();

$(document).ready(async () => {
    await locker.set();
    $('.locker').children('div').hover((e) => {
        const target = e.currentTarget;
       target.children[0].children[0].style.width = '165px';
       target.children[0].children[0].style.left = '-31px';
       target.children[1].style.top = '123px';
    }, (e) => {
        const target = e.currentTarget;
        target.children[0].children[0].style.width = '';
        target.children[0].children[0].style.left = '';
       target.children[1].style.top = '';
    });
});