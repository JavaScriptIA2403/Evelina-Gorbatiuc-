// Шаг 1. Класс Item
class Item {
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  getInfo() {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

// Шаг 2. Класс Weapon, расширяющий Item
class Weapon extends Item {
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  use() {
    if (this.durability > 0) {
      this.durability -= 10;
      if (this.durability < 0) this.durability = 0;
    }
  }

  repair() {
    this.durability = 100;
  }
}

// Шаг 3. Тестирование
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log(sword.getInfo());

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log("Durability after use:", bow.durability); // 90
bow.repair();
console.log("Durability after repair:", bow.durability); // 100

// Шаг 4. Переписываем через функцию-конструктор и опциональная цепочка
function ItemFunc(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

ItemFunc.prototype.getInfo = function () {
  return `ItemFunc: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

ItemFunc.prototype.setWeight = function (newWeight) {
  this.weight = newWeight;
};

function WeaponFunc(name, weight, rarity, damage, durability) {
  ItemFunc.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}

WeaponFunc.prototype = Object.create(ItemFunc.prototype);
WeaponFunc.prototype.constructor = WeaponFunc;

WeaponFunc.prototype.use = function () {
  if (this.durability > 0) {
    this.durability -= 10;
    if (this.durability < 0) this.durability = 0;
  }
};

WeaponFunc.prototype.repair = function () {
  this.durability = 100;
};

// Тест с опциональной цепочкой
const axe = new WeaponFunc("Battle Axe", 5, "rare", 30, 50);
console.log(axe.getInfo?.());
axe.use();
console.log("Durability after use:", axe.durability);
axe.repair();
console.log("Durability after repair:", axe.durability);
