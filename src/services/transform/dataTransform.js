function transformApiData(apiData, modelInstance) {
  const data = new modelInstance();

  for (const key in apiData) {
    if (data.hasOwnProperty(key) && apiData.hasOwnProperty(key)) {
      data[key].value = apiData[key];
    }
  }

  return data;
}

export default {
  transformApiData,
};
