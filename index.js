class Locker {
    constructor() {
        this.cosmetics = null;
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
        locker.itemEvent();
        return this;
    }

    itemEvent() {
        $('.item').children('div').hover((e) => {
            const target = e.currentTarget.parentElement;
            target.children[0].children[0].style.width = '155px';
            target.children[0].children[0].style.left = '-21px';
            target.children[1].style.top = '123px';
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
    await locker.set();
    locker.itemEvent();
    for (const item of locker.cosmetics['outfit-series']) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await locker.setSkin(item);
    }
});