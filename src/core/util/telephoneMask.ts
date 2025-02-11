export default function execTelephoneMask(value: string) {
    let numericValue = value.replace(/\D/g, '');

    if (numericValue.startsWith('8')) {
        numericValue = '7' + numericValue.slice(1);
    }

    if (numericValue.length > 0) {
        return numericValue
            .replace(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,4})$/, (match, p1, p2, p3, p4) => {
                let formatted = `${p1}`;
                if (p2) formatted += ' ' + p2;
                if (p3) formatted += ' ' + p3;
                if (p4) formatted += ' ' + p4;
                return formatted;
            });
    }

    return '';
}