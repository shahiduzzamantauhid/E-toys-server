const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('hello Tauhid')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})  
