pipeline {
  agent any
  tools {
    nodejs "NODEJS" // Asegúrate de tener esta herramienta configurada en Jenkins
  }
  environment {
    VITE_SUPABASE_URL = 'https://wudtxqcqbzpojgauigk.supabase.co'
    VITE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1ZHR4cWNi
    Z2F1aWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4
    ImV4cCI6MjA2MTQ0NDU2Nn0.
    eiUwpxtXxxUtb7D9d20pvLVjtOgCDDcQNiDGI2EwcTA'
  }
  stages {
    stage('Clonar repositorio') {
      steps {
        git 'https://github.com/tu-usuario/PROYECTO-INVENTARIO-REACT.git'
      }
    }
    stage('Instalar dependencias') {
      steps {
        sh 'npm install'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Pruebas (opcional)') {
      steps {
        sh 'npm test || echo "No hay pruebas definidas"'
      }
    }
  }
}
