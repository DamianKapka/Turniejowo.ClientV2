export default {
  name: "getTournamentType",
  methods: {
    getTournamentTypeBasedOnBool: function(isBracket) {
      if (isBracket) return "Drabinka";
      return "Tabela";
    },

    getTournamentBoolBasedOnName(name) {
      if (name === "Drabinka") return true;
      return false;
    }
  }
};
