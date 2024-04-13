const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //this is important to read body contents in the http server
app.use(bodyParser.json()); //this lets us catch body values in the backend

// sending a get request

app.get("/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 49.99,
      imageUrl: "https://via.placeholder.com/150",
      impressions: Math.floor(Math.random() * 10000) + 1, // Random impressions between 1 and 10000
      clicks: Math.floor(Math.random() * 100), // Random clicks between 1 and 100
    },
    {
      id: 2,
      name: "Running Shoes",
      category: "Sports",
      price: 79.99,
      imageUrl: "https://via.placeholder.com/150",
      impressions: Math.floor(Math.random() * 10000) + 1,
      clicks: Math.floor(Math.random() * 100),
    },
    // ... repeat for 48 more products
    {
      id: 50,
      name: "Coffee Maker",
      category: "Home",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/150",
      impressions: Math.floor(Math.random() * 10000) + 1,
      clicks: Math.floor(Math.random() * 100),
    },
  ]; //lets assume this data is comming straight from out DataBase
  res.status(200).send(products); //status along with it(200==>all okay)
});

//difference between route?id=2(this is query parameter) and route/2(this is route parameters which can be used in the client side as dynamic routes)
//#1) route?id=2
app.get('/bestSellings',(req,res)=>{
const stringsQueries = req.query.id;
console.log(`from ? wala part ${stringsQueries}`)

res.send("succeess")
})


//#2) route/2
app.get("/products/:id", (req, res) => {
  const id = req.params.id; //catches the url params!
  // console.log(id)
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 49.99,
      imageUrl: "https://via.placeholder.com/150",
      impressions: Math.floor(Math.random() * 10000) + 1, // Random impressions between 1 and 10000
      clicks: Math.floor(Math.random() * 100), // Random clicks between 1 and 100
    },
    {
      id: 49,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 49.99,
      imageUrl: "https://via.placeholder.com/150",
      impressions: Math.floor(Math.random() * 10000) + 1, // Random impressions between 1 and 10000
      clicks: Math.floor(Math.random() * 100), // Random clicks between 1 and 100
    },
    {
      id: 2,
      name: "Running Shoes",
      category: "Sports",
      price: 79.99,
      imageUrl: "https://via.placeholder.com/150",
      impressions: Math.floor(Math.random() * 10000) + 1,
      clicks: Math.floor(Math.random() * 100),
    },
    {
      id: 50,
      name: "Coffee Maker",
      category: "Home",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/150",
      impressions: Math.floor(Math.random() * 10000) + 1,
      clicks: Math.floor(Math.random() * 100),
    },
  ];
  const filteredProduct = products.filter((prod) => prod.id == `${id}`); //for now we are filtering here in the http server but usually what we do is get already filtered product from the DataBase (for eg:in SQL==> select * from products where productsId=`id`)
  res.status(200).send(filteredProduct);
});

// sending a posst request

app.post("/signup", (req, res) => {
  console.log(req.headers); //this catches the headers
  console.log(req.body); // this catches the bodyy (For now we are sending body via postman)

  //email, password, etc validiation is done here and sends to db if every thing is correct else send a resposne to client that the email or password doesnt meets the criteria
  //{email==correct?status(403):status(403)} //simple analogy

  res.status(200).send({ messege: "Account created succesfully" });
  //this gives response back to the client with a status code is considered as an industry standard
});

app.listen(3000, () => {}); //this server is listening in port 3000 (we can chnage it if we want)
