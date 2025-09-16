export const validationEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
  
export const getInitails = (title) =>{
  if(!title) return "";

  const words = title.split(" "); 
  let initials = "";

  for(let i=0; i< Math.min(words.length, 2); i++){
      initials += words[i][0]
  }
  return initials.toUpperCase();
}