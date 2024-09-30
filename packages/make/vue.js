// 创建 vue 文件
import {promises as fs} from "node:fs";
import path from "node:path";
import {ensureFileExistsAndWrite} from './util.js'

export const createVueFile = async (filename, options) => {
    // console.log(path.join(process.cwd(), filename), options)
    try {
        // 指定模板文件的路径
        const templatePath = import.meta.dirname + '/template/vue.hbs';

        // 读取模板文件
        const templateContent = await fs.readFile(templatePath, 'utf-8');

        // 编译模板
        // const template = Handlebars.compile(templateContent);

        // 准备数据
        // const componentName = options.name || 'UnnamedComponent';
        // const data = {
        //     COMPONENT_NAME: componentName,
        //     hasSpecialMethod: options.method
        // };

        // 渲染模板
        // const renderedContent = template(data);

        // // 构建目标文件的完整路径
        const targetPath = path.join(process.cwd(), filename) + '.vue';
        // // 写入新文件
        // await fs.promises.writeFile(targetPath, templateContent);
        await ensureFileExistsAndWrite(targetPath, templateContent)
        // console.log(`Created ${targetPath} with component name: ${componentName}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}