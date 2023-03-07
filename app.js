const express = require('express');
const app = express();
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://andreevada9:DYnYDhvgn4vk7Dwe@movies.wqrnj4j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const objectId = require("mongodb").ObjectId;
const jsonParser = express.json();

app.use(express.static(path.join(__dirname, 'public')));

(async () => {
    try{
        await client.connect();
        app.locals.collection = client.db("Pets").collection("Dogs");
        await app.listen(8081,() =>{
            console.log('Server is ready.');
        });
    }
    catch(err){ return console.log(err);}
})();

app.get('/list', async(req, res) => {
    const collection = app.locals.collection;
    try{
        const result = await collection.find().toArray();
        if (result) res.json(result);
        else res.sendStatus(404);
    }
    catch (err){
        console.log(err);
        res.sendStatus(500);
    }
});

app.get("/list/:id", async(req, res) => {

    const collection = app.locals.collection;
    try{
        const id = new objectId(req.params.id);
        const dog = await collection.findOne({_id: id});
        if(dog) res.json(dog);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/delete',jsonParser, async (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const collection = app.locals.collection;
    try{
        const id = new objectId(req.body._id);
        const result = await collection.findOneAndDelete({_id:id});
        const dog = result.value;
        if(dog) res.json({"_id":id,"name": dog.name, "breed": dog.breed, "gender": dog.gender, "birthday": dog.birthday, "status":"deleted"});
        else res.sendStatus(404);
    }
    catch (err){
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/insert',jsonParser, async (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const collection = app.locals.collection;
    try{
        const name = req.body.name;
        const breed = req.body.breed;
        const gender = req.body.gender;
        const birthday = new Date(req.body.birthday);
        const dog = {name: name, breed: breed, gender: gender, birthday: birthday};
        try{
            const inserted = await collection.insertOne(dog);
            res.json({"_id": inserted.insertedId,"name": name, "breed": breed, "gender": gender, "birthday": birthday, "status": "inserted"});
        }
        catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }
    catch (err){
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/update',jsonParser, async (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const collection = app.locals.collection;
    try{
        const id = new objectId(req.body._id);
        const name = req.body.name;
        const breed = req.body.breed;
        const gender = req.body.gender;
        const birthday = new Date(req.body.birthday);
        const result = await collection.findOneAndUpdate({_id: id}, { $set: {name: name, breed: breed, gender: gender, birthday: birthday}},
            {returnDocument: "after" });
        const dog = result.value;
        if(dog) res.json({"_id":id,"name": dog.name, "breed": dog.breed, "gender": dog.gender, "birthday": dog.birthday, "status":"updated"});
        else res.sendStatus(404);
    }
    catch (err){
        console.log(err);
        res.sendStatus(500);
    }
});

process.on("SIGINT", async() => {
    await client.close();
    console.log("Server is down.");
    process.exit();
});