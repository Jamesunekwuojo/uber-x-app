import Cops from "./dataModel.js";

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


