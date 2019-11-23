export default {
  name: "navBarCardsFactory",
  methods: {
    createNavBarCards: function(isBracket) {
      if (isBracket) {
        return [
          { LabelInfo: "Ogólne", ActiveClass: "info", RouterLink: "info" },
          {
            LabelInfo: "Uczestnicy",
            ActiveClass: "participants",
            RouterLink: "participants"
          },
          { LabelInfo: "Drabinka", ActiveClass: "bracket", RouterLink: "bracket" },
          {
            LabelInfo: "Statystyki",
            ActiveClass: "stats",
            RouterLink: "stats"
          },
          { LabelInfo: "Mecze", ActiveClass: "matches", RouterLink: "matches" },
          { LabelInfo: "Cofnij", ActiveClass: "find", RouterLink: "find" }
        ];
      }

      return [
        { LabelInfo: "Ogólne", ActiveClass: "info", RouterLink: "info" },
        {
          LabelInfo: "Uczestnicy",
          ActiveClass: "participants",
          RouterLink: "participants"
        },
        { LabelInfo: "Tabela", ActiveClass: "table", RouterLink: "table" },
        { LabelInfo: "Statystyki", ActiveClass: "stats", RouterLink: "stats" },
        { LabelInfo: "Mecze", ActiveClass: "matches", RouterLink: "matches" },
        { LabelInfo: "Cofnij", ActiveClass: "find", RouterLink: "find" }
      ];
    }
  }
};
