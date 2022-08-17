let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;

console.log('Оригинальная строка');
console.log(str);
// обычный способ
// str = str.replace(new RegExp("ПОНЕДЕЛЬНИК", 'g'), "MONDAY");
// str = str.replace(new RegExp("ВТОРНИК", 'g'), "TUESDAY");
// str = str.replace(new RegExp("СРЕДА", 'g'), "WEDNESDAY");
// str = str.replace(new RegExp("ЧЕТВЕРГ", 'g'), "THURSDAY");
// str = str.replace(new RegExp("ПЯТНИЦА", 'g'), "FRIDAY");
// str = str.replace(new RegExp("СУББОТА", 'g'), "SATURDAY");
// str = str.replace(new RegExp("ВОСКРЕСЕНЬЕ", 'g'), "SUNDAY");
// работает быстрее
str = str.split("ПОНЕДЕЛЬНИК").join("MONDAY");
str = str.split("ВТОРНИК").join("TUESDAY");
str = str.split("СРЕДА").join("WEDNESDAY");
str = str.split("ЧЕТВЕРГ").join("THURSDAY");
str = str.split("ПЯТНИЦА").join("FRIDAY");
str = str.split("СУББОТА").join("SATURDAY");
str = str.split("ВОСКРЕСЕНЬЕ").join("SUNDAY");
console.log('\nОтредактированная строка');
console.log(str);
