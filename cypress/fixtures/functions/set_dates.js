
import dateFormat,{ masks, i18n  } from "dateformat"
import {elements} from '../elments'
export var set_prev_date = (days,curr_date) => {
    let d_format= curr_date.replace(/th|st|nd|rd/g, "");
             let date_iso = dateFormat(d_format, "isoDateTime");
            const get_date = new Date(date_iso);
            let prev_week = get_date.setDate(get_date.getDate() - days);
            let test_date = dateFormat(prev_week, "ddd dS mmmm yyyy");
            return test_date
}

export var set_next_date = (days,curr_date) => {
    let d_format= curr_date.replace(/th|st|nd|rd/g, "");
             let date_iso = dateFormat(d_format, "isoDateTime");
            const get_date = new Date(date_iso);
            let prev_week = get_date.setDate(get_date.getDate() + days);
            let test_date = dateFormat(prev_week, "ddd dS mmmm yyyy");
            return test_date
}
export var check_today_date = () => {
    let now = new Date();
        let d = dateFormat(now, "ddd dS mmmm yyyy");
        cy.get('.info > .date').should('have.text',d)
}

