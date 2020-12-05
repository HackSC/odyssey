/*
  Flattens JSON objects and converts them to a FormData object

  Example:
  {
    name: 'Willie',
    job: {
      title: 'Engineer',
      salary: 100000
    }
  }

  becomes

  name: 'Willie'
  job.title: 'Engineer'
  job.salary: 100000
*/
export default function jsonToFormData(
  inJSON: Object,
  inFormData?: FormData,
  parentKey?: string
) {
  const formData = inFormData || new FormData();
  for (let key in inJSON) {
    let constructedKey = key;
    if (parentKey) {
      constructedKey = parentKey + "." + key;
    }

    const value = inJSON[key];
    if (value && value.constructor === {}.constructor) {
      jsonToFormData(value, formData, constructedKey);
    } else {
      formData.append(constructedKey, inJSON[key]);
    }
  }
  return formData;
}
