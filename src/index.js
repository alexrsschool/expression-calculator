function eval() {
    // Do not use eval!!!
    return;
}

// https://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%80%D0%B0%D1%82%D0%BD%D0%B0%D1%8F_%D0%BF%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%B0%D1%8F_%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8C

function reversePolishNotation(rpnArr, stack) {
    let temp, num1, num2, result;

    while (rpnArr.length > 0) {
        temp = rpnArr.shift();
        if (temp.replace(/[0-9]/g, '') === '') {
            stack.push(temp);
        }
        if (temp.replace(/[0-9]/g, '') !== '') {
            num1 = parseFloat(stack.pop());
            num2 = parseFloat(stack.pop());
            switch (temp) {
                case '+':
                    result = num2 + num1;
                    stack.push(result);
                    break;
                case '-':
                    result = num2 - num1;
                    stack.push(result);
                    break;
                case '*':
                    result = num2 * num1;
                    stack.push(result);
                    break;
                case '/':
                    if (num1 === 0) {
                        throw "TypeError: Division by zero.";
                    }
                    result = num2 / num1;
                    stack.push(result);
                    break;
            }
        }
    }
    return stack.pop();
}


function expressionCalculator(expr) {
    let isBrackets = 0;
    let exprLength = expr.length;
    let rpnArr = [], stack = [];
    // testForPairedBrackets
    for (let i = 0; i < exprLength; i++) {
        switch (expr[i]) {
            case '(':
                isBrackets++;
                break;
            case ')':
                isBrackets--;
                break;
        }
    }
    if (isBrackets !== 0) throw "ExpressionError: Brackets must be paired";
    // parseExpressionToArr
    if (expr.indexOf(' ') >= 0) {
        expr = expr.replace(/\s{1,}/g, ' ').trim();
        expr = expr.split(' ');
    } else {
        expr = expr.split('');
    }
    for (let i = 0; i < expr.length; i++) {
        if (expr[i].replace(/[0-9]/g, '') === '') {
            rpnArr.push(expr[i]);
            continue;
        }
        if (expr[i] === '(') {
            stack.push(expr[i]);
            continue;
        }
        if (expr[i] === ')') {
            while (stack[stack.length - 1] !== '(') {
                let data = stack.pop();
                rpnArr.push(data);
            }
            stack.pop();
            continue;
        }
        if (expr[i] === '+' || expr[i] === '-') {
            while (stack[stack.length - 1] === '*'
            || stack[stack.length - 1] === '/'
            || stack[stack.length - 1] === '-'
            || stack[stack.length - 1] === '+') {
                let data = stack.pop();
                rpnArr.push(data);
            }
            stack.push(expr[i]);
            continue;
        }
        if (expr[i] === '*' || expr[i] === '/') {
            while (stack[stack.length - 1] === '*'
            || stack[stack.length - 1] === '/') {
                let data = stack.pop();
                rpnArr.push(data);
            }
            stack.push(expr[i]);
        }
    }
    while (stack.length > 0) {
        let data = stack.pop();
        rpnArr.push(data);
    }
    return reversePolishNotation(rpnArr, stack);
}

module.exports = {
    expressionCalculator
}