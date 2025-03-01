export const formatearFecha = (fecha: any) => {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Agrega 1 porque los meses empiezan desde 0
        const day = String(date.getDate()).padStart(2, '0'); // "lib":["ES2024","dom"]
        return `${year}-${month}-${day}`;
    };
    
export const formatearHora = (fecha: any) => {
        const date = new Date(String(fecha));
        const hours = String(date.getHours()).padStart(2, '0'); // "lib":["ES2024","dom"]
        const minutes = String(date.getMinutes()).padStart(2, '0'); // "lib":["ES2024","dom"]
        const seconds = String(date.getSeconds()).padStart(2, '0'); // "lib":["ES2024","dom"]
        return `${hours}:${minutes}:${seconds}`;  
    };