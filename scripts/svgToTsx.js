const fs = require('fs');
const path = require('path');

const rootPath = fs.realpathSync(process.cwd());
const filePath = path.join(rootPath, './src/markun/svg/');

const files = fs.readdirSync(filePath);
files.forEach(file => {
  if (file.match(/.svg$/)) {
    fs.readFile(path.join(filePath, file), 'utf-8', (err, data) => {
      if (!err) {
        const filePrefix = file.replace('.svg', '');
        const tsxStr = `import React from 'react';

export default function ${filePrefix.replace('-', '')}() {
  return (
    ${data}
  );
}`;
        fs.writeFile(path.join(filePath, `${filePrefix}.tsx`), tsxStr, 'utf-8', (err) => {
          if (err) {
            console.log(`${filePrefix} 写入失败: ${err}`);
          }
        })
      }
    })
  }
});
