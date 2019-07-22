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