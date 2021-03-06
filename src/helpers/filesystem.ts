import fs from 'fs';
import path from 'path';

export class FileSystemHelper {

    public static existsSync(filePath) {
        return fs.existsSync(filePath);
    }

    public static getDirname(pth) {
        return path.dirname(pth);
    }

    public static createDirectoryIfDoesNotExists(directoryPath) {
        if (!FileSystemHelper.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }
    }

    public static createWriteStream(path, flags) {
        return fs.createWriteStream(path, flags);
    }
}
