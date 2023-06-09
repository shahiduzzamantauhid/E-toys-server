const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eaxagba.mongodb.net/?retryWrites=true&w=majority`;
// respond with "hello world" when a GET request is made to the homepage



app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('hello Tauhid')
})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const toyCollection = client.db("etoys").collection("toymarket_etoys");

























































    

    app.get('/singleproduct/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const toy = await toyCollection.findOne(query);
      res.send(toy)
    })

    app.get('/toys/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const option = {
        sort: { sellingPrice: 1 }
      };
      const toys = await toyCollection.find(query, option).toArray();
      res.send(toys)
    })
    app.get('/toy/:category', async (req, res) => {
      const category = req.params.category;
      const query = { category: category };
      const toys = await toyCollection.find(query).toArray();
      res.send(toys)
    })

    app.delete('/toys/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toyCollection.deleteOne(query);
      res.send(result)
    })
    //for data update
    app.put('/toys/:id', async (req, res) => {
      const id = req.params.id;

      const updatedProduct = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          toyname: updatedProduct.toyname,
          sellingPrice: updatedProduct.sellingPrice,
          stock: updatedProduct.stock,
          description: updatedProduct.description,
          image: updatedProduct.image,
          category: updatedProduct.category
        },
      };
      const result = await toyCollection.updateOne(filter, updateDoc, options);
      res.send(result)
    })



  










    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


  } finally {
    // // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})  