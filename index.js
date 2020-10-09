class Locker {
    constructor() {
        this.cosmetics = null;
    }

    async set() {
        this.cosmetics = await this.getCosmetics();
    }

    async getCosmetics() {
        const cosmetics = (await (await fetch('//blobry.herokuapp.com/api/cosmetics')).json()).data;
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
        const skin = $('#skin');
        skin.children()[0].children[0].src = item.images.icon;
        skin.css('background-image', '');
        skin.children().eq(1).css('background', '');
        if(item.series && item.series.image) {
            const image = item.series.image;
            skin.children().eq(1).css('background', `url("${skin.series.image}") center top`);
            skin.css('background-image', `url(${image})`);
        }
        return this;
    }
}

const locker = new Locker();

$(document).ready(async () => {
    await locker.set();
    locker.setSkin(locker.cosmetics['outfit-series'][42]);
    $('.locker').children('div').hover((e) => {
        const target = e.currentTarget;
       target.children[0].children[0].style.width = '165px';
       target.children[0].children[0].style.left = '-31px';
       target.children[1].style.top = '118px';
    }, (e) => {
        const target = e.currentTarget;
        target.children[0].children[0].style.width = '';
        target.children[0].children[0].style.left = '';
       target.children[1].style.top = '';
    });
});