
import dateFormat,{ masks, i18n  } from "dateformat"
import { set_prev_date, set_next_date,check_today_date } from '../fixtures/functions/set_dates'
import { check_de_phrase, check_en_phrase } from '../fixtures/functions/translations'
import {elements} from '../fixtures/elments'
import { check_fixtures_count, check_next_scores, check_prev_scores } from '../fixtures/functions/fixtures'

describe('fixture finder test cases', () => {
    let current_date
    before(()=> {
        cy.visit('/')
    })
    
    it('should load the fixture findr webiste successfully', () => {
        cy.get(elements.landing_page_bg_img).should('be.visible')
        cy.get(elements.landing_page_title).should('have.text', 'Fixture Findr')
        cy.get(elements.localization).should('be.visible')
        cy.get(elements.navbar).should('be.visible')
        cy.get(elements.fixtures).should('be.visible')
    })
    it('should have English as default language', () => {
        check_en_phrase()
    })
    it ('should set the german language once german language selected', () => {
        cy.get(elements.localization).within(() => {
            cy.get(elements.german).click()
        })
        check_de_phrase()
    })
    it('should set the language to english when english language selected', () => {
        // Setting english language back
        cy.get(elements.localization).within(() => {
            cy.get(elements.english_lang).click()
        })
        check_en_phrase()
    })
    it('should show the fixtures of today by default', () => {
        check_today_date()
    })
    it ('All countries filter should be set and filter team field should be empty by default', () => {
        cy.get(elements.toggle_button).should('contains.text','All Countries')
        cy.get(elements.team_filter_field).should('have.value', '')
    })
    it('It should show English leagues fixtures on selecting England filter', () => {
        cy.get(elements.toggle_button).click()
        cy.get('ul').children('li').eq(1).click()
        cy.get(elements.england).should('contains.text','England')
    })
    it('It should show German leagues fixtures on selecting Germany filter', () => {
        cy.get(elements.toggle_button).click()
        cy.get('ul').children('li').eq(2).click()
        cy.get(elements.germany).should('contains.text','Germany')
    })
    it('It should show all leagues fixtures on selecting All countries filter', () => {
        cy.get(elements.toggle_button).click()
        cy.get('ul').children('li').eq(0).click()
        cy.get(elements.all_countries).eq(1).should('contains.text','All Countries')
    })
    it('number of fixtures should be equal to number of shown fixtures', () => {
        check_fixtures_count()
    })
    it('it should check scores from previous games', () => {
        check_prev_scores()
    })
    it('it should check schedules from upcoming games', () => {
        check_next_scores()
    })
    context('Fixture Date selection test cases', () => {
        beforeEach(() => {
            cy.get(elements.curr_date).then(($date) => {
                current_date = $date.text()
            })
        })
        it('should show the fixtures of previous day', () => {
        
            let prev_day = set_prev_date(1,current_date)
            cy.get(elements.prev_day_button).click()
            cy.get(elements.curr_date).should('have.text',prev_day)
        })
        it('should show the fixtures of previous week', () => {
                let prev_week = set_prev_date(7,current_date)
                cy.get(elements.prev_week_button).click()
                cy.get(elements.curr_date).should('have.text',prev_week)
            
            })
        it('should show the fixtures of next day', () => {
            let next_day = set_next_date(1,current_date)
            cy.get(elements.next_day_button).click()
            cy.get(elements.curr_date).should('have.text',next_day)
        })
        it('should show the fixtures of next week', () => {
            let next_week =set_next_date(7,current_date)
            cy.get(elements.next_week_button).click()
            cy.get(elements.curr_date).should('have.text',next_week)
        })
        it ('should set the the date to today date', () => {
            cy.get(elements.today_button).click()
            check_today_date()
        })
    })
})
