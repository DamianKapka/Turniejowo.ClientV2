export default {
  name: "getMedalColorMixin",
  methods: {
    getMedalColor: function(index) {
      switch (index) {
        case 1: {
          return "gold";
        }
        case 2: {
          return "silver";
        }
        case 3: {
          return "bronze";
        }
        default: {
          return;
        }
      }
    }
  }
};
