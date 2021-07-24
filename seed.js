const faker = require("faker");
const { hash } = require("bcryptjs");

const User = require("./src/app/models/User");
const Product = require("./src/app/models/Product");
const File = require("./src/app/models/File");

let usersIds = [],
  productsIds = [];
const totalUsers = 5;
const totalProducts = 15;
const totalFiles = 6;

async function createUsers() {
  try {
    const users = [];
    const password = await hash("111", 8);

    while (users.length < totalUsers) {
      users.push({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password,
        cpf_cnpj: faker.random.number(99999999999),
        cep: faker.random.number(99999999),
        address: faker.address.streetName(),
      });
    }

    const usersPromise = users.map((user) => User.create(user));

    usersIds = await Promise.all(usersPromise);
  } catch (error) {
    console.error(error);
  }
}

async function createProducts() {
  try {
    let products = [],
      files = [];

    while (products.length < totalProducts) {
      products.push({
        category_id: Math.ceil(Math.random() * 3),
        user_id: usersIds[Math.floor(Math.random() * totalUsers)],
        name: faker.name.title(),
        description: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
        old_price: faker.random.number({ min: 5, max: 10 }),
        price: faker.random.number({ min: 5, max: 10 }),
        quantity: faker.random.number({ min: 5, max: 10 }),
        status: Math.round(Math.random()),
      });
    }

    const productsPromise = products.map((product) => Product.create(product));
    productsIds = await Promise.all(productsPromise);

    while (files.length < totalFiles) {
      files.push({
        name: faker.image.image(),
        path: `public/images/placeholder.png`,
        product_id: productsIds[Math.floor(Math.random() * totalProducts)],
      });
    }

    const filesPromise = files.map((file) => File.create(file));

    await Promise.all(filesPromise);
  } catch (error) {
    console.log(error);
  }
}

async function init() {
  await  createUsers();
  await  createProducts();
}

init();
