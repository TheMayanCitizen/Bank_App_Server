export const generateAccountNumber = () => {
  return Math.floor(Math.random() * 1000000) + new Date().getTime();
};
