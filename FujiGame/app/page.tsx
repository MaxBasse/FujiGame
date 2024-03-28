import { PrismaClient } from '@prisma/client'
import  Scoreboard  from "@/components/home/scoreboard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient({})

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isLogged = session?.user?.email !== undefined && session?.user?.email !== null;

  const scores = await prisma.scores.findMany({
    orderBy: {score: 'desc'},  
    distinct: ['email'],
    take: 10
    

  })

  const nbGames = (await prisma.scores.count()).toString()
  const nbUsers = await prisma.scores.findMany({
    distinct: ['email'],
  })

  const avgScore = await prisma.scores.aggregate({
    _avg: {
      score: true,
    },
  })
  
  var userScore
  var index
  

  if(!(session?.user?.email == undefined || session?.user?.email == null)) {

    userScore = await prisma.scores.aggregate({
      _max: {
        score: true,
      },
      where:{
        email: session?.user?.email,
      },
    })
    
    if(userScore._max.score == null || userScore._max.score == undefined) {
      userScore._max.score = 0
    }

    index = await prisma.scores.findMany({
      select: {
        score: true,
        email: true,
      },
      where: {
        score: {
          gte: userScore._max.score,
        },
      },
      orderBy: {score: 'desc'},
      distinct: ['email'],
    })
    
    
    scores.push({
      email: session?.user?.email,
      score: userScore._max.score,
    })

  }

  scores.map((item) => {
    let rank = scores.indexOf(item)+1
    if(rank == 11) {
      item.email = index.length + " (moi)" + ". " + item.email
    } else {
      item.email = rank +  ". " + item.email
      rank++
    }
  })
  

  function disconnect() {
    prisma.$disconnect().catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
  }
 
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
          className="mt-4 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Fait le plus gros score et gagne des lots ! 
        </p>
        <p
          className="animate-fade-up text-center font-extrabold text-stone-700 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Connecte-toi pour sauvegarder ton score et participer.
        </p>
        <div
          className="mx-auto mt-4 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
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
      <div className="my-4 grid w-full max-w-screen-xl flex-auto animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-1 xl:px-0">
        <Scoreboard scores={scores} />
      </div>

      <p
          className="mt-2 mb-5 animate-fade-up text-left text-gray-500 opacity-0  md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <text className='font-bold'>STATISTIQUES</text>
        </p>

      <p
          className="mt-2 mb-5 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <text className='font-semibold text-gray-600'>{nbGames} </text> parties jouées 
        </p>
      <p
        className="mt-2 mb-5 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <text className='font-semibold text-gray-600'>{nbUsers.length} </text> joueurs classés 
      </p>
      <p
        className="mt-2 mb-5 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        Score moyen : <text className='font-semibold text-gray-600'>{avgScore._avg.score?.toFixed()} </text> pts
      </p>
    </>
  );
}


