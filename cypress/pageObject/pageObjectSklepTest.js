class skleptest {
    _confirmZakladkaDostawy = ':nth-child(1) > .main-slider-info-cell > .cell-content > .cell-caption';
widocznoscZakladkiDostawy () {
    return cy.get(this._confirmZakladkaDostawy);
}
}
export default skleptest;