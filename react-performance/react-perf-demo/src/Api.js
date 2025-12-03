
export const getUsers = async () => {
  console.log("API call for only fetching users");
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

