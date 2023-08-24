import inquirer from "inquirer";
import chalk from "chalk";

const apiLink: string = 'https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple';

let fetchData = async (data: string) => {
    let fetchQuiz: any = await fetch(data)
    let res = await fetchQuiz.json();
    return res.results;
}

let data = await fetchData(apiLink);

let startQuiz = async () => {
    let score: number = 0
    // /for username
    let name = await inquirer.prompt({
        type: 'input',
        name: 'fname',
        message: 'what is your name?'
    });

    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answers];
        let ans = await inquirer.prompt({
            type: 'list',
            name: 'quiz',
            message: data[i].question,
            choices: answers.map((val: any) => val),
        });

        if (ans.quiz == data[i].correct_answers) {
            ++score
            console.log(chalk.bold.italic.blue('Correct'))
            
        }else {
            console.log(`correct answer is ${chalk.bold.italic.red(data[i].correct_answers)}`);
            
        }

    }

    console.log(`Dear ${chalk.green.bold(name.fname)}, Your Score Is ${chalk.red.bold(score)} out of ${chalk.yellow.bold(`5`)}`);

};

startQuiz();




