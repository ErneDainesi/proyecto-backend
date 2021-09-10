import fs from 'fs';

export const overwriteFile = (fileName: string, dataToWrite: Array<any>) => {
	fs.writeFileSync(fileName, JSON.stringify(dataToWrite));
};
