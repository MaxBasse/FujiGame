export default async function Home() {


    return (
      <>
        <div className=" z-10 w-full  px-5 xl:px-0">
          <h1
              className="animate-fade-up bg-gradient-to-br from-red-700 to-red-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
              Erreur
          </h1>
          <p
            className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
            Malheureusement tu ne peux te connecter qu'avec ton adresse ICAM.
          </p>
          <a
            href="http://localhost:3000/"
            target="_self"
            rel="noreferrer"
            className="mx-auto text-white mt-8 flex max-w-fit animate-fade-up items-center border border-green-600 justify-center space-x-2 overflow-hidden shadow-md rounded-full bg-green-600 px-7 py-2 transition-colors hover:bg-white hover:text-red-600  hover:border-gray-500"
          >
            <p className="text-sm font-semibold">
              Retour
            </p>
          </a>
                   
        </div>
  
      </>
    );
  }