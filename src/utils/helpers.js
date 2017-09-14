export function colorSwitcher(value) {
let answer = "";
switch( value ) {
case -1: case -2: case -3: case -4: case -5:
  answer = 'red'
  break;
case 1: case 2: case 3: case 4: case 5:
  answer = "olive";
  break;
case 5: case 6: case 7: case 8: case 9:
  answer = "teal";
  break;
case 10: case 11: case 12: case 13: case 14: case 15:
  answer = "yellow";
  break;
  case 16: case 17: case 18: case 19: case 20: case 21:
    answer = "purple";
    break;
  case 22: case 23: case 24: case 25: case 26: case 27: case 28:
  answer = "pink"
default:
  answer = "green";
}
return answer;
}


export function showSecondsMinutesOrHours(present,past){

  let difference = ((present - past)/1000)

    if (difference >= 60 && difference <= 3600){
      return `${Math.round(difference/60)} minute(s)`
    } else if (difference >= 3600 && difference <= 216000){
      return `${Math.round(difference/60/60)} hour(s)`
    } else if (difference >= 216000){
      return `${Math.round(difference/60/60/24)} day(s)`
    } else {
      return `${Math.round(difference)} second(s)`
    }

}
