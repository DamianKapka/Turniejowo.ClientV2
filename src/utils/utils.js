export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function GetDisciplineById(id) {
  let discipline;

  switch (id) {
    case 1:
      discipline = "Siatkówka";
      break;
    case 2:
      discipline = "Koszykówka";
      break;
    case 3:
      discipline = "Piłka Nożna";
      break;
    default:
      break;
  }

  return discipline;
}

export function GetDisciplineId(discipline) {
  switch (discipline) {
    case "Piłka Nożna":
      return 3;
    case "Koszykówka":
      return 2;
    case "Siatkówka":
      return 1;
    default:
      return 0;
  }
}
