export const generateRandomAccountNumber = (length) => {
    const characters = "0123456789";
    let account = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      account += characters[randomIndex];
    }
    return account;
  };

  