export const requestInfo = async (_path: any) => {
  let result;
  try {
    const request = await fetch(process.env.REACT_APP_API_URL + `${_path}`);
    result = await request.json();
  } catch (err) {
    result = err;
    throw new Error(`${result}`);
  }
  return result;
};
