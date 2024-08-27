#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from "chalk-animation"
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow('Who wants to be a JS Millionare? \n');

    await sleep();
    rainbowTitle.stop();

    console.log(`${chalk.bgBlue('HOW TO PLAY')}
    I am a process on your computer.
    If you get any question worng I will be ${chalk.bgRed('Killed')}
    So get all the questions right....
    `)
}

// await welcome()

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'WHat is your name?',
        default(){
            return 'Vijigishu';
        }
    });

    playerName = answers.player_name;
}

// await askName();

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list', 
        message: 'JavaScript was reated in 10 days then release on\n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17, 1996',
        ],

    });

    return handleAnswer(answers.question_1 == 'Dec 4th, 1995');
}


async function question2() {
    const answers = await inquirer.prompt({
      name: 'question_2',
      type: 'list',
      message: 'What is x? var x = 1_1 + "1" + Number(1)\n',
      choices: ['4', '"4"', '"1111"', '69420'],
    });
    return handleAnswer(answers.question_2 === '"1111"');
  }
  
  async function question3() {
    const answers = await inquirer.prompt({
      name: 'question_3',
      type: 'list',
      message: `What is the first element in the array? ['🐏', '🦙', '🐍'].length = 0\n`,
      choices: ['0', '🐏', '🐍', 'undefined'],
    });
  
    return handleAnswer(answers.question_3 === 'undefined');
  }
  
  async function question4() {
    const answers = await inquirer.prompt({
      name: 'question_4',
      type: 'list',
      message: 'Which of the following is NOT a primitive type?\n',
      choices: [
        'boolean',
        'number',
        'null',
        'object', // Correct
      ],
    });
    return handleAnswer(answers.question_4 === 'object');
  }
  
  async function question5() {
    const answers = await inquirer.prompt({
      name: 'question_5',
      type: 'list',
      message:
        'JS is a high-level single-threaded, garbage-collected,\n' +
        'interpreted(or just-in-time compiled), prototype-based,\n' +
        'multi-paradigm, dynamic language with a ____ event loop\n',
      choices: ['multi-threaded', 'non-blocking', 'synchronous', 'promise-based'],
    });
  
    return handleAnswer(answers.question_5 === 'non-blocking');
  }

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer....').start();
    await sleep();

    if (isCorrect){
        spinner.success({text: `Nice work ${playerName}. Thats a legit answer`});
    } else{
        spinner.error({text: `Game over, you lose ${playerName}!`});
        process.exit(1);
    }
}




function winner(){
    console.clear();
    const msg = `Congracts, ${playerName} !\n $ 1, 0 0 0 , 0 0 0 `;

    figlet(msg, (err, data) =>{
        console.log(gradient.pastel.multiline(data));
    });
}
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await winner();


