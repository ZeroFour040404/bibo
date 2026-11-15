import {Router} from 'express';
import * as taskService from '../services/taskService.js';

const router = Router();

router.get('/:familyId', async (req, res, next) => { //get dashboard data for a certain family 
    try {
        const dashboard = taskService.getDashboard(req.params.familyId);
        res.json(dashboard); // return dashboard data as JSON
    } catch (error) {
        next(error);
    }
});

router.post('/:familyId', (req, res, next) => {
    try {
        const task = taskService.createTask(req.params.familyID, req.body);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
});

router.post('/:taskId/start', (req, res, next) => {
    try {
        const start = taskService.startTask(req.params.taskId);
        res.json(start);
    } catch (error) {
        next(error);
    }
});

router.post('/:taskId/complete', (req, res, next) => {
    try {
        const complete = taskService.completeTask(req.params.taskId, req.body.photoFile);
        res.json(complete);
    } catch (error) {
        next (error);
    }
});

router.post('/:taskId/review', (req, res, next) => {
    try{
    const review = taskService.reviewTask(req.params.taskId, req.body.approved, req.body.rejectNote);
    res.json(review);
    } catch (error) {
        next (error);
    }
});

export {router as taskRoutes};