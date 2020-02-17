const mongoose = require("mongoose");
const db = require("../models");
const bcrypt = require("bcryptjs");


mongoose.connect(
    process.env.MONGODB_URI ||
    // "mongodb://GenericUser:GenericPassword123@ds029658.mlab.com:29658/heroku_4xwdbn2k"
    "mongodb://localhost/eQuiptDB"
  );

  var inventorySeed = [
    {name: 'Apothecary Kit', description: 'Required to craft Apothecary items.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://i.pinimg.com/originals/45/d1/13/45d113961f591f6a6e45a2a1aadcc941.png' },
    {name: 'Artificer Kit', description: 'Required to craft Artificer items.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://vignette.wikia.nocookie.net/findle/images/6/6b/ArtificerPIC.PNG/revision/latest?cb=20190301024642' },
    {name: 'Blacksmith Kit', description: 'Required to craft Blacksmith items.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://vignette.wikia.nocookie.net/kingdom-come-deliverance/images/6/69/Kingdom_Come_-_Armour_kit.png/revision/latest/top-crop/width/360/height/360?cb=20180226192330' },
    {name: 'Bowyer Kit', description: 'Required to craft Bowyer items.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://f1.pngfuel.com/png/371/594/431/bow-and-arrow-archery-recurve-bow-crossbow-bowyer-drawing-yumi-english-longbow-png-clip-art.png' },
    {name: 'Gunsmith Kit', description: 'Required to craft Gunsmith items.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://blog.hornguild.org/wp-content/uploads/2015/12/1-toone-lathe-2.png' },
    {name: 'Chirurgeon Kit', description: 'Required to use certain skills, such as Mend.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://i.pinimg.com/originals/86/c2/8b/86c28b9633a2024b3690936528164063.png' },
    {name: 'Cloak', description: 'Aids in the spreading of rumors.', itemlevel: '1' , marketprice: '18' , quantity: '0', link:'https://vignette.wikia.nocookie.net/clubpenguin/images/5/57/Greenhoodedcloak.PNG/revision/latest/scale-to-width-down/340?cb=20140217164343' },
    {name: 'Fine Clothing', description: 'Aids in the acquisition of rumors.', itemlevel: '1' , marketprice: '18' , quantity: '0', link:'https://vignette.wikia.nocookie.net/elderscrolls/images/1/15/Radiant_Raiment_Fine_Clothes.png/revision/latest/top-crop/width/360/height/450?cb=20120206001325' },
    {name: "Duelist's Gloves", description: 'Improves ones ability to maintain grip on a weapon.', itemlevel: '1' , marketprice: '20' , quantity: '0', link:'https://vignette.wikia.nocookie.net/play-rust/images/f/f9/Duelist_Gloves_icon.png/revision/latest?cb=20161207182201' },
    {name: 'Stalwart Boots', description: 'Improves ones ability to maintain stance after a heavy blow.', itemlevel: '1' , marketprice: '20' , quantity: '0', link:'https://www.freepngimg.com/thumb/boots/34-combat-boots-png-image-thumb.png' },
    {name: 'Low Quality Lock', description: 'A lock for a door or chest.', itemlevel: '1' , marketprice: '12' , quantity: '0', link:'https://cubits.org/PlaypenGraphics/files/get/2013-01-07/Zanymuse/8519c0.png' },
    {name: 'Craftsmanship Tools', description: 'Increases the efficiency of crafting.', itemlevel: '1' , marketprice: '24' , quantity: '0', link:'https://webstockreview.net/images/clipart-ball-tool-15.png' },
    {name: 'Basic Trap', description: 'A low quality trap.', itemlevel: '1' , marketprice: '12' , quantity: '0', link:'https://gamepedia.cursecdn.com/ylands_gamepedia/thumb/9/92/Bear_Trap.png/250px-Bear_Trap.png?version=de4ad794e2f9a5785468524ca953bdb1' },
    {name: 'Lockpicking Kit', description: 'Required to open locks without the corresponding key.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://vignette.wikia.nocookie.net/bioshock/images/f/f7/BSI_Lockpicking_Kit_Model_Render.png/revision/latest/scale-to-width-down/340?cb=20160123135506' },
    {name: 'Iron Shield', description: 'An iron shield.', itemlevel: '0' , marketprice: '8' , quantity: '0', link:'https://vignette.wikia.nocookie.net/elderscrolls/images/d/d4/IronshieldMorrowind.png/revision/latest?cb=20160709151245' },
    {name: 'Leather Armor', description: 'A set of leather armor.', itemlevel: '0' , marketprice: '7' , quantity: '0', link:'https://images.squarespace-cdn.com/content/v1/59aa8bee197aea4ad67f52ae/1504388096180-GXQ5CU6U9P3MZLJMY9SZ/ke17ZwdGBToddI8pDm48kMFHsobaOCQT6BUfPDhHErlZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVEJg4aYXu8LbvyDOr2csRPU2eKenc2gw9phkBneUz-a1jqWIIaSPh2v08GbKqpiV54/Western-Armor_0011_padded.png?format=1000w' },
    {name: 'Iron Chain Shirt', description: 'An iron chain shirt.', itemlevel: '0' , marketprice: '10' , quantity: '0', link:'https://mcishop.azureedge.net/mciassets/w_9_0043177_john-riveted-steel-chainmail-hauberk_550.png' },
    {name: 'Iron Coat of Plates', description: 'An iron coat of plates.', itemlevel: '0' , marketprice: '12' , quantity: 15, link:'https://pngimg.com/uploads/armour/armour_PNG29.png' },
    {name: 'Iron Small Weapon', description: 'An iron small weapon, or throwing weapon.', itemlevel: '0' , marketprice: '7' , quantity: '0', link:'https://pngimg.com/uploads/dagger/dagger_PNG27.png' },
    {name: 'Iron Medium Weapon', description: 'An iron weapon that can be held in one hand, but is larger than a small weapon.', itemlevel: '0' , marketprice: '9' , quantity: '0', link:'https://vignette.wikia.nocookie.net/tradelands/images/c/ca/Short_Sword.png/revision/latest/top-crop/width/360/height/450?cb=20150607170729' },
    {name: 'Iron Large Weapon', description: 'An iron weapon to be wielded with two hands.', itemlevel: '0' , marketprice: '9' , quantity: '0', link:'https://i.pinimg.com/originals/f8/ff/b2/f8ffb2f59e05c78629c23463c78a2326.png' },
    {name: 'Hardened Iron Shield', description: 'A hardened iron shield.', itemlevel: '1' , marketprice: '14' , quantity: '0', link:'https://atlas.wiki.fextralife.com/file/Atlas/heavy_shield_armor_atlas_mmo_wiki_guide.png' },
    {name: 'Hardened Leather Armor', description: 'A suit of hardened leather armor.', itemlevel: '1' , marketprice: '14' , quantity: '0', link:'https://vignette.wikia.nocookie.net/emerald-isles/images/c/c3/Simple-Studded-Leather-Armour.png/revision/latest?cb=20180506015511' },
    {name: 'Hardened Iron Chain Shirt', description: 'A hardened iron chain shirt.', itemlevel: '1' , marketprice: '15' , quantity: '0', link:'https://gamepedia.cursecdn.com/pathofexile_gamepedia/6/6d/Full_Chainmail_inventory_icon.png' },
    {name: 'Hardened Iron Coat of Plates', description: 'A hardened iron coat of plates.', itemlevel: '1' , marketprice: '20' , quantity: '0', link:'https://vignette.wikia.nocookie.net/infinityblade/images/6/60/Steel_Plate_Armor.png/revision/latest/scale-to-width-down/340?cb=20131120211955' },
    {name: 'Hardened Iron Platemail', description: 'A hardened iron platemail.', itemlevel: '1' , marketprice: '22' , quantity: '0', link:'https://vignette.wikia.nocookie.net/bouldersandbarbarians/images/c/c2/Platemail.png/revision/latest/top-crop/width/360/height/450?cb=20181120154004' },
    {name: 'Hardened Iron Small Weapon', description: 'A hardened iron small weapon, or throwing weapon.', itemlevel: '1' , marketprice: '13' , quantity: '0', link:'https://pngriver.com/wp-content/uploads/2018/03/Download-Knife-PNG-Photo-For-Designing-Purpose.png' },
    {name: 'Hardened Iron Medium Weapon', description: 'A hardened iron weapon that can be held in one hand but is larger than a small weapon.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://db4sgowjqfwig.cloudfront.net/images/4072565/Shortsword__2.png' },
    {name: 'Hardened Iron Large Weapons', description: 'A hardened iron weapon to be wielded with two hands.', itemlevel: '1' , marketprice: '20' , quantity: '0', link:'https://img1.wikia.nocookie.net/__cb20110819054848/finalfantasy/images/archive/8/84/20110819064841!FFXI_Great_Sword_6A.png' },
    {name: 'Patch Kit', description: 'A kit of rivets, metal plates, and various leather bits to temporarily restore the usefulness of damaged armor.', itemlevel: '1' , marketprice: '4' , quantity: '0', link:'https://i.pinimg.com/originals/87/05/3d/87053da783afa9a9f31b11bb77de114e.png' },
    {name: 'Arrows', description: 'A set of 10 arrows.', itemlevel: '1' , marketprice: '8' , quantity: '0', link:'https://pngimg.com/uploads/arrow_bow/arrow_bow_PNG28.png' },
    {name: 'Bullets', description: 'A set of 3 bullets.', itemlevel: '1' , marketprice: '17' , quantity: '0', link:'https://gamepedia.cursecdn.com/arksurvivalevolved_gamepedia/8/88/Simple_Bullet.png' },
    {name: 'Iron Ingot', description: 'A rough iron ingot.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://gamepedia.cursecdn.com/atlas_gamepedia_en/0/0a/Iron_Ingot.png' },
    {name: 'Cloth', description: 'A bolt of cloth.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://vignette.wikia.nocookie.net/gardenpaws/images/5/51/Cloth.png/revision/latest/top-crop/width/360/height/450?cb=20180915170530' },
    {name: 'Refined Wood', description: 'A bit of refined wood.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://lh3.googleusercontent.com/proxy/sZBDdDx5nSvP7Ze_GCq1x9vfcMw1Dedymh5Xjg5MvSMY_wHi_wG_a8K64ZUHo8lJcGWOTHnyo1Y_cbWpM4ukBCIBNoEAR9Pf' },
    {name: 'Leather', description: 'A bit of leather.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://vignette.wikia.nocookie.net/elderscrolls/images/4/4b/TESV_Leather.png/revision/latest/top-crop/width/360/height/450?cb=20120311135843' },
    {name: 'Distilled Spirits', description: 'Distilled spirits which can be used as a base for many apothecarial substances.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://pics.clipartpng.com/Liquor_Bottle_PNG_Clipart-87.png' },
    {name: 'Bow', description: 'A basic longbow.', itemlevel: '0' , marketprice: '10' , quantity: '0', link:'https://pluspng.com/img-png/archery-png-hd-file-ffxi-archery-20-png-475.png' },
    {name: 'Pistol', description: 'A basic pistol.', itemlevel: '0' , marketprice: '30' , quantity: '0', link:'https://www.medievalcollectibles.com/wp-content/uploads/2019/04/ME-0170.png' },
    {name: 'Werewolf Tallow', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: 'N/A' , marketprice: '10' , quantity: '0', link:'https://vignette.wikia.nocookie.net/witcher/images/f/fa/Bestiary_Wolf.png/revision/latest/top-crop/width/360/height/450?cb=20071116211923' },
    {name: "Dragon's Eye", description: 'A common apothecary reagent acquired from a plant.', itemlevel: 'N/A' , marketprice: '0.5' , quantity: '0', link:'https://i.ya-webdesign.com/images/dragon-eye-png-3.png' },
    {name: 'Mandrake', description: 'A common apothecary reagent acquired from a plant.', itemlevel: 'N/A' , marketprice: '0.5' , quantity: '0', link:'https://vignette.wikia.nocookie.net/bloodbrothersgame/images/c/c3/Mandrake.png/revision/latest/top-crop/width/360/height/450?cb=20121106225737' },
    {name: 'Ghoul Venom', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: 'N/A' , marketprice: '10' , quantity: '0', link:'https://cdn.clipart.email/26dd8c59b3bd5d5554cf15baffc03c12_poison-clipart-panda-free-clipart-images_999-2331.png' },
    {name: 'Grave Blood', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: 'N/A' , marketprice: '10' , quantity: '0', link:'https://vignette.wikia.nocookie.net/slay-the-spire/images/4/4e/BloodVial.png/revision/latest?cb=20200203150024' },
    {name: 'Vampire Blood', description: 'A rare apothecary reagent acquired from a monster.', itemlevel: 'N/A' , marketprice: '10' , quantity: '0', link:'https://vignette.wikia.nocookie.net/darkmetal/images/a/a4/Blood-Vial.png/revision/latest/scale-to-width-down/340?cb=20150716160903' },
    {name: "Widow's Petal", description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://www.transparentpng.com/thumb/flower/dahlia-flower-png-orange-transparent-image-0.png' },
    {name: 'Thornwood Fern', description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://i.ya-webdesign.com/images/fern-png-8.png' },
    {name: 'Tarkathi Poppy', description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://lh3.googleusercontent.com/proxy/rWBkdJUmuTtKAyPHKFIdJ5ARL0Y6RTXdkPc9nxY_vWnrHjlGvDhAfaIBsPFI9k9Vu5F_spcctNZDRaugvCGHKWhI04jkEP1HRGOgVO4BvTtfw4M' },
    {name: 'Crypt Moss', description: 'An uncommon apothecary reagent acquired from a plant.', itemlevel: 'N/A' , marketprice: '1' , quantity: '0', link:'https://oldschool.runescape.wiki/images/8/83/Grimy_ranarr_weed_detail.png?ba61f' }
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
      role: seed[i].role,
      inventory: []
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
          // If an error occurs, send it back to the client
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