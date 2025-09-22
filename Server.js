import express from "express";
import mongoose, { connect } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const URI = process.env.MONGODB_URI;
const app = express();

app.use(express.json());

app.use(cors());


/*mongoose.connect("mongodb://localhost:27017/quizdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully "))
.catch((err) => console.error("MongoDB connection error ", err));
*/
async function ConnectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI),{
            dbName:"quizDB",
            maxToolSize:80,
            serverSelectionTimeoutMS:5000
        }
    
    console.log("connected to mongodb atlas.");
    }catch(err){
        console.error("db connection error.",err.message);
        process.exit(1);
    }
}
ConnectDB();
const resultSchema = new mongoose.Schema({
    name: String,
    roll_no: String,
    subject: String,
    answers: [String] 
});


const Result = mongoose.model("Result", resultSchema);

app.post("/submit", async (req, res) => {
    try {
        const {name,roll_no,subject,answers} = req.body;
        const newResult=Result({name,roll_no,subject,answers});
        await newResult.save();
        res.json({message:"result saved successfully"});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


const PORT = 5000;
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${PORT}`);
});


