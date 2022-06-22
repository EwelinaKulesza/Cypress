/// <reference types="cypress" />

import searchPhrases from '../fixtures/searchPhrases.json';
import automationPractice from '../pageObject/automationPracticePage';
const automationPracticeSite = new automationPractice();


context("Testing UI of automationpractice site", ()=> {
    describe("Landing page test", ()=> {
        beforeEach("Enter automationpractice and check page visibility", ()=> {
            cy.visit("www.automationpractice.com");
            cy.url().should('contain', 'automationpractice');
        })

        it("Checking logo visibility",{tags: 'logo'}, ()=>{
            cy.visit("www.automationpractice.com");
            cy.get("#header_logo").should("be.visible");
        });

        it("Checking homeslider visibility", ()=> {
            cy.get(".homeslider-description").should("be.visible");
        })

        it("Checking banner visibility", ()=> {
            cy.get(".banner").should("be.visible");
        })

        it("Search for product by clicking search on mainpage", ()=>{
            cy.get("#search_query_top").clear().type(searchPhrases[0].fraze);
            cy.get(".button-search").click();
            cy.get(".right-block").should("contain", searchPhrases[0].fraze);
        })

        it("Add product to cart and check pop-up alert", ()=> {
            automationPracticeSite.selectFirstProduct().click();
            cy.get('.layer_cart_product > h2').should("contain", "Product successfully added to your shopping cart");
        })

        it("Add product to cart and check if number was added to cart", ()=> {
            automationPracticeSite.selectSecondProduct().click();
            cy.get('.cross').click();
            cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').should("contain", '1');
        })

        it("See if total price is visible by product on mainpage", ()=> {
            automationPracticeSite.selectFirstProduct().click();
            cy.get('.content_price').should("contain.text", '$16.51');
        })

        it("Add product to cart nad close pop-up alert", ()=>{
            automationPracticeSite.selectSecondProduct().click();
            cy.get('.cross').click();
            cy.get('.layer_cart_product > h2').should("not.be.visible");
        })

        it("Go to footer and click on 'About us'", ()=> {
            cy.get(':nth-child(7) > a').click();
            cy.get('.page-heading').should("contain.text", "About us");
        })

        it("Go to 'New products', click on logo and go back to main page",{tags:"logo"}, ()=> {
            cy.get('.toggle-footer > :nth-child(2) > a').click();
            cy.get('.page-heading').should("contain.text", "New products");
            cy.get("#header_logo").click();
            cy.get('#htmlcontent_top > .htmlcontent-home > .htmlcontent-item-1 > .item-link > .item-img').should("be.visible");
        })

        it("Go to product page card and see if data sheet is visible", ()=> {
            cy.get('#homefeatured > .first-in-line.first-item-of-tablet-line > .product-container > .left-block > .product-image-container > .product_img_link > .replace-2x').click();
            cy.get(".page-product-heading").should("contain.text", "Data sheet");
        })

        it("Go to 'Contact us' and sent a message by 'Contact Us' form", ()=> {
            cy.get("#contact-link").click();
            cy.get("#id_contact").select('Webmaster');
            cy.get("#email").type(searchPhrases[1].fraze);
            cy.get("#message").type(searchPhrases[2].fraze);
            cy.get("#submitMessage").click().wait(3000);
            cy.get(".alert").should("contain.text", "Your message has been successfully sent to our team.")
        })
    })
})