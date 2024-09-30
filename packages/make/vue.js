// 创建 vue 文件
import {promises as fs} from "node:fs";
import path from "node:path";
import Handlebars from 'handlebars'
import {ensureFileExistsAndWrite} from "./util.js";

export const createVueFile = async (filename, options) => {
    // console.log(path.join(process.cwd(), filename), options)
    // console.log(process.cwd())
    try {
        // 指定模板文件的路径
        const templatePath = import.meta.dirname + '/template/vue.hbs';

        // 读取模板文件
        const templateContent = await fs.readFile(templatePath, 'utf-8');

        // 编译模板
        const template = Handlebars.compile(templateContent);

        const data = {
            // 组件名称
            componentName: options.Name || 'components',
            // 是否是 vue2 还是 vue3
            isVueThree: (options.Type || '3') === '3'
        };
        console.log(data)
        // 渲染模板
        const renderedContent = template(data);

        // 构建目标文件的完整路径
        const targetPath = path.join(process.cwd(), filename) + '.vue';
        // 写入新文件
        await ensureFileExistsAndWrite(targetPath, renderedContent)
        // console.log(renderedContent)
        // console.log(`Created ${targetPath} with component name: ${componentName}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}