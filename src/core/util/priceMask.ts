export default function execPriceMask(value: string, currency = true) {
    const isNegative = value.startsWith('-');
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    const result = isNegative ? `-${formattedValue}` : formattedValue;

    return currency ? `${result} ₸` : result;
}
