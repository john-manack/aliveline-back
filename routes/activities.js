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

module.exports = router;