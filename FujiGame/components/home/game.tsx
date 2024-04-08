'use client';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useFullScreenHandle } from "react-full-screen";
import { useState, useEffect, useCallback} from 'react';
import { LoadingDots } from "@/components/shared/icons";
import { sha256 } from "js-sha256";

export default function Game({uploadScore} : any    ) {

    const [received, setReceived] = useState(0);
    const [scores, setScores] = useState([[""],[""]]);
    const handle = useFullScreenHandle();
    const { unityProvider, sendMessage, addEventListener, removeEventListener, loadingProgression,isLoaded } = useUnityContext({
        loaderUrl: "../UnityGame/Build/UnityGame.loader.js",
        frameworkUrl: "../UnityGame/Build/UnityGame.framework.js",
        dataUrl: "../UnityGame/Build/UnityGame.data",
        codeUrl: "../UnityGame/Build/UnityGame.wasm"
    });
    const handleUnitySendScore = useCallback((score : any) => { 
        setReceived(score);
        uploadScore(score, sha256(((Number.parseInt(score))%1325).toString()));
      
    }, []);

    

    useEffect(() => {
        addEventListener("TransfertScore", handleUnitySendScore);
        return () => {
            removeEventListener("TransfertScore", handleUnitySendScore);
        };
    }, [addEventListener, removeEventListener, handleUnitySendScore]);

    return (
        <>
        <div className="grid">   
            <div className="grid grid-cols-3 grid-rows-3 col-start-1 row-start-1 w-4/5 h-fit mr-auto ml-auto mb-2 rounded-[20px] bg-gradient-to-br from-indigo-100 via-cyan-50 to-teal-100 shadow-md portrait:h-3/6">
                
                    
                        <div className="scale-120 col-span-3 row-start-2 font-display text-center text-transparent text-2xl font-bold bg-gradient-to-br from-red-700 to-red-500 bg-clip-text [text-wrap:balance]  md:text-xl ">
                        CHARGEMENT <br/>
                        <LoadingDots color="#808080" />
                        </div>                               
            </div>
            <Unity className="z-10 col-start-1 row-start-1 w-4/5 mr-auto ml-auto mb-5 rounded-[20px] portrait:ml-0 portrait:mr-0 portrait:w-full" unityProvider={unityProvider} />
        </div>
            
        </>
    );
}
