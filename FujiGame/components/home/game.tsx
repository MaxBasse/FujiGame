'use client';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useFullScreenHandle } from "react-full-screen";
import { useState, useEffect, useCallback} from 'react';

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
        <Unity className="w-4/5 mr-auto ml-auto mb-20 rounded-[20px]" unityProvider={unityProvider} />
        </>
    );
}
