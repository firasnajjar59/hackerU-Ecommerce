/** @format */

exports.createDocumant = Model => async (req, res) => {
  try {
    let doc = new Model(req.body);
    doc = await doc.save();
    res.json({ doc });
  } catch (error) {
    res.json({ error });
  }
};
exports.getAllDocumants = Model => async (req, res) => {
  try {
    const doc = await Model.find();
    res.json({ result: doc.length, doc });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
exports.getAllDocumantsByID = (Model,key) => async (req, res) => {
  try {
    let filterOption={}
    filterOption[key]=req.params.id
    const doc = await Model.find(filterOption);
    res.json({ result: doc.length, doc });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
exports.getDocumantByID = Model => async (req, res) => {
  try {
    const doc = await Model.findById(req.params.id);
    res.json({ doc });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
exports.deleteDocumant = Model => async (req, res) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    res.json({ doc });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
