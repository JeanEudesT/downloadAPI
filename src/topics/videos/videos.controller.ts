const youtubedl = require('youtube-dl');
import fs  from 'fs';

export class VideosController {
    
    public static async download(req, res){
        let downloaded = 0;
        const video = youtubedl(req.body?.url, [], { start: downloaded, cwd: __dirname });
        
        video.on('info', function(info) {
            console.log('Download started')
            console.log('filename: ' + info._filename)
            
            let total = info.size + downloaded
            console.log('size: ' + total)
            console.log(info);
            const file = fs.createWriteStream('./videos/'+ info.id + '.mp4', { flags: 'a' });
            file.on('error', (err) => {
                console.log(err);
                res.send({err})
            })

            video.pipe(file);
        })

        video.on('end', () => {
            console.log('finished downloading!');
            res.send({
                videoUrl: "",
            }).status(200);
        })
    }
}
