import express from "express";
import { fetchNearestCops } from "../db/dbOperation.js";

const router = express.Router();

router.get("/cops", async (req, res) => {

    console.log("Request received at /cops");


    /*
        extract the latitude and longitude info from the request query parameters.
        Then, fetch the nearest cops using MongoDB's geospatial queries and return it back to the client.
    */

    
    try {
        const latitude = Number(req.query.lat);
        const longitude = Number(req.query.lng);

        const nearestCops = await fetchNearestCops([longitude, latitude], 2000);

        res.status(200).json({message:"Cops fetched successfully", cops:nearestCops});

    } catch (error) {
        res
        .status(500)
        .json({message: "Error fetching nearest cops"});
    }
    
});


router.get('/civilian.html', (req, res) => {
    res.render('civilian.html', {
        userId: req.query.userId
    });
});

router.get('/cop.html', (req, res) => {
    res.render('cop.html', {
        userId: req.query.userId
    });
});


export default router;