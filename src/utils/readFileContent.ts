export function readFileContent(fileContent: File) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      const { target } = event;
      if (target) {
        resolve(target.result);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(fileContent);
  });
}
