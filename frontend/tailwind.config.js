/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#1a202c', // Color primario personalizado
        'secondary': '#2d3748', // Color secundario personalizado
      },
      borderColor: {
        DEFAULT: '#e2e8f0', // Color por defecto de los bordes
      },
      borderWidth: {
        DEFAULT: '1px', // Ancho por defecto de los bordes
      },
      borderRadius: {
        DEFAULT: '0.375rem', // Radio de bordes por defecto
      },
    },
  },
  plugins: [],
});
