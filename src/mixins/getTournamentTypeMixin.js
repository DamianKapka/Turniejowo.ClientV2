export default {
  name: "getTournamentType",
  methods: {
    getTournamentTypeBasedOnBool: function(isBracket) {
      if (isBracket) return "Drabinka";
      return "Tabela";
    }
  }
};
