import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const argv = yargs(
  hideBin(process.argv)
)
  .usage(
    'Usage: --action list|get|add|remove [--help]'
  )
  .alias('h', 'help')
  .alias('a', 'action')
  .demand(['action'])
  .choices('action', [
    'list',
    'get',
    'add',
    'remove',
  ])
  .default('action', 'list').argv;

//   # Получаем и выводим весь список контакстов в виде таблицы (console.table)
// node index.js --action="list"

// # Получаем контакт по id
// node index.js --action="get" --id=5

// # Добавялем контакт
// node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"

// # Удаляем контакт
// node index.js --action="remove" --id=3

//   <script type="module">
//   import Yargs from 'https://unpkg.com/yargs@16.0.0-beta.1/browser.mjs';
//   const yargs = Yargs()
//     .scriptName('>')
//     .command('clear', 'clear the output window', () => {}, () => {
//       // ...
//     })
//     .command('alert <message...>', 'display an alert', () => {}, (argv) => {
//       alert(argv.message.join(' '))
//     })
//     .wrap(null)
//     .strict()
//     .demandCommand(1)
//     .version('v1.0.0');
// </script>
