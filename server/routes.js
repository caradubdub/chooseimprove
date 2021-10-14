const express = require("express");
const airtableRouter = express.Router();


const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = new Airtable.base("appk8Vq73Nru1TXvz");

airtableRouter.post("/results", (req, res) => {
  let arr = [];
  //need to add async functionality to wait to collect results before populating
  base("Improve Exercises")
    .select({
      view: "Master View",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {
          let areas = record.get("Category");
          if (areas) {
            if (areas.includes(req.body.key)) {
              arr.push(record);
            }
          }
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          return res
            .statusMessage(400)
            .json({ err: "Airtable could not be reached" });
        } else {
          if (!arr.length)
            return res.statusMessage(200).json("there are no results");
          let idx = Math.floor(Math.random() * arr.length);

          return res.status(200).json(arr[idx]);
        }
      }
    );
});
module.exports = airtableRouter;
