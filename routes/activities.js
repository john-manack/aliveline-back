'use strict';

const express = require('express'),
    router = express.Router(),
    activitiesModel = require('../models/activitiesModel');

// Get list of activities
router.get('/', async (req, res) => {
    const activitiesList = await activitiesModel.getActivitiesList();
    res.json(activitiesList).status(200);
})

// Get activity details page
router.get('/:activity_id', async (req, res) => {
    const { activity_id } = req.params;
    const { activityData, notesData, hoursData } = await activitiesModel.getActivityInfo(activity_id);
    const activityComposite = {
        ...activityData,
        notes: notesData,
        hours: hoursData
    };

    res.json(activityComposite).status(200);
});

// Post new activity
router.post('/addActivity', async (req, res) => {
    const { title, details, is_billable, user_sub } = req.body;
    
    const response = await activitiesModel.addActivity(title, details, is_billable, user_sub);
    
    if (response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
})

// Post a change to 'is_complete'
router.post('/modifyIsComplete', async (req, res) => {
    const { boolean, activity_id } = req.body;

    const response = await activitiesModel.modifyIsComplete(boolean, activity_id);
    if (response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
})

// Post a change to 'is_billable'
router.post('/modifyIsBillable', async (req, res) => {
    const { boolean, activity_id } = req.body;

    const response = await activitiesModel.modifyIsBillable(boolean, activity_id);
    if (response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
})

// Post a change to 'is_favorite'
router.post('/modifyIsFavorite', async (req, res) => {
    const { boolean, activity_id } = req.body;

    const response = await activitiesModel.modifyIsFavorite(boolean, activity_id);
    if (response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
})

// Post a new note to an activity
router.post('/addNote', async (req, res) => {
    const { note_entry, activity_id } = req.body;

    const response = await activitiesModel.addNote(note_entry, activity_id);

    if (response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
})

// Post a new hours entry to an activity
router.post('/addHours', async (req, res) => {
    const { hours_entry, hours_description, activity_id } = req.body;

    const response = await activitiesModel.addHours(hours_entry, hours_description, activity_id);

    if (response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
})

// Post - delete a note
router.post('/deleteNote', async (req, res) => {
    const { note_id } = req.body;

    const response = await activitiesModel.deleteNote(note_id);

    if (response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
})

// Post - delete an hours entry
router.post('/deleteHours', async (req, res) => {
    const { hours_id } = req.body;

    const response = await activitiesModel.deleteHours(hours_id);

    if (response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
})

// Post - delete activity
router.post('/deleteActivity', async (req, res) => {
    const { activity_id } = req.body;
    const { activityDeleteResponse } = await activitiesModel.deleteActivity(activity_id);

    if (activityDeleteResponse.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
})

module.exports = router;