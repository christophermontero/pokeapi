import colors from 'colors';

const logger = {
  Success: (msg: string) => {
    console.log(colors.blue.bold(msg));
  },
  Info: (msg: string) => {
    console.log(colors.yellow.bold(msg));
  },
  Danger: (msg: string) => {
    console.log(colors.red.bold(msg));
  }
};

export default logger;
