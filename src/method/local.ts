export  const _SetlocalStorage = (name: string, data: any) => {
    localStorage.setItem(name, JSON.stringify(data));
  };
  export  const _GetlocalStorage = (name: string) => {
    let resJson = localStorage.getItem(name);
    return resJson ? JSON.parse(resJson) : null;
  };