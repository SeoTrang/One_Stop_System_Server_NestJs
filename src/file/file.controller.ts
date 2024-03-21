import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { storageConfig } from 'helper/config';
import { extname } from 'path';

@ApiTags('File')
@ApiBearerAuth()
@Controller('file')
export class FileController {

    @Post('/single')
    @UseInterceptors(FileInterceptor('file',{
        storage: storageConfig('common'),
        fileFilter: (req,file,cb)=>{
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.png', '.jpeg', '.gif']
            if(!allowedExtArr.includes(ext)){
                req.fileValidationError = 'Wrong file extension type. accepted file extensions: ' + allowedExtArr.toString();
                cb(null,false)
            }else{
                const fileSize = parseInt(req.headers['Content-Length']);
                if(fileSize > 1024 * 1024 * 5){
                    req.fileValidationError = 'File size is too large. File size must be less than 5MB';
                    cb(null,false)
                }else{
                    cb(null,true)
                }
            }
    
        }
    }))
    async create(@UploadedFile() file: Express.Multer.File):Promise<string>{
        

        console.log("====file===");
        console.log(file);
        
        const filePath = '/' + file.destination+'/'+file.filename;
        console.log(filePath);
        console.log(file);
        
        return filePath;
        
        
    }



    @Post('/multiple')
    @UseInterceptors(FilesInterceptor('files', 10, {
        storage: storageConfig('common'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.png', '.jpeg', '.gif'];
            if (!allowedExtArr.includes(ext)) {
                req.fileValidationError = 'Wrong file extension type. accepted file extensions: ' + allowedExtArr.toString();
                cb(null, false);
            } else {
                const fileSize = parseInt(req.headers['content-length']);
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'File size is too large. File size must be less than 5MB';
                    cb(null, false);
                } else {
                    cb(null, true);
                }
            }
        }
    }))
    async uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>): Promise<string[]> {
        const filePromises: Promise<string>[] = files.map(async file => {
            const filePath = '/' + file.destination + '/' + file.filename;
            console.log(filePath);
            return filePath;
        });

        return Promise.all(filePromises);
    }
}
