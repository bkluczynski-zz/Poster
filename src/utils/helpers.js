export const colorSwitcher = (value) => {
  const colors = [
    'red',
    'olive',
    'teal',
    'yellow',
    'purple',
    'pink',
    'green',
  ];
  const validations = [
    (value <= -1 && value >= -5),
    (value >= 1 && value <= 5),
    (value >= 6 && value <= 10),
    (value >= 11 && value <= 15),
    (value >= 16 && value <= 20),
    (value >= 21 && value <= 25),
    (value >= 26 && value <= 30),
  ];

  return validations
  .map((v, k) => ((v && colors[k]) || false))
  .find(v => typeof v == 'string') || 'green';
}

export function validateComment(values){
  const errors = {}
  if (!values.body) {
    errors.body = 'Body is required'
  }
  if (!values.author) {
    errors.author = 'Author is required'
  }

  return errors
}

export function validate(values){
  const errors = {}
  if (!values.title) {
    errors.title = 'Title is required'
  }
  if (!values.title) {
    errors.body = 'Body is required'
  }
  if (!values.title) {
    errors.author = 'Author is required'
  }
  return errors
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
