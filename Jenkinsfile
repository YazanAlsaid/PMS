node ('docker'){
    checkout scm
    tag = "latest"
    appName = "pms"
    imageName = "${appName}:${tag}"
    env.DOCKER_API_VERSION = "1.23"
    env.BUILDIMG = imageName

    stage "Compose down"
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            sh "docker-compose -p ${appName} down"
        }
    
    stage "Compose Build"
        sh "cd ./parking-backend && ls -lah && mvn clean package"
        sh "docker-compose build"
    
     stage "Compose up"
        sh "docker-compose -p ${appName} up -d"
}