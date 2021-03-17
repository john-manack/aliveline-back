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



}

module.exports = ActivitiesModel;