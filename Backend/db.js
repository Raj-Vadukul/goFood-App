const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://rajkumarvadukul:PAom2Xxuz5mRuLg4@cluster0.inpbcbn.mongodb.net/goFood?retryWrites=true&w=majority"

const ConnectTOMongo = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("Connected to MongoDB Successfully");
            const fetchedData = await mongoose.connection.db.collection("Food_Items");
            fetchedData.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("FoodCategory");
                foodCategory.find({}).toArray(function(err,CatData){
                    if (err) console.log(err);
                    else{
                        global.Food_Items = data;
                        global.FoodCategory = CatData;
                    }
                })
                // if (err) console.log(err);
                // else {
                //     global.Food_Items = data;
                // } 
            })
        }
    });
}
module.exports = ConnectTOMongo;