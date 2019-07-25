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

export function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = decodeURIComponent(
    atob(base64Url)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const result = JSON.parse(base64);

  return { id: result.unique_name, actor: result.actort };
}
