const { PrismaClient } = require('@prisma/client');

// Pour acceder a prisma sans le le logiciel prisma 
// renommer en script.ts et 
// term :  npx ts-node script.ts

//Pour accedder a prisma studio : npx prisma studio


//import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma




//const prisma = new PrismaClient()

async function main() {
  /*const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      password: '12345'
    },
  })
  console.log(user)*/
  const users = await prisma.user.findMany()
  console.log(users)
}
 
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })