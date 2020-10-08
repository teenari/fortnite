class Locker {
    constructor(version) {
        this.cosmetics = null;
    }

    async set() {
        this.cosmetics = 
    }

    async getCosmetics() {
        return (await fetch('//blobry.herokuapp.com/api/cosmetics'))
    }

    async getCardColor(card) {
        const request = await this.benbot.getCard(card);
        console.log(request);
    }
}

$(document).ready(async () => {
    const locker = new Locker(1);
    await locker.getCardColor('LavaSeries');
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