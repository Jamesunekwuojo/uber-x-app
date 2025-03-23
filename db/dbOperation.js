import Cops from "./dataModel.js";
import Request from "./dbModel.js";

export const fetchNearestCops =(coordinates, maxDistance) => {
    return Cops.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coordinates
                },
                $maxDistance: maxDistance
            }
        }
    })
    .exec()
    .catch(error => {
        console.log(error);
     
    });
}


export const fetchCopDetails = (userId) => {
    return Cops.findOne({
        userId:userId
    }, {
        copId:1,
        displayName:1,
        phoneNumber:1,
        location:1
    })
    .exec()
    .catch(error => {
        console.log(error);
    });
}

export const saveRequest = (requestId, requestTime, location, civilianId, status) => {
    const request = new Request({
        "_id": requestId,
        requestTime: requestTime,
        location: location,
        civilianId: civilianId,
        status: status
    });

    return request.save()
    .catch(error => {
        console.log(error);
    });
 
}


export const updateRequest =(issueId, copId, status) =>{
    return Request.findOneAndUpdate({
        "_id": issueId
    }, {
        status: status,
        copId: copId
    }).catch(error => {
        console.log(error);
    });
}




