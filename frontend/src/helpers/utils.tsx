export const convertBase64File = (file: File) =>
    new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });

export const getRandomDigit = () => Math.floor(Math.random() * 101 + 1);
