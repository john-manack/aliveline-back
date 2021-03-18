'use strict';

const express = require('express'),
    router = express.Router(),
    activitiesModel = require('../models/activitiesModel');

// Get list of activities
router.get('/', async (req, res) => {
    // the constant below is a placeholder
    const user_id = 1;

    const activitiesList = await activitiesModel.getActivitiesList(user_id);

    res.json(activitiesList).status(200);
})

// Get activity details page
router.get('/:activity_id', async (req, res) => {
    const { activity_id } = req.params;
    // the constant below is a placeholder
    const user_id = 1;

    const { activityData, notesData, hoursData } = await activitiesModel.getActivityInfo(activity_id);

    const activityComposite = {
        ...activityData,
        notes: notesData,
        hours: hoursData
    };

    res.json(activityComposite).status(200);
});

// Post new activity (tested and functioning)
router.post('/add', async (req, res) => {
    const { title, details, is_billable } = req.params;
    // the constant below is a placeholder
    const user_id = 1;

    const response = await activitiesModel.addActivity(title, details, is_billable, user_id);
    
    if (response.rowCount >= 1) {
        res.redirect('back')
    } else {
        res.sendStatus(500);
    }
})

// Post a change to 'is_complete' (tested and functioning)
router.post('/modifyIsComplete', async (req, res) => {
    const { boolean, activity_id } = req.body;

    const response = await activitiesModel.modifyIsComplete(boolean, activity_id);
    if (response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
})

// Post a change to 'is_billable' (tested and functioning)
router.post('/modifyIsBillable', async (req, res) => {
    const { boolean, activity_id } = req.body;

    const response = await activitiesModel.modifyIsBillable(boolean, activity_id);
    if (response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
})

module.exports = router;