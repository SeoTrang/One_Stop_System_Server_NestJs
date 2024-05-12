

// Import các module cần thiết
import * as fs from 'fs';
import * as path from 'path';
import * as Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocxServiceService {

    async genDocx(data: any,pathDox: string ) {
        // const data = {
        //     "user_name":"Tráng",
        //     "date_of_birth":"10/12/2001",
        //     "identifier":"DTC19H4801030040",
        //     "phone":"0386640397",
        //     "in_class":"KTPMK18A",
        //     "hasKitty": 2
        // }

        

    
        // Đường dẫn đến file mẫu Word
        // const templatePath = path.join(process.cwd(), 'public', 'auto_gen_docx', 'test.docx');
        const templatePath = path.join(process.cwd(), pathDox);

        console.log(data);
        console.log(templatePath);
        
        


        // return true;
        // Đọc nội dung của file mẫu Word
        const content = fs.readFileSync(templatePath, 'binary');

        // Tạo một đối tượng PizZip từ nội dung của file mẫu
        const zip = new PizZip(content);

        // Tạo một đối tượng Docxtemplater với PizZip
        const doc = new Docxtemplater(zip,{
            paragraphLoop: true,
            linebreaks: true,
        });



        // Chèn dữ liệu vào mẫu Word
        doc.setData(data);

        try {
            // Render mẫu Word với dữ liệu đã chèn
            doc.render();
        } catch (error) {
            // Xử lý lỗi nếu có
            throw new Error('Lỗi khi render mẫu Word: ' + error);
        }

        // Tạo buffer cho file Word đã render
        const buffer = doc.getZip().generate({ type: 'nodebuffer' });

        // Đường dẫn lưu trữ file Word đầu ra
        const outputPath = path.join(process.cwd(), 'public', 'documents', 'output.docx');

        try {
            // Ghi file Word vào đường dẫn đầu ra
            fs.writeFileSync(outputPath, buffer);
        } catch (error) {
            // Xử lý lỗi nếu có
            throw new Error('Lỗi khi ghi file Word: ' + error);
        }

        // Trả về đường dẫn của file Word đầu ra
        return outputPath;
    }
}
