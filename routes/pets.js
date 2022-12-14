const express = require("express");
const xss = require("xss");
const { pets } = require("../data");
const { checkString, validValue, checkImage } = require("../validation");

const router = express.Router();

router.route("/match").post(async (req, res) => {
  const result = await pets.makeMatch();

  res.send(result);
});

router
  .route("/lost")
  .get(async (req, res) => {
    let sessionUser = xss(req.session.user) ? req.session.user : false;
    res.render("pets/lost", {
      page: { title: "PET LOST" },
      cookie: sessionUser,
    });
  })
  .post(async (req, res) => {
    try {
      let animal = validValue(xss(req.body.animalInput), "animal");
      let bodyType = validValue(xss(req.body.bodyTypeInput), "body type");
      let breedType = validValue(xss(req.body.breedInput), "breed type");
      let color = validValue(xss(req.body.colorInput), "color");
      let colar = validValue(xss(req.body.colarInput), "colar");
      let earType = validValue(xss(req.body.earTypeInput), "ear type");
      let gender = validValue(xss(req.body.genderInput), "gender");
      let hairType = validValue(xss(req.body.hairTypeInput), "hair type");
      let height = validValue(xss(req.body.heightInput), "height");
      // let imageInput = checkImage(xss(req.files?.imageInput));

      animal = checkString(animal, "animal");
      bodyType = checkString(bodyType, "body type");
      breedType = checkString(breedType, "breed type");
      color = checkString(color, "color");
      colar = checkString(colar, "colar");
      earType = checkString(earType, "ear type");
      gender = checkString(gender, "gender");
      hairType = checkString(hairType, "hair type");
      height = checkString(height, "height");
      // imageInput = imageInput.data;

      const lostPet = {
        animal: animal,
        gender: gender,
        color: color,
        colar: colar,
        height: height,
        bodyType: bodyType,
        breedType: breedType,
        hairType: hairType,
        earType: earType,
      };

      const result = await pets.createLostPet(lostPet);

      if (result.insertedPet) {
        res.redirect("/live");
      }
    } catch (error) {
      let sessionUser = xss(req.session.user) ? req.session.user : false;
      res.status(error.status).render("pets/lost", {
        ...body,
        error: error.msg,
        page: { title: "PET LOST" },
        cookie: sessionUser,
      });
    }
  });

router
  .route("/found")
  .get(async (req, res) => {
    let sessionUser = xss(req.session.user) ? req.session.user : false;
    res.render("pets/found", {
      page: { title: "PET FOUND" },
      cookie: sessionUser,
    });
  })
  .post(async (req, res) => {
    let body = xss(req.body);

    try {
      let name = validValue(req.body.nameInput, "name");
      let email = validValue(req.body.emailInput, "email");
      let animal = validValue(req.body.animalInput, "animal");
      let bodyType = validValue(req.body.bodyTypeInput, "body type");
      let breedType = validValue(req.body.breedInput, "breed type");
      let color = validValue(req.body.colorInput, "color");
      let colar = validValue(req.body.colarInput, "colar");
      let earType = validValue(req.body.earTypeInput, "ear type");
      let gender = validValue(req.body.genderInput, "gender");
      let hairType = validValue(req.body.hairTypeInput, "hair type");
      let height = validValue(req.body.heightInput, "height");

      let imageInput;
      if (xss(req.files)) {
        imageInput = checkImage(xss(req.files.imageInput));
        imageInput = imageInput.data;
      }

      name = checkString(req.body.nameInput, "name");
      email = checkString(req.body.emailInput, "email");
      animal = checkString(req.body.animalInput, "animal");
      bodyType = checkString(req.body.bodyTypeInput, "body type");
      breedType = checkString(req.body.breedInput, "breed type");
      color = checkString(req.body.colorInput, "color");
      colar = checkString(req.body.colarInput, "colar");
      earType = checkString(req.body.earTypeInput, "ear type");
      gender = checkString(req.body.genderInput, "gender");
      hairType = checkString(req.body.hairTypeInput, "hair type");
      height = checkString(req.body.heightInput, "height");

      const foundPet = {
        name: name,
        email: email,
        animal: animal,
        gender: gender,
        color: color,
        colar: colar,
        height: height,
        bodyType: bodyType,
        breedType: breedType,
        hairType: hairType,
        earType: earType,
      };

      const result = await pets.createFoundPet(foundPet);

      if (result.insertedPet) {
        res.redirect("/live");
      }
    } catch (error) {
      let sessionUser = xss(req.session.user) ? req.session.user : false;
      res.status(error.status).render("pets/found", {
        ...body,
        error: error.msg,
        page: { title: "PET FOUND" },
        cookie: sessionUser,
      });
    }
  });

module.exports = router;
