pipeline {
  agent any

  stages {
    stage('Prune docker images') {
      steps {
        sh "docker image prune -f"

      }
    }
    stage('Build frontend npm build engine') {
      steps {
        sh "docker build -t npm_build_engine ."
      }
    }
    stage('npm test') {
      steps {
        sh " docker run npm_build_engine:latest npm test"
      }
    }
    stage('npm build') {
      steps {
        sh " docker run npm_build_engine:latest npm build"
      }
    }
  }
}
