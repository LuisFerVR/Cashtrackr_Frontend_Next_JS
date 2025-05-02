export function formatCurrency(quantity: number){
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(quantity);
}

export function formatDate(isoString: string) {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    };
    return new Date(isoString).toLocaleDateString('es-ES', options);
}