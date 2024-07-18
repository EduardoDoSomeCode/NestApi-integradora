
 const replacerReponse =(key: any, value: any) => {
    if (typeof value === 'bigint') {
      // Convertir BigInt a string y tomar los primeros 3 números
      return value.toString().slice(0, 3);
    }
    return value;
  }


export default replacerReponse; 
  