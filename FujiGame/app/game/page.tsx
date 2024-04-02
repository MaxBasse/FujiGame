import Game from "@/components/home/game";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient({})

export default async function Home(this: any) {
  const session = await getServerSession(authOptions);
  const { email } = session?.user || {};

  function disconnect() {
    prisma.$disconnect().catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
  }

  disconnect();
  

    async function uploadScore(score: string, modCrc : string) {
      "use server"
      console.log("email: " + email) 
      console.log("score: " + score) 
      console.log("Score uploaded1") 
      const validScore = Number.parseInt(score)%227==Number.parseInt(modCrc)

      if(email == undefined || email == null || !validScore) return
      
      console.log("Score uploaded2")
      await prisma.scores.create({
        data: {
          email: email,
          score: Number.parseInt(score),
        },
        })
        console.log("Score uploaded3")

        disconnect();
  
  }

    return (
      <>
        <div className=" z-10 w-full  px-5 xl:px-0">
          <Game uploadScore={uploadScore} />  
          <p
            className="mb-4 animate-fade-up text-center text-gray-700 font-bold opacity-0 [text-wrap:balance] md:text-xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
            PASSE EN PAYSAGE SUR MOBILE
            
          </p>     
          <h1
              className="animate-fade-up bg-gradient-to-br from-blue-700 to-cyan-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
              FujiGame
          </h1>
          <p
            className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
            Évite les obstacles avec ton double saut ou découpe les grâce à ton katana de ninja pour faire le plus gros score possible et tente de gagner des cadeaux ! 
            
          </p>
          <a
            href="https://fujigame-ufcdc.ondigitalocean.app/"
            target="_self"
            rel="noreferrer"
            className="mx-auto text-white mt-5 flex max-w-fit animate-fade-up items-center border border-green-600 justify-center space-x-2 overflow-hidden shadow-md rounded-full bg-green-600 px-7 py-2 transition-colors hover:bg-white hover:text-red-600  hover:border-gray-500"
          >
            <p className="text-sm font-semibold">
              Classement
            </p>
          </a>
                   
        </div>
  
      </>
    );
  }