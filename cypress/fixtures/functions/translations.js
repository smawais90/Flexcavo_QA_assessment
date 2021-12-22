import {elements} from '../elments'
import {data} from '../data'
export let check_en_phrase = () => {
    // we can check as many phrases here as many we want
    cy.get(elements.today_button).should('have.text', data.en.today)
    cy.get(elements.toggle_button).should('contains.text',data.en.all_countries)
}
export var check_de_phrase = () => {
   
    // We will check few phrases that if german langauge is implemented to all
    cy.get(elements.today_button).should('have.text', data.de.today)
    cy.get(elements.toggle_button).should('contains.text',data.de.all_countries)
}