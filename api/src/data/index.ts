import "dotenv/config";
import "reflect-metadata";
// import { ConnectionOptions, createConnection } from "typeorm";
// import * as entities from "../entity";
// import { values } from "lodash";
import { boards } from './data'
import { User, Keyboard } from "../entity";


// const prod = process.env.NODE_ENV === 'production'

async function createData() {

  const user = await User.create({
    email: 'test@test.com',
    username: 'test',
  }).save()

  for (let data of boards) {
    await Keyboard.create({
      angle: data.angle,
      announcement: "",
      brand: data.brand,
      details: data.details,
      editions: data.editions,
      connector: data.connector,
      firmware: data.firmware,
      images600: data.images600,
      images800: data.images800,
      images1500: data.images1500,
      imagesRaw: data.imagesRaw,
      layouts: data.layouts,
      mount: data.mount,
      name: data.name,
      pcb: data.pcb,
      size: data.size,
      support: data.support,
      interestCheck: data.interestCheck,
      groupBuy: data.groupBuy,
      groupBuySoon: data.groupBuySoon,
      market: data.market,
      closed: data.closed,
      maker: user
    }).save()

  }
}

export async function seeder() {
  await createData()
}