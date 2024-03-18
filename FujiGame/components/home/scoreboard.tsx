'use client';
import {List, ListItem } from '@tremor/react';  
import  Card from './card';


export default function Scoreboard({ scores }: { scores: { email: string; score: number; }[] }) {
  


return (
    <Card title='Classement'
    description='Classement des meilleurs samourais, connecte-toi pour participer !'
    demo={
      <List className=" ">
        {scores.map((item) => (
          <ListItem className="first:border-0 border-t" key={item.email}>
            <span>{item.email.split(".")[0].charAt(0).toUpperCase() + item.email.split(".")[0].slice(1) + " " + item.email.split(".")[1].toUpperCase().split("@")[0]}</span>
            <span>{item.score}</span>
          </ListItem>
        ))}
      </List>     
    }
    large={true}
    /> 
);
}
