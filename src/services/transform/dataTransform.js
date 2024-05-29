function transformApiData(apiData, modelInstance) {
  const data = new modelInstance();

  for (const key in apiData) {
    if (apiData.hasOwnProperty(key)) {
      // Check if the key has a corresponding property in the data model
      if (data.hasOwnProperty(key)) {
        data[key].value = apiData[key];
      }

      // Check for additional data keys starting with "__"
      const additionalKey = `_${key}`;
      if (apiData.hasOwnProperty(additionalKey)) {
        if (!data[key]) {
          data[key] = {};
        }
        data[key].value = apiData[key];
        data[key].additional = apiData[additionalKey];
      }
    }
  }

  return data;
}

export default {
  transformApiData,
};
