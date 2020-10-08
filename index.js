class BenBot {
    constructor(version) {
        this.version = version;
        this.url = `https://benbotfn.tk/api/v${version}`;
    }

    async benbot(endpoint, parms) {
        return await fetch(`${this.url}/${endpoint}?${parms}`);
    }

    async assetProperties(parms) {
        return await this.benbot('assetProperties', parms);
    }

    async getCard(card, json) {
        const request = await this.assetProperties(`path=FortniteGame/Content/Athena/UI/Frontend/CosmeticItemCard/Materials/M_UI_ItemCard_V2_${card}.uasset`);
        return json ? await request.json() : request;
    }
}

class Locker {
    constructor(version) {
        this.benbot = new BenBot(version);
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