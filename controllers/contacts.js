const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  /* 
    #swagger.description = "Retrieve all contacts in database"
  */
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  const resultArray = await result.toArray();

  if (resultArray.length < 1) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send({ message: "Could not find any contacts." });
  }

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(resultArray);
};

const getSingle = async (req, res) => {
  /* 
    #swagger.description = "Retrieve single contact by id"
  */
  const contactId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDatabase().db().collection("contacts").find({ _id: contactId });
    result.toArray().then((contact) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contact[0]);
    });
  } catch (err) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send({ message: "Could not find Contact Id. " + err });
  }
};

const create = async (req, res) => {
  /* 
    #swagger.description = "Create a contact"
  */
  try {
    const result = await mongodb.getDatabase().db().collection("contacts").insertOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    });
    res.setHeader("Content-Type", "application/json");
    res.send({ contact_id: result.insertedId });
  } catch (err) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ message: "Error: Could not create contact. " + err });
  }
};

const update = async (req, res) => {
  /* 
    #swagger.description = "Update a contact by id"
  */
  const contactId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .updateOne(
        { _id: contactId },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
          }
        }
      );

    if (result.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send({ message: `Updated ${req.params.id} succesfully` });
    }
  } catch (err) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ message: "Error: Could not update contact. " + err });
  }
};

const deleteContact = async (req, res) => {
  /* 
    #swagger.description = "Delete a contact by id"
  */
  const contactId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (result.acknowledged) {
      res.setHeader("Content-Type", "appliaction/json");
      res.status(200).send({ message: `${req.params.id} deleted succesfully` });
    }
  } catch (err) {
    res.setHeader("Content-Type", "appliaction/json");
    res.status(500).send({ message: "Error: Could not delete contact. " + err });
  }
};

module.exports = { getAll, getSingle, create, update, deleteContact };
