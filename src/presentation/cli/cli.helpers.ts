import readline from "node:readline";

export const askQuestion =  (rl: readline.Interface, question: string): Promise <string> => {
  return new Promise ((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  })
}

export const getValidInput = async (question: string, validAnswers?: string[]): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const validateAnswer = async (): Promise<string> => {
    const answer = await askQuestion(rl, question);
    if (!validAnswers || validAnswers.includes(answer)) {
      rl.close();
      return answer;
    } else {
      return validateAnswer();
    }
  }
  return validateAnswer();
};
