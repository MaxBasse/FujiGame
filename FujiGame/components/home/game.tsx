'use client';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useFullScreenHandle } from "react-full-screen";
import { useState, useEffect, useCallback} from 'react';
import ReactMarkdown from "react-markdown";

export default function Game({uploadScore} : any) {

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
        uploadScore(score);


        
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
            <div className="col-start-1 row-start-1 w-4/5 h-7/10 mr-auto ml-auto mb-20 rounded-xl bg-gradient-to-br from-indigo-100 via-cyan-50 to-teal-100 shadow-md grid">
                
                    
                        <h1 className="col-start-2 row-start-2 font-display text-transparent text-4xl font-bold bg-gradient-to-br from-red-700 to-red-500 bg-clip-text [text-wrap:balance] overflow-hidden  ">
                        CHARGEMENT
                        </h1>
                        
            </div>
            <Unity className="z-0 col-start-1 row-start-1 w-4/5 mr-auto ml-auto mb-20 rounded-[20px]" unityProvider={unityProvider} />
        </div>
            
        </>
    );
}
