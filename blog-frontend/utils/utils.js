export function formatDate(datestring){
    return (new Date(datestring)).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}