const cleanName = (name: string): string => {
  return name.replaceAll(' ', '_').replaceAll('/', '');
}


export {
  cleanName
}