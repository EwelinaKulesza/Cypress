/// <reference types="cypress" />
import skleptest from '../pageObject/pageObjectSklepTest';
const sklep = new skleptest();
import Skleptest from '../fixtures/skleptest.json';
context("Testy skleptest.pl", () => {
    describe("Testy frontendowe sklepu", () => {
        beforeEach("Enter google page and confirm policy", () => {
                cy.visit("http://skleptest.pl");
                cy.url().should("contain", "skleptest");
    })
    it("Widocznosc nazwy sklepu", () => {
        cy.get('.site-title').should('be.visible');
    })
    it("Widocznosc banera", () => {
        cy.get('.active > .item > .attachment-tyche-slider-image').should('be.visible');
    })
    it("Widocznosc zakladki dostawy", () => {
        sklep.widocznoscZakladkiDostawy().should('contain.text', "FREE SHIPPING");
    })
    it("Poprawnosc numeru telefonu", () => {
        cy.get(':nth-child(2) > .main-slider-info-cell > .cell-content > .cell-subcaption').should('contain.text', "+04786445953");
    })
    it("Wyszukiwanie produktu shirt", () => {
            cy.fixture('Skleptest').then((produkty)=> {
            cy.get('#search-field-top-bar').clear().type(produkty[0].fraze).type('{enter}');
            cy.url().should('contain', Skleptest[0].fraze);
            })
    })
    it("Wyszukiwanie produktu top", () => {
        cy.get('#search-field-top-bar').clear().type("top").type('{enter}');
        cy.url().should("contain", "top");
    })
    it("Dodawanie produktu do koszyka", () => {
        cy.get('#tyche_products-1 > .row > .col-sm-9 > .owl-carousel > .owl-stage-outer > .owl-stage > :nth-child(3) > .item > .tyche-product > .tyche-product-body > .ajax_add_to_cart').click();
        cy.get('.added_to_cart').should('be.visible');
    })
    it("Widocznosc karty produktu", () => {
        cy.get('#tyche_products-1 > .row > .col-sm-9 > .owl-carousel > .owl-stage-outer > .owl-stage > :nth-child(3) > .item > .tyche-product > .tyche-product-body > h3 > .woocommerce-LoopProduct-link').click();
        cy.get('.product_title').should('contain.text', "Little Black Shirt");
    })
    it("Widocznosc ceny na karcie produktu", () => {
        cy.get('#tyche_products-1 > .row > .col-sm-9 > .owl-carousel > .owl-stage-outer > .owl-stage > :nth-child(3) > .item > .tyche-product > .tyche-product-body > h3 > .woocommerce-LoopProduct-link').click();
        cy.get('.summary > .price > .woocommerce-Price-amount').should("be.visible");
    })
    it("Subskrybcja", () => {
        cy.get('#es_txt_name').clear().type("abc");
        cy.get('#es_txt_email').clear().type("abc@wp.pl");
        cy.get('#es_txt_button').click();
        cy.get('#es_msg').should("contain.text","Successfully Subscribed");
    })
    it("Wyszukiwanie po tagach", () => {
        cy.get('.tag-link-16').click();
        cy.get('.page-title').should("contain.text", "Tag: Autumn");
    })
    it("Przechodzenie do koszyka po dodaniu produktu", () => {
        cy.get('#tyche_products-2 > .row > .col-sm-9 > .owl-carousel > .owl-stage-outer > .owl-stage > :nth-child(1) > .item > .tyche-product > .tyche-product-body > .ajax_add_to_cart').click();
        cy.get('.top-cart > a').click();
        cy.url().should("contain", "cart");
    })
    })
});