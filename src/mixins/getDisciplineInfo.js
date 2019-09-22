export default {
  name: "getDisciplineInfo",
  methods: {
    getDisciplineById: function(id) {
      switch (id) {
        case 1:
          return "Siatkówka";
        case 2:
          return "Koszykówka";
        case 3:
          return "Piłka Nożna";
        default:
          break;
      }
    },
    getDisciplineId: function(discipline) {
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
  }
};
