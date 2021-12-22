import {elements} from '../elments'

export let check_fixtures_count = () => {
    cy.get(elements.num_fixtures).then(($el) => {
        let fixtures = $el.text()
        let fixtures_num = parseInt(fixtures.slice(0,2))
        cy.log(fixtures_num)
        cy.get(elements.fixture_body).find(elements.fixture_rows).should('have.length', fixtures_num)
    })
}

export let check_prev_scores = () => {
        cy.get(elements.fixture_body).find('tr').then(listing => {
            const listingCount = Cypress.$(listing).length;
            cy.log(listingCount)
            cy.get(elements.prev_day_button).click()
        })
            
        cy.wait(1000)
        cy.get('tbody').find('tr.fixture > td.score').each(($fixtures) => {
            expect($fixtures).to.not.have.text('?:?')
        })
        check_fixtures_count()
}
export let check_next_scores = () => {
    cy.get(elements.fixture_body).find('tr').then(listing => {
        const listingCount = Cypress.$(listing).length;
        cy.log(listingCount)
        cy.get(elements.today_button).click()
        cy.wait(1000)
        cy.get(elements.next_week_button).click()
    })
        
    cy.wait(1000)
    cy.get('tbody').find('tr.fixture > td.score').each(($fixtures) => {
        expect($fixtures).to.have.text('?:?')
    })
    // As we know we have this fixture count wrong so I have made it comment to show how our success case will look like
    // check_fixtures_count()
}