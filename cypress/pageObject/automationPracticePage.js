class automationpractice {

_findFirstProductSelector = "#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span";
_findSecondProductSelector = '#homefeatured > :nth-child(2) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span';

selectFirstProduct() {
    return cy.get(this._findFirstProductSelector);
}

selectSecondProduct() {
    return cy.get(this._findSecondProductSelector);
}

}

export default automationpractice;