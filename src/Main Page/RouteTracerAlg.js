import React, { useState, useEffect } from 'react';
import {getCurrentTime} from "../Components/CurrentTime"

const apiKey = "AIzaSyD9A7JIIfaiufTfkIDsG2bwKpxG7V1Vzo4";
function sortMatrixByArray(matrix, sortArrayIndex) {
    const indices = matrix[sortArrayIndex].map((_, index) => index);
  
    // Sort the indices based on the values in the specified array
    indices.sort((a, b) => matrix[sortArrayIndex][b] - matrix[sortArrayIndex][a]);
  
    // Rearrange the rows of the matrix based on the sorted indices

    const sortedMatrix = matrix.map(row => indices.map(index => row[index]));
  
    return sortedMatrix;
}

function preProcessing(valuesArray) {

    for(let counter=0; counter<valuesArray[0].length; counter++){

        if(valuesArray[0][counter] === "" || isNaN(valuesArray[1][counter][0]) || isNaN(valuesArray[1][counter][1])){

            valuesArray[0].splice(counter, 1);
            valuesArray[1].splice(counter, 1);
            valuesArray[2].splice(counter, 1);

            counter--;
        }
    }

    return valuesArray;
}

function getDataByApi(origin, destination){

    fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                const distance = data.routes[0].legs[0].distance.text;
                console.log('Distance:', distance);
            } else {
                console.error('Error:', data.status);
            }
        })
        .catch(error => {
            console.error('Error fetching directions:', error);
        });

}

function RouteTracerAlg(valuesArray) {

    valuesArray = preProcessing(valuesArray);

    const currentTime = getCurrentTime();
    const currentTimeTogether = currentTime[0]*60 + currentTime[1];

    for(let counter=0; counter<valuesArray[0].length; counter++){

        const timeDeliveryTogether = valuesArray[1][counter][0]*60 + valuesArray[1][counter][1];

        if(currentTimeTogether < timeDeliveryTogether){

            valuesArray[2][counter] = (currentTimeTogether - timeDeliveryTogether)*5;

        } else {

            valuesArray[2][counter] = (currentTimeTogether - timeDeliveryTogether)*10;
        }
    }

    valuesArray = sortMatrixByArray(valuesArray, 2);

    return valuesArray;
}

export {RouteTracerAlg};