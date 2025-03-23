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

