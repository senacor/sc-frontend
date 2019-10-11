pipeline {
    agent any

    stages {
        stage('Obtaining dependencies') {
            steps {
                sh "npm install"

            }
        }
       stage('Test stage') {
           steps {
               sh "npm run test"
           }
       }
        stage('Build stage') {
            steps {
                sh "npm run build"
            }
        }
    }
}
