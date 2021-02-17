//jshint esversion: 6

//const express = require('express');
//const app = express();
//const port = 3000;

//app.get('/', (req, res)) {
  const fs = require('fs');
   const csv = fs.readFileSync("csvFile.csv");

    //split csv File content
    let array = csv.toString().split("\n\r");
    let result = [];
    let obj = {};
    //extract the headers
    let headers = array[0].split(",");
    for (i = 1; i < array.length-1; i++) {
      //extract csv file body
     let csvBody = array[i];
       let str = "";
      let flag = 0;
      //loop through all the characters in the csv body
      for (let charac of csvBody) {
        //this is to check if the commas that it will be split with are inside a quote
        if ((charac === '"') && (flag === 0)) {
          flag = 1;
        } else if ((charac === '"') && (flag === 1)) {
          flag = 0;
        }
        //change all commas outside a quote to |
        if ((charac === ",") && (flag === 0)) {
          charac = "|";
        }
        //put all the characters inside a single variable
        if (charac !== '"') {
          str += charac;
        }
      }
      //split the str variable accoording to the "|" the replaced the commeas outside a quote
      //this is also the property part of the onject
      let properties = str.split("|");

      for (k = 0; k < headers.length; k++) {
        obj[headers[k]] = properties[k];
      }
      result.push(obj);
    }
    let json = JSON.stringify(result);
    console.log(result);
//    res.send(json);
//}
