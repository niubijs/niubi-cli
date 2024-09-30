import {promises as fs} from 'fs';
import {dirname} from 'path';


// 检测指定的文件夹地址是否存在某个文件,并将内容写入
export async function ensureFileExistsAndWrite(filePath, content) {
    const dirPath = dirname(filePath);

    try {
        // 确保目录存在
        await fs.mkdir(dirPath, {recursive: true});

        // 检查文件是否存在
        await fs.access(filePath, fs.constants.F_OK);

        // 将内容写入到指定的文件中
        await writeFile(filePath, content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            // File does not exist, create and write the file
            await writeFile(filePath, content);
        } else {
            console.error(`Error accessing file ${filePath}:`, err);
        }
    }
}

// 写入文件内容
const writeFile = async (filePath, content) => {
    return await fs.writeFile(filePath, content)
}
