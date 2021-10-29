//@ts-nocheck

import { AsYouType, CountryCode, getCountryCallingCode } from 'libphonenumber-js'

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

export function FormatPhone(phone: string, country: CountryCode): string {
    const formatter = new AsYouType(country);
    const code = `+${getCountryCallingCode(country)}`;
    if (phone.match())
        return;
    const result = formatter.input(phone);
    console.log("before", phone, "after", result)
    return result;
}
