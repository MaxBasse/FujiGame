'use client';
import {List, ListItem } from '@tremor/react';  
import  Card from './card';


export default function Scoreboard({ scores, hide }: { scores: { email: string; score: number; }[], hide : boolean }) {

  if(hide) return (
    <Card title='Classement désactivé pendant la dernière heure'
    description="Plus qu'une heure pour tenter de faire le meilleur score, le classement est désactivé pour plus de suspens ! Aucun score ne sera enregistré après 19H"
    
    large={true}
    /> 

  );

return (
    <Card title='Classement'
    description='Classement des meilleurs samourais, connecte-toi pour participer !'
    demo={
      <List className=" ">
        {scores.map((item) => (
          <ListItem className="first:border-0 border-t odd:last:rounded-xl  odd:last:border-2 odd:last:pl-5 odd:last:pr-5 odd:last:bg-gradient-to-br from-orange-500 to-yellow-400" key={item.email}>
            <span>{item.email.split(".")[0] + " "+ item.email.split(".")[1].charAt(1).toUpperCase() + item.email.split(".")[1].slice(2) + " " + item.email.split(".")[2].toUpperCase().split("@")[0]}</span>
            <span>{item.score}</span>
          </ListItem>
        ))}
      </List>     
    }
    large={true}
    /> 
);
}
