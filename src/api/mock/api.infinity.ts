import { faker } from "@faker-js/faker/locale/ko";

export const data = [...Array(20)].map((_, index) => {
  return {
    productName: faker.commerce.product(), 
    description: faker.commerce.productDescription(),
    price: faker.commerce.price() 
  };
})