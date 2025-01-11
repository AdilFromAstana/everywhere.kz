export function formatPrice(price: number) {
    if (price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    } else {
        return '0';
    }
}
