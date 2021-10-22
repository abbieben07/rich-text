import currencySymbol from 'currency-symbol';
import currency from 'currency.js';
//@ts-ignore
String.prototype.decode = function () {
    const map = { gt: '>' /* , … */ };
    return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, ($0, $1) => {
        if ($1[0] === '#') {
            return String.fromCharCode($1[1].toLowerCase() === 'x' ? parseInt($1.substr(2), 16) : parseInt($1.substr(1), 10));
        } else {
            return map.hasOwnProperty($1) ? map[$1] : $0;
        }
    });
};

export function FormatMoney(money: string, symbol: string): string {
    symbol = currencySymbol.symbol(symbol).decode();
    if (money.length === 0) {
        return `${symbol}0.00`;
    }

    const str = money.replace(/(\D)/g, '');
    const amount = parseInt(str, 10) / 100;

    return currency(amount, { symbol }).format();
}
