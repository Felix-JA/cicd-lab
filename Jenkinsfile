pipeline {
    agent any

    environment {
        REGISTRY = '192.168.127.129:5000'
        BACKEND_IMAGE = "${REGISTRY}/lab-backend"
        FRONTEND_IMAGE = "${REGISTRY}/lab-frontend"
    }

    stages {
        stage('Clonar repositorio') {
            steps {
                echo 'Clonando codigo desde GitHub...'
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                echo 'Construyendo imagen del backend...'
                sh 'docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} ./backend'
                sh 'docker tag ${BACKEND_IMAGE}:${BUILD_NUMBER} ${BACKEND_IMAGE}:latest'
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Construyendo imagen del frontend...'
                sh 'docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} ./frontend'
                sh 'docker tag ${FRONTEND_IMAGE}:${BUILD_NUMBER} ${FRONTEND_IMAGE}:latest'
            }
        }

        stage('Push al Registry') {
            steps {
                echo 'Subiendo imagenes al registry local...'
                sh 'docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}'
                sh 'docker push ${BACKEND_IMAGE}:latest'
                sh 'docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}'
                sh 'docker push ${FRONTEND_IMAGE}:latest'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Desplegando contenedores...'
                sh '''
                    docker stop backend frontend || true
                    docker rm backend frontend || true
                    docker run -d --name backend --network lab-network -p 3000:3000 ${BACKEND_IMAGE}:latest
                    docker run -d --name frontend --network lab-network -p 80:80 ${FRONTEND_IMAGE}:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado exitosamente!'
        }
        failure {
            echo 'El pipeline fallo. Revisar los logs.'
        }
    }
}
