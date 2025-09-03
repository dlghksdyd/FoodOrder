import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/', // 배포 루트(서브앱이 아니라면 '/')
  build: {
    // ASP.NET 프로젝트의 wwwroot로 바로 출력
    outDir: 'C:/workspace/FoodOrder/FoodOrder/wwwroot',
    emptyOutDir: true, // 빌드 시 기존 파일 정리
  },
  server: {
    // 개발 중 Vite → ASP.NET API 프록시 (선택)
    proxy: {
      '/api': 'http://localhost:5000' // 실제 백엔드 포트에 맞게
    }
  }
})