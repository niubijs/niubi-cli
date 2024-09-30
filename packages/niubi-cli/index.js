#!/usr/bin/env node

import {program} from 'commander';
import {createVueFile} from "@niubi/make/vue.js";


program
    .name('niubi')
    .description('一款综合性前端脚手架工具')
    .version('0.0.1');

program.command('make:vue')
    .description('创建一个新的 vue 组件')
    .argument('<filename>', '文件名称，例：src/pages/Home')
    .option('-n,-name <componentName>', '组件名称，例：Home')
    // .option('-t,-type <type>', '需要创建的 vue 版本，参数2[vue2]，3[vue3]')
    .action(async (filename, options) => {
        await createVueFile(filename, options)
    });


program.parse();

// 如果没有提供任何命令，则显示帮助信息
if (!process.argv.slice(2).length) {
    program.help();
}
// console.log(process.argv)