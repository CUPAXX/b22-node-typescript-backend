const schema = {
    password: {
      in: ["body"],
      isLength: {
        errorMessage: "password length min 7 character",
        options: {
          min: 7
        }
      }
    }
  }

  export default schema