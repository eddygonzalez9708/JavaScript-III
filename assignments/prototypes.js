/*
  Object oriented design is commonly used in video games. For this part of the assignment
  you will be implementing several classes with their correct inheritance heirarchy.

  In this file you will be creating three classes: GameObject, CharacterStats, Humanoid.
  At the bottom of this file are 3 objects that all inherit from Humanoid. Use the objects at the bottom of the page to test your classes.

  Each class has unique properites and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string 'Object was removed from the game.'
*/

function GameObject(attributes) {
  this.createdAt = attributes.createdAt;
  this.dimensions = attributes.dimensions;
}

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
}

/*
  === CharacterStats ===
  * hp
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(attributes) {
  GameObject.call(this, attributes);
  this.hp = attributes.hp;
  this.name = attributes.name;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage.`
}

/*
  === Humanoid ===
  * faction
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(attributes) {
  CharacterStats.call(this, attributes);
  this.faction = attributes.faction;
  this.weapons = attributes.weapons;
  this.language = attributes.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
}

/*
  * Inheritance chain: Humanoid -> CharacterStats -> GameObject
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

//Test you work by uncommenting these 3 objects and the list of console logs below:

  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    hp: 5,
    name: 'Bruce',
    faction: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Toungue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    hp: 15,
    name: 'Sir Mustachio',
    faction: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Toungue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    hp: 10,
    name: 'Lilith',
    faction: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.hp); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.faction); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task:
// * Create Villian and Hero classes that inherit from the Humanoid class.
// * Give the Hero and Villians different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villian and one a hero and fight it out with methods!

function Hero(attributes) {
  Humanoid.call(this, attributes);
}

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.strike = function(villain, num) {
  villain.hp = villain.hp - num;
  if (villain.hp <= 0) {
    return `${this.name} killed ${villain.name}! ${villain.destroy()}`;
  }
  else {
    return `${this.name} attacked ${villain.name}. ${villain.takeDamage()} ${villain.name} has ${villain.hp} point(s) left.`;
  }
}

function Villain(attributes) {
  Humanoid.call(this, attributes);
}

Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.strike = function(hero, num) {
  hero.hp = hero.hp - num;
  if (hero.hp <= 0) {
    return `${this.name} killed ${hero.name}! ${hero.destroy()}`;
  }
  else {
    return `${this.name} attacked ${hero.name}. ${hero.takeDamage()} ${hero.name} has ${hero.hp} point(s) left.`;
  }
}

const ironMan = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 6.1,
  },
  hp: 20,
  name: 'Iron Man',
  faction: 'The Avengers',
  weapons: [
    'Flight',
    'Repulsor Beams',
  ],
  language: 'English',
});

const thanos = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 6.7,
  },
  hp: 50,
  name: 'Thanos',
  faction: 'Eternal Colony',
  weapons: [
    'Superhuman Strength',
    'Agility',
  ],
  language: 'English',
});

console.log(thanos.strike(ironMan, 5)); // Thanos attacked Iron Man. Iron Man took damage. Iron Man has 15 point(s) left.
console.log(ironMan.strike(thanos, 10)); // Iron Man attacked Thanos. Thanos took damage. Thanos has 40 point(s) left.
console.log(thanos.strike(ironMan, 14)); // Thanos attacked Iron Man. Iron Man took damage. Iron Man has 1 point(s) left.
console.log(ironMan.strike(thanos, 40)); // Iron Man killed Thanos! Thanos was removed from the game.
