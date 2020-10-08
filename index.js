class Locker {
    constructor() {
        this.cosmetics = null;
    }

    async set() {
        this.cosmetics = await this.getCosmetics();
    }

    async getCosmetics() {
        return await (await fetch('//blobry.herokuapp.com/api/cosmetics')).json();
    }

    setSkin(item) {
        const skin = $('#skin');
        skin.children()[0].children[0].src = item.images.icon;
        if(item.series && item.series.image) {
            const image = item.series.image;
            const rgba = item.series.VectorParameterValues;
            skin.css('background-image', `url(${image})`);
        }
        // $('#skin').children().eq(1).css()
    }
}

const locker = new Locker();

$(document).ready(async () => {
    await locker.set();
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