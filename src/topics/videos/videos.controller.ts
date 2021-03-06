const youtubedl = require('youtube-dl');
import fs  from 'fs';
import path from 'path';
import { FileSystemHelper } from '../../helpers/filesystem';
export class VideosController {

    public static async download(req, res){

        if(!req.body.url) throw 'URL video is missing...';
        if(!req.body.destination) throw 'Destination path is missing...';

        const base = './videos';
        const destination = req.body.destination;

        const info = await VideosController.getVideoInfo(req.body.url);

        const filename = info._filename + '.mp4';
        const finalDestinationPath = path.join(base, destination, filename)
        const alreadyDownloaded = FileSystemHelper.existsSync(finalDestinationPath);
        
        if(alreadyDownloaded) {
            res.send({
                message: 'La vidéo '+ info._filename +' a déjà été téléchargée',
            }).status(200);
            return;
        }

        console.log('Download started');
        console.log('Full title: ' + info.fulltitle);
        console.log('Filename: ' + info._filename);
        console.log('size: ' + info.size)

        const directoryPath = FileSystemHelper.getDirname(finalDestinationPath);
        FileSystemHelper.createDirectoryIfDoesNotExists(directoryPath);
        
        const video = youtubedl(req.body?.url, [], { cwd: __dirname });


        const file = FileSystemHelper.createWriteStream(finalDestinationPath, { flags: 'a' });
        file.on('error', (err) => {
            console.log(err);
            res.send({err})
        })

        video.on('end', () => {
            console.log('finished downloading!');
            res.send({
                videoUrl: "",
            }).status(200);
        })

        video.pipe(file);

    }

    public static async getVideoInfo(url): Promise<any> {
        return new Promise((resolve, reject) => {
            youtubedl.getInfo(url, (err, info) => {
                if(err) throw err;
                resolve(info);
            })
        })
    }
}
