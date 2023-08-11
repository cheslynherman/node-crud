const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// serve static files from the "public" folder

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// sample data (you cn import it from db.json)
let items = [
    {
        id: 1,
        name: "Item 1"
    },
    {
        id: 2,
        name: "Item 2"
    },
    {
        id: 3,
        name: "Item 3"
    }
];

// read all items
app.get("/api/items/:id", (req, res) => {
    res.json(items);
});

// read single item 
app.get("/api/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
});

// create a new item 
app.post("/api/items", (req, res) => {
    const newItem = req.body;
    newItem.id = items.length + 1;
    items.push(newItem);

    res.status(201).json(newItem);
});

// update an item
app.put("/api/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Item not found" });
    }

    items[index] = { ...items[index], ...updatedItem };
    res.json(items[index]);
})

// delete an item
app.delete("/api/items/:id", (req, res) => {
    const id = parseInt (req.params.id);
    const index = items.findIndex(item => item.id === id);

    if (index === -1 ) {
        return res.status (404).json({message: "Item not found"});

    }

    const deletedItem = items.splice(index, 1);
    res.json(deletedItem[0]);

});

app.listen (port, () => {
    console.log (`Server is running on port ${port}`);
});

