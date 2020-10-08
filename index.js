$(document).ready(() => {
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