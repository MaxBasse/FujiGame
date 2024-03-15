'use client';
import {List, ListItem, Title } from '@tremor/react';
import {
    Badge,
    
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from '@tremor/react';
  
import  Card from './card';







export default function Scoreboard({ scores }: { scores: { email: string; score: number; }[] }) {
  

return (
    <Card title='Classement'
    description='Classement des meilleurs samourais, connecte-toi pour participer !'
    demo={
      <List className=" ">
        {scores.map((item) => (
          <ListItem className="first:border-0 border-t" key={item.email}>
            <span>{item.email}</span>
            <span>{item.score}</span>
          </ListItem>
        ))}
      </List>
      /*<Table className="">
        <TableHead>
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">Email</TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">Score</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map((item) => (
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border" key={item.email}>
               <TableCell className="font-medium ">{item.email}</TableCell>
              <TableCell className="font-7 ">
                {item.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>*/

      
    }
    large={true}
    /> 
);
}
