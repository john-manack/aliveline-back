'use strict';

const db = require('./conn');

class ActivitiesModel {
    constructor(activity_id) {
        this.activity_id = activity_id;
    }

    static async getActivitiesList() {
        const response = await db.any(`
            SELECT *
            FROM activities
            ORDER BY is_complete ASC, activities.id;
        `);
        return response;
    }

    static async getActivityInfo(activity_id){
        const activityData = await db.one(`
            SElECT * FROM activities WHERE id = ${activity_id}
        `)
        const notesData = await db.any(`
            SElECT * FROM nested_notes WHERE activity_reference = ${activity_id}
        `)
        const hoursData = await db.any(`
            SElECT * FROM nested_hours WHERE activity_reference = ${activity_id}
        `)
        return {
            activityData,
            notesData,
            hoursData
        }
    }

    static async addActivity(title, details, is_billable, user_sub) {
        const response = await db.result(`
            INSERT INTO activities (title, details, is_complete, is_billable, user_sub)
            VALUES
            ($1, $2, FALSE, $3, $4)
        `, 
            [title, details, is_billable, user_sub]
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

    static async modifyIsFavorite(boolean, activity_id) {
        const response = await db.result(`
            UPDATE activities
            SET is_favorite = $1
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

    static async deleteNote(note_id) {
        const response = await db.result(`
            DELETE FROM nested_notes
            WHERE id = ${note_id}
        `,);
        return response;
    }

    static async deleteHours(hours_id) {
        const response = await db.result(`
            DELETE FROM nested_hours
            WHERE id = ${hours_id}
        `,);
        return response;
    }

    static async deleteActivity(activity_id) {
        const notesDeleteResponse = await db.result(`
            DELETE FROM nested_notes
            WHERE activity_reference = ${activity_id}
        `,);
        const hoursDeleteResponse = await db.result(`
            DELETE FROM nested_hours
            WHERE activity_reference = ${activity_id}
        `,);
        const activityDeleteResponse = await db.result(`
            DELETE FROM activities
            WHERE id = ${activity_id}
        `)
        return {
            notesDeleteResponse,
            hoursDeleteResponse,
            activityDeleteResponse
        }
    }

}

module.exports = ActivitiesModel;