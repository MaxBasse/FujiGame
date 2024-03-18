import { PrismaClient } from '@prisma/client'
import  Scoreboard  from "@/components/home/scoreboard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient({})

export default async function Home() {
  const session = await getServerSession(authOptions);

  var scores = await prisma.scores.findMany({
    orderBy: {score: 'desc'},  
    distinct: ['email'],
    take: 10

  })
  
  scores.includes
  scores.splice
  console.log(scores)

  function disconnect() {
    prisma.$disconnect().catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
  }
 
  scores.push
  

  disconnect();

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        
        <h1
          className="animate-fade-up bg-gradient-to-br from-blue-700 to-cyan-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          FujiGame
        </h1>
        <a
          href="https://fujilist.odoo.com/"
          target="_blank"
          rel="noreferrer"
          className="mx-auto text-center text-white mt-5 flex max-w-fit animate-fade-up items-center border border-green-600 justify-center space-x-2 overflow-hidden shadow-md rounded-full bg-green-600 px-7 py-2 transition-colors hover:bg-white hover:text-red-600  hover:border-gray-500"
        >
          <p className="text-sm font-semibold">
            Site principal 
          </p>
        </a>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Fait le plus gros score et gagne des lots ! <br />
          Connecte-toi pour sauvegarder ton score et participer.
        </p>
        <div
          className="mx-auto mt-7 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <a
            className="group flex max-w-fit items-center justify-center shadow-md space-x-2 rounded-full border text-center border-blue-900 bg-blue-900 px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-green-600 hover:border-gray-500"
            href="https://fujigame-ufcdc.ondigitalocean.app/game"
            target="_self"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 20 12 Z L 7 4 L 7 19 L 20 12"  
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Accéder au jeu</p>
          </a>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border text-center border-red-600 bg-red-600 px-5 py-2 text-sm text-white shadow-md transition-colors hover:bg-white hover:text-blue-900  hover:border-gray-500"
            href="https://fujigame-ufcdc.ondigitalocean.app/"
            target="_self"
            rel="noopener noreferrer"
          >
            <p>
              Actualiser classement   
            </p>
          </a>
        </div>
      </div>
      <div className="my-8 grid w-full max-w-screen-xl flex-auto animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-1 xl:px-0">
        <Scoreboard scores={scores} />
      </div>
    </>
  );
}


