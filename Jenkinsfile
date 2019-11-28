pipeline {
     agent {
            docker {
                image 'node:6-alpine'
            }
        }

    environment {
        CI='true'
    }
    tools { nodejs "node" }

    stages {
        stage('Obtaining dependencies') {
            steps {
                sh "npm install"

            }
        }
        stage('Test stage') {
            steps {
                sh "npm test"
            }
        }
        stage('Build stage') {
            steps {
                sh "npm run build"
            }
        }
    }
}
