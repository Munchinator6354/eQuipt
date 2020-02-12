const mongoose = require("mongoose");
const db = require("../models");
const bcrypt = require("bcryptjs");


mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/eQuiptDB"
  );

  var inventorySeed = [
    {name: 'Apothecary Kit', description: 'Required to craft Apothecary items.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://i.pinimg.com/originals/45/d1/13/45d113961f591f6a6e45a2a1aadcc941.png' },
    {name: 'Artificer Kit', description: 'Required to craft Artificer items.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://pm1.narvii.com/6457/59565760cdaf23555d37967d2c678878acc2fe40_00.jpg' },
    {name: 'Blacksmith Kit', description: 'Required to craft Blacksmith items.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://94048611b143fd70fef1-869d0855e82ba6cacc3f6338625813f3.ssl.cf1.rackcdn.com/10-Angelo_03_25__0072v3.jpg' },
    {name: 'Bowyer Kit', description: 'Required to craft Bowyer items.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://images-na.ssl-images-amazon.com/images/I/51ZzDKC94OL._AC_SX425_.jpg' },
    {name: 'Gunsmith Kit', description: 'Required to craft Gunsmith items.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://www.spanish-swords.com/2452-large_default/3-guns-gun-bluing-augsburg-1775.jpg' },
    {name: 'Chirurgeon Kit', description: 'Required to use certain skills, such as Mend.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://c8.alamy.com/comp/P04148/english-illustration-from-a-course-of-chirurgical-operations-demonstrated-in-the-royal-garden-at-paris-by-monsieur-dionis-chief-chirurgeon-to-the-late-dauphiness-and-to-the-present-dutchess-of-burgundy-translated-from-the-paris-edition-originally-captioned-suite-de-accouchements-74-a-course-of-chirurgical-operations-demonstrated-in-the-royal-garden-at-paris-fleuron-n003462-11-P04148.jpg' },
    {name: 'Cloak', description: 'Aids in the spreading of rumors.', itemlevel: '1' , marketprice: '18' , quantity: '0', link:'https://images-na.ssl-images-amazon.com/images/I/51q6OZlfEgL._UX679_.jpg' },
    {name: 'Fine Clothing', description: 'Aids in the acquisition of rumors.', itemlevel: '1' , marketprice: '18' , quantity: '0', link:'https://lh3.googleusercontent.com/proxy/5glgEWF8gn0ewV7fp0jEgvD7h_nsuJijyUc3qfwFZkeQWO0cXVlHsLkfoqd-thznpYVRM6U7ZH0WpKaSuGioAAkEfFUuaHU2LFGMZQVJutEzjPdDfOwtlw' },
    {name: "Duelist's Gloves", description: 'Improves ones ability to maintain grip on a weapon.', itemlevel: '1' , marketprice: '20' , quantity: '0', link:'https://vignette.wikia.nocookie.net/play-rust/images/f/f9/Duelist_Gloves_icon.png/revision/latest?cb=20161207182201' },
    {name: 'Stalwart Boots', description: 'Improves ones ability to maintain stance after a heavy blow.', itemlevel: '1' , marketprice: '20' , quantity: '0', link:'https://lotro-wiki.com/images/thumb/6/64/Stalwart_Boots_of_the_Abyss.jpg/359px-Stalwart_Boots_of_the_Abyss.jpg' },
    {name: 'Low Quality Lock', description: 'A lock for a door or chest.', itemlevel: '1' , marketprice: '12' , quantity: '0', link:'https://i.ebayimg.com/images/g/oW0AAOSwHglcWIRB/s-l400.jpg' },
    {name: 'Craftsmanship Tools', description: 'Increases the efficiency of crafting.', itemlevel: '1' , marketprice: '24' , quantity: '0', link:'https://previews.123rf.com/images/stokkete/stokkete1709/stokkete170900071/85506479-old-used-woodworking-tools-on-a-vintage-workbench-carpentry-craftsmanship-and-handwork-concept.jpg' },
    {name: 'Basic Trap', description: 'A low quality trap.', itemlevel: '1' , marketprice: '12' , quantity: '0', link:'https://sheilaclapkin345.files.wordpress.com/2012/02/img_0057.jpg' },
    {name: 'Lockpicking Kit', description: 'Required to open locks without the corresponding key.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://i.pinimg.com/originals/b6/b0/93/b6b093b3d3a0ea550788188599b6e13a.jpg' },
    {name: 'Iron Shield', description: 'An iron shield.', itemlevel: '0' , marketprice: '8' , quantity: '0', link:'https://lh3.googleusercontent.com/proxy/ceMjtid6xtXeAz2hp6YVxos2-P-NKBxtqoquEsE8PFl4zyXnMYfCd54h6L8Q2RrhKOEWk7JYeQewQG4v5GbBL_zeuQAUdg' },
    {name: 'Leather Armor', description: 'A set of leather armor.', itemlevel: '0' , marketprice: '7' , quantity: '0', link:'https://i.pinimg.com/originals/2a/d8/f3/2ad8f32e4f3a6f77f8ba12d22faa4c33.jpg' },
    {name: 'Iron Chain Shirt', description: 'An iron chain shirt.', itemlevel: '0' , marketprice: '10' , quantity: '0', link:'https://cdn.britannica.com/59/13059-004-8DC4F03B/coat-Turkish-chain-mail.jpg' },
    {name: 'Iron Coat of Plates', description: 'An iron coat of plates.', itemlevel: '0' , marketprice: '12' , quantity: '0', link:'https://nadler.us/armour/COP/COP_JAN_28_2013/COP_inside.jpg' },
    {name: 'Iron Small Weapon', description: 'An iron small weapon, or throwing weapon.', itemlevel: '0' , marketprice: '7' , quantity: '0', link:'https://art.ngfiles.com/images/545000/545954_mike-watson_fantasy-weapons.jpg?f1504867448' },
    {name: 'Iron Medium Weapon', description: 'An iron weapon that can be held in one hand, but is larger than a small weapon.', itemlevel: '0' , marketprice: '9' , quantity: '0', link:'https://miro.medium.com/max/1200/1*2UrKXR8aN2jFoq94ZNBqnQ.jpeg' },
    {name: 'Iron Large Weapon', description: 'An iron weapon to be wielded with two hands.', itemlevel: '0' , marketprice: '9' , quantity: '0', link:'https://www.medievalcollectibles.com/wp-content/uploads/2019/04/600074.png' },
    {name: 'Hardened Iron Shield', description: 'A hardened iron shield.', itemlevel: '1' , marketprice: '14' , quantity: '0', link:'https://atlas.wiki.fextralife.com/file/Atlas/heavy_shield_armor_atlas_mmo_wiki_guide.png' },
    {name: 'Hardened Leather Armor', description: 'A suit of hardened leather armor.', itemlevel: '1' , marketprice: '14' , quantity: '0', link:'https://vignette.wikia.nocookie.net/emerald-isles/images/c/c3/Simple-Studded-Leather-Armour.png/revision/latest?cb=20180506015511' },
    {name: 'Hardened Iron Chain Shirt', description: 'A hardened iron chain shirt.', itemlevel: '1' , marketprice: '15' , quantity: '0', link:'https://i.pinimg.com/originals/1d/d4/87/1dd487e28dd32a716fcc23f1c7641d8b.jpg' },
    {name: 'Hardened Iron Coat of Plates', description: 'A hardened iron coat of plates.', itemlevel: '1' , marketprice: '20' , quantity: '0', link:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Rustning%2C_Gustav_Vasa_-_Livrustkammaren_-_32921.tif/lossy-page1-220px-Rustning%2C_Gustav_Vasa_-_Livrustkammaren_-_32921.tif.jpg' },
    {name: 'Hardened Iron Platemail', description: 'A hardened iron platemail.', itemlevel: '1' , marketprice: '22' , quantity: '0', link:'https://i.pinimg.com/236x/70/e7/f1/70e7f14edc520055b4878a8cd57c542a--knight-chess-knight-armor.jpg' },
    {name: 'Hardened Iron Small Weapon', description: 'A hardened iron small weapon, or throwing weapon.', itemlevel: '1' , marketprice: '13' , quantity: '0', link:'https://p1.gunbroker.com/pics/831421000/831421320/pix537210520.jpg' },
    {name: 'Hardened Iron Medium Weapon', description: 'A hardened iron weapon that can be held in one hand but is larger than a small weapon.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://irongatearmory.com/wp-content/uploads/2019/02/XH2044N-Short-Viking-Axe.jpg' },
    {name: 'Hardened Iron Large Weapons', description: 'A hardened iron weapon to be wielded with two hands.', itemlevel: '1' , marketprice: '20' , quantity: '0', link:'https://cdn3.volusion.com/jkxpn.sognc/v/vspfiles/photos/Axe.Bardiche-3.jpg?v-cache=1510310723' },
    {name: 'Patch Kit', description: 'A kit of rivets, metal plates, and various leather bits to temporarily restore the usefulness of damaged armor.', itemlevel: '1' , marketprice: '4' , quantity: '0', link:'https://steel-mastery.com/image/catalog/PhotosForSharingLinks/plate-armour-maintenance-by-steel-mastery.jpg' },
    {name: 'Arrows', description: 'A set of 10 arrows.', itemlevel: '1' , marketprice: '8' , quantity: '0', link:'https://s-media-cache-ak0.pinimg.com/736x/f1/02/42/f10242b865cec73f365f6f24e388ef4f.jpg' },
    {name: 'Bullets', description: 'A set of 3 bullets.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://cdn.shopify.com/s/files/1/0554/1957/products/medieval-japanese-bullets-oriental-product-faganarms_115.jpg?v=1533004243' },
    {name: 'Iron Ingot', description: 'A rough iron ingot.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://img1.exportersindia.com/product_images/bc-full/dir_165/4943853/iron-ingots-1499681944-3119246.jpeg' },
    {name: 'Cloth', description: 'A bolt of cloth.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://cdn11.bigcommerce.com/s-iut5ld55uy/images/stencil/500x659/products/30916/152372/IN7206BR__49385.1564501573.jpg?c=2' },
    {name: 'Refined Wood', description: 'A bit of refined wood.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://images-na.ssl-images-amazon.com/images/I/91QYFRbexNL._AC_SX466_.jpg' },
    {name: 'Leather', description: 'A bit of leather.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://waterhouseleather.com/wp-content/uploads/2019/08/Kodiak-Old-West-Group-Main-Picture-1.jpg' },
    {name: 'Distilled Spirits', description: 'Distilled spirits which can be used as a base for many apothecarial substances.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://www.ancient-origins.net/sites/default/files/styles/large/public/Monk-Cellarer-tasting-wine.jpg?itok=8_ZqvOWG' },
    {name: 'Bow', description: 'A basic longbow.', itemlevel: '0' , marketprice: '10' , quantity: '0', link:'https://static.turbosquid.com/Preview/001200/307/SC/3D-medieval-bow-model_Z.jpg' },
    {name: 'Pistol', description: 'A basic pistol.', itemlevel: '0' , marketprice: '30' , quantity: '0', link:'https://www.medievalcollectibles.com/wp-content/uploads/2019/04/ME-0170.png' },
    {name: 'Werewolf Tallow', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: 'N/A' , marketprice: '10' , quantity: '0', link:'https://vignette.wikia.nocookie.net/witcher/images/f/fa/Bestiary_Wolf.png/revision/latest/top-crop/width/360/height/450?cb=20071116211923' },
    {name: "Dragon's Eye", description: 'A common apothecary reagent acquired from a plant.', itemlevel: 'N/A' , marketprice: '0.5' , quantity: '0', link:'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/dragon-eye-aaron-spong.jpg' },
    {name: 'Mandrake', description: 'A common apothecary reagent acquired from a plant.', itemlevel: 'N/A' , marketprice: '0.5' , quantity: '0', link:'https://i0.wp.com/blog.strictlymedicinalseeds.com/wp-content/uploads/2019/03/Mandrake-Root.jpg?resize=352%2C431&ssl=1' },
    {name: 'Ghoul Venom', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: 'N/A' , marketprice: '10' , quantity: '0', link:'https://i.pinimg.com/originals/c1/14/fb/c114fb37c86bc6fa51d090df9c65bd0e.jpg' },
    {name: 'Grave Blood', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: 'N/A' , marketprice: '10' , quantity: '0', link:'https://bloodborne.wiki.fextralife.com/file/Bloodborne/blood_vial.jpg' },
    {name: 'Vampire Blood', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: 'N/A' , marketprice: '10' , quantity: '0', link:'https://img.huffingtonpost.com/asset/5bad75332200005700daaf3d.jpeg?ops=scalefit_630_noupscale' },
    {name: "Widow's Petal", description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://image.shutterstock.com/image-photo/four-red-petal-flower-kalanchoe-260nw-739244008.jpg' },
    {name: 'Thornwood Fern', description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://upload.wikimedia.org/wikipedia/commons/7/71/Athyrium_filix-femina.jpg' },
    {name: 'Tarkathi Poppy', description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://cdn.shopify.com/s/files/1/1186/5156/products/Red-Poppy_1024x1024.jpeg?v=1456914865' },
    {name: 'Crypt Moss', description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhO27vvTIVUJMBjrCHdwy9MSgQpCr0nxmVbdvmBiqGxdOBIRuZ' }
    ]

var userSeed = [
  {playername: "Bob", username: "Bob", password: "12345", charactername: "Bobert", email:"Bob@gmail.com", role:"Staff" },
  {playername: "Noelle", username: "noelley", password: "12344", charactername: "Noelle the Drained Druid", email:"Noelle@gmail.com", role:"Player" },
  {playername: "Ryan", username: "ryanguy", password: "12346", charactername: "Ryan the Narcoleptic Noble", email:"Ryan@gmail.com", role:"Player" },
  {playername: "Abe", username: "Abedude", password: "12347", charactername: "Abe the Weary Wizard", email:"Abe@gmail.com", role:"Player" },
  {playername: "Jessica", username: "Jessicagirl", password: "12348", charactername: "Jessica the Comical Cleric", email:"Jessica@gmail.com", role:"Player" }
]

var hashedUserSeed = []
function hashSeed(seed){
  for(i=0;i<seed.length;i++){
    hashedUserSeed.push({
      playername: seed[i].playername,
      username: seed[i].username,
      password: bcrypt.hashSync(seed[i].password, 10),
      charactername: seed[i].charactername,
      email: seed[i].email,
      role: seed[i].email
    })
  }
}

hashSeed(userSeed)

db.Inventory
.remove({})
.then(() => db.Inventory.collection.insertMany(inventorySeed))
.then(data => {
  console.log(data.result.n + " records inserted!");
  
})
.catch(err => {
  console.error(err);
  process.exit(1);
});

db.User
.remove({})
.then(() => db.User.collection.insertMany(hashedUserSeed))
.then(data => {
  console.log(data.result.n + " records inserted!");
  db.Inventory
  .find({name: /Iron/i})
  .then(function(dbModel){
     db.User
     .findOneAndUpdate({playername: "Bob"}, {$push: {inventory: dbModel}}, {new:true})
     .populate("inventory")
     .then(function(dbUser){
       console.log(dbUser);
       process.exit(0);
     })
    })
     .catch(function(err) {
      //     // If an error occurs, send it back to the client
          res.json(err);
        });  
      })
.catch(err => {
  console.error(err);
  process.exit(1);
});







// db.Inventory
// .findOne({name: 'Apothecary Kit'})
// .then(function(dbModel){
//    db.User
//    .findOneAndUpdate({playername: "Jessica"}, {$push: {inventory: dbModel._id}}, {new:true})
//    .then(function(dbUser){
//      console.log("HELLO");
//    })
    
//    })
// .then(data => {
//    console.log("Added Apothecary Kit to Jessica");
//   process.exit(0);
// })
// .catch(err => {
//   process.exit(1);
// }):