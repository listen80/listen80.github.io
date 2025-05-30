import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

export default function getData() {
    return fetch('./readme.md')
        .then(response => response.text())
        .then(text => {
            // 使用 lexer 方法将 Markdown 文本解析为 Token
            const tokens = marked.lexer(text);
            tokens.forEach(token => {
                if (token.type === 'heading') {
                    console.log(token.text); // 输出标题文本
                } else if (token.type === 'code') {
                    console.log(token.text); // 输出代码文本
                } else if (token.type === 'paragraph') {
                    console.log(token.text); // 输出段落文本
                } else if (token.type === 'list') {
                    token.items.forEach(item => {
                        console.log(item.text); // 输出列表项文本
                    });
                }
            });
            console.log(tokens);
        })
        .catch(error => console.error(error));
}