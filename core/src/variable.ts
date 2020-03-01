interface Store {
  [key: string]: string;
}

const StoreInstance: Store = {};

export default (key: string, value: string = undefined) => {
  if (value) return (StoreInstance[key] = value);

  return StoreInstance[key];
};
