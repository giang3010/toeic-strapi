import { extname } from 'path';

export const imageFileFilter = (
    req: any,
    file: { originalname: string },
    callback: (arg0: Error, arg1: boolean) => void,
) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp3|mp4)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

function removeAccents(str: string) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

export const editFileName = (
    req: any,
    file: { originalname: string },
    callback: (arg0: any, arg1: string) => void,
) => {
    const name = removeAccents(file.originalname).split('.')[0];
    const name1 = name.replace(/\s/g, '');
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name1}-${randomName}${fileExtName}`);
};
