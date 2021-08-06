import fs from 'fs';
import archiver from 'archiver';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const arquivos = fs.readdirSync("arquivos")


const streams = arquivos.map( arquivo =>  {
  
  return {
    "stream": fs.createReadStream(`${__dirname}/arquivos/${arquivo}`), 
    "name": arquivo}
  
  })


const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});
const output = fs.createWriteStream(`${__dirname}/arquivoszip/2.zip`)
streams.map( (stream) => {
  archive.append(stream.stream, { "name": stream.name })
})


archive.pipe(output)




console.log(archive)