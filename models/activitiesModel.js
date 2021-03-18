'use strict';

const db = require('./conn');

class ActivitiesModel {
    constructor(activity_id) {
        this.activity_id = activity_id;
    }

    static async getActivitiesList(user_id) {
        const response = await db.any(`
            SELECT * FROM activities WHERE user_reference = ${user_id}
            ORDER BY id ASC;
        `);
        return response;
    }

    static async getActivityInfo(activity_id){
        const activityData = await db.one(`
            SElECT * FROM activities WHERE id = ${activity_id}
        `)
        const notesData = await db.any(`
            SElECT note_entry, activity_reference FROM nested_notes WHERE activity_reference = ${activity_id}
        `)
        const hoursData = await db.any(`
            SElECT hours_entry, hours_description, activity_reference FROM nested_hours WHERE activity_reference = ${activity_id}
        `)
        return {
            activityData,
            notesData,
            hoursData
        }
    }

    static async addActivity(title, details, is_billable, user_id) {
        const response = await db.result(`
            INSERT INTO activities (title, details, is_complete, is_billable, user_reference)
            VALUES
            ($1, $2, FALSE, $3, $4)
        `, 
            [title, details, is_billable, user_id]
        );
        return response;
    }

    static async modifyIsComplete(boolean, activity_id) {
        const response = await db.result(`
            UPDATE activities
            SET is_complete = $1
            WHERE id = $2
        `,
            [boolean, activity_id]);
        return response;
    }

    static async modifyIsBillable(boolean, activity_id) {
        const response = await db.result(`
            UPDATE activities
            SET is_billable = $1
            WHERE id = $2
        `,
            [boolean, activity_id]);
        return response;
    }

    static async addNote(note_entry, activity_id) {
        const response = await db.result(`
            INSERT INTO nested_notes (note_entry, activity_reference)
            VALUES
            ($1, $2)
        `,
            [note_entry, activity_id]
        );
        return response;
    }

    static async addHours(hours_entry, hours_description, activity_id) {
        const response = await db.result(`
            INSERT INTO nested_hours (hours_entry, hours_description, activity_reference)
            VALUES
            ($1, $2, $3)
        `,
            [hours_entry, hours_description, activity_id]
        );
        return response;
    }

}

module.exports = ActivitiesModel;