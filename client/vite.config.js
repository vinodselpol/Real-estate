import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({

  // proxy tp the localhost address
  server:{
    proxy:{
      '/api': {
        target:'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
