const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  /* 
    #swagger.description = "Retrieve all contacts in database"
  */
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  /* 
    #swagger.description = "Retrieve single contact by id"
  */
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection("contacts").find({ _id: contactId });
  result.toArray().then((contact) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact[0]);
  });
};

const create = async (req, res) => {
  /* 
    #swagger.description = "Create a contact"
  */
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.favoriteColor ||
    !req.body.birthday
  ) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

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
    res.status(500).send(err);
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
    res.status(500).send(err);
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
      res.status(200).send({ message: `${req.params.id} deleted succesfully` });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getAll, getSingle, create, update, deleteContact };
