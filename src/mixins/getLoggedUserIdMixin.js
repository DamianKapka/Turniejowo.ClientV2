export default {
  name: "getLoggedUserIdMixin",
  methods: {
    getLoggedUserId: function() {
      const token = localStorage.getItem("token");

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

      return result.unique_name;
    }
  }
};
