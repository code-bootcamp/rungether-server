# 🏃 4조 - Rungether

<br><br>

# ✨ Rungether 소개

**런게더**는 단순한 운동 모임과는 달리 나와 비슷한 운동 성향과 지역,

운동능력을 가진 사람들과 실시간으로 소통하여 아웃도어 크루를 형성해주는

서비스를 제공합니다!

함께 운동하며 나만의 크루를 형성해 보세요!

아웃도어를 처음 해보는 초보자도,

아웃도어를 사랑하는 전문가들도,

모두와 함게 어우러져 즐거운 아웃도어 활동을 즐기실 수 있습니다!

<br><br>

# 🙌 배포주소

**Rungether** : https://rungether.shop

<br><br>

# 🕶️ 팀원소개

<p align="center">
<img width=80% src=https://user-images.githubusercontent.com/114567220/212851671-8a17421d-abff-4384-9fd4-f578e3ca1884.png>
</p>

<p align="center">
<img width=80% src=https://user-images.githubusercontent.com/114567220/212852263-bf231d11-f08b-4ba0-bba7-22d1a3228906.png>
</p>

<br><br>

# ⚡️ 기술스택

<p align="center">
<img width=80% src=https://user-images.githubusercontent.com/114567220/212852404-111ba590-e0fa-4f66-b9cb-73ef26540c5d.png>
</p>

<br><br>

# 💫 Data Flow

<p align="center">
<img width=80% src=https://user-images.githubusercontent.com/114567220/212852521-e27291ae-ce95-4640-b35c-715cd4f1ea5a.png>
</p>

<br><br>

# ⭐️ ERD

<p align="center">
<img width=80% src=https://user-images.githubusercontent.com/114567220/212852593-9794be08-acf2-4eba-93b4-d9b2bf860732.png>
</p>

<br><br>

# 📂 프로젝트 폴더 구조

```
📦F10-team04-server
 ┣ 📂.vscode
 ┃ ┗📜setting.json
 ┣ 📂src
 ┃ ┣ 📂apis
 ┃ ┃ ┣ 📂attendList
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┗ 📜attendList.output.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜attendList.entity.ts
 ┃ ┃ ┃ ┣ 📜attendList.module.ts
 ┃ ┃ ┃ ┣ 📜attendList.resolver.ts
 ┃ ┃ ┃ ┗ 📜attendList.service.ts
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📂interface
 ┃ ┃ ┃ ┃ ┗ 📜auth-service.interface.ts
 ┃ ┃ ┃ ┣ 📜auth.module.ts
 ┃ ┃ ┃ ┣ 📜auth.resolver.ts
 ┃ ┃ ┃ ┗ 📜auth.service.ts
 ┃ ┃ ┣ 📂boards
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜attendList.output.ts
 ┃ ┃ ┃ ┃ ┣ 📜boardAndUser.output.ts
 ┃ ┃ ┃ ┃ ┣ 📜createBoard.input.ts
 ┃ ┃ ┃ ┃ ┗ 📜updateBoard.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜board.entity.ts
 ┃ ┃ ┃ ┣ 📜boards.module.ts
 ┃ ┃ ┃ ┣ 📜boards.resolver.ts
 ┃ ┃ ┃ ┗ 📜boards.service.ts
 ┃ ┃ ┣ 📂chatHistory
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜chatHistory.entity.ts
 ┃ ┃ ┃ ┣ 📜chatHistory.module.ts
 ┃ ┃ ┃ ┣ 📜chatHistory.resolver.ts
 ┃ ┃ ┃ ┗ 📜chatHistory.service.ts
 ┃ ┃ ┣ 📂comments
 ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┗ 📜comment.entity.ts
 ┃ ┃ ┃ ┣ 📜comments.module.ts
 ┃ ┃ ┃ ┣ 📜comments.resolver.ts
 ┃ ┃ ┃ ┗ 📜comments.service.ts
 ┃ ┃ ┣ 📂files
 ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┗ 📜files-service.interface.ts
 ┃ ┃ ┃ ┣ 📜files.module.ts
 ┃ ┃ ┃ ┣ 📜files.resolver.ts
 ┃ ┃ ┃ ┣ 📜files.service.ts
 ┃ ┃ ┃ ┗ 📜postman.txt
 ┃ ┃ ┣ 📂follow
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜followerList.output.ts
 ┃ ┃ ┃ ┃ ┗ 📜followingList.output.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜follow.entity.ts
 ┃ ┃ ┃ ┣ 📜follow.module.ts
 ┃ ┃ ┃ ┣ 📜follow.resolver.ts
 ┃ ┃ ┃ ┗ 📜follow.service.ts
 ┃ ┃ ┣ 📂followCounts
 ┃ ┃ ┃ ┗ 📜followCount.entity.ts
 ┃ ┃ ┣ 📂Image
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┗ 📜image.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜image.entity.ts
 ┃ ┃ ┃ ┣ 📜images.module.ts
 ┃ ┃ ┃ ┣ 📜images.resolver.ts
 ┃ ┃ ┃ ┗ 📜images.service.ts
 ┃ ┃ ┣ 📂like
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜like.entity.ts
 ┃ ┃ ┃ ┣ 📜like.module.ts
 ┃ ┃ ┃ ┣ 📜like.resolver.ts
 ┃ ┃ ┃ ┗ 📜like.service.ts
 ┃ ┃ ┣ 📂location
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┗ 📜location.input.ts
 ┃ ┃ ┃ ┗ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜location.entity.ts
 ┃ ┃ ┣ 📂mails
 ┃ ┃ ┃ ┣ 📜mails.module.ts
 ┃ ┃ ┃ ┣ 📜mails.resolver.ts
 ┃ ┃ ┃ ┗ 📜mails.service.ts
 ┃ ┃ ┣ 📂nestedComments
 ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┗ 📜nestedComment.entity.ts
 ┃ ┃ ┃ ┣ 📜nestedComments.module.ts
 ┃ ┃ ┃ ┣ 📜nestedComments.resolver.ts
 ┃ ┃ ┃ ┗ 📜nestedComments.service.ts
 ┃ ┃ ┣ 📂picks
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┗ 📜picksWithBoard.output.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜pick.entity.ts
 ┃ ┃ ┃ ┣ 📜picks.module.ts
 ┃ ┃ ┃ ┣ 📜picks.resolver.ts
 ┃ ┃ ┃ ┗ 📜picks.service.ts
 ┃ ┃ ┣ 📂reviewBoards
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createReviewBoard.input.ts
 ┃ ┃ ┃ ┃ ┗ 📜updateReviewBoard.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜reviewBoard.entity.ts
 ┃ ┃ ┃ ┣ 📜reviewBoards.module.ts
 ┃ ┃ ┃ ┣ 📜reviewBoards.resolver.ts
 ┃ ┃ ┃ ┗ 📜reviewBoards.service.ts
 ┃ ┃ ┣ 📂reviewComments
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜reviewComment.entity.ts
 ┃ ┃ ┃ ┣ 📜reviewComments.module.ts
 ┃ ┃ ┃ ┣ 📜reviewComments.resolver.ts
 ┃ ┃ ┃ ┗ 📜reviewComments.service.ts
 ┃ ┃ ┣ 📂reviewImage
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜reviewImage.entity.ts
 ┃ ┃ ┃ ┣ 📜reviewsImages.module.ts
 ┃ ┃ ┃ ┣ 📜reviewsImages.resolver.ts
 ┃ ┃ ┃ ┗ 📜reviewsImages.service.ts
 ┃ ┃ ┣ 📂reviewNestedComments
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜reviewNestedComments.entity.ts
 ┃ ┃ ┃ ┣ 📜reviewNestedComments.module.ts
 ┃ ┃ ┃ ┣ 📜reviewNestedComments.resolver.ts
 ┃ ┃ ┃ ┗ 📜reviewNestedComments.service.ts
 ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜create-user.input.ts
 ┃ ┃ ┃ ┃ ┗ 📜update-board.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜user.entity.ts
 ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┗ 📜users-service.interface.ts
 ┃ ┃ ┃ ┣ 📜users.module.ts
 ┃ ┃ ┃ ┣ 📜users.resolver.ts
 ┃ ┃ ┃ ┗ 📜users.service.ts
 ┃ ┃ ┗ 📜.DS_Store
 ┃ ┣ 📂commons
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜gql-auth.guard.ts
 ┃ ┃ ┃ ┣ 📜jwt-access.strategy.ts
 ┃ ┃ ┃ ┣ 📜jwt-refresh.strategy.ts
 ┃ ┃ ┃ ┗ 📜wsGuard.ts
 ┃ ┃ ┣ 📂filter
 ┃ ┃ ┃ ┗ 📜http-exception.fillter.ts
 ┃ ┃ ┣ 📂graphql
 ┃ ┃ ┃ ┗ 📜schema.gql
 ┃ ┃ ┣ 📂libraries
 ┃ ┃ ┃ ┗ 📜utils.ts
 ┃ ┃ ┗ 📂type
 ┃ ┃ ┃ ┗ 📜context.ts
 ┃ ┣ 📂gateways
 ┃ ┃ ┣ 📜chat.gateway.ts
 ┃ ┃ ┣ 📜chat.module.ts
 ┃ ┃ ┗ 📜chat.service.ts
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜app.controller.ts
 ┃ ┣ 📜app.module.ts
 ┃ ┣ 📜app.service.ts
 ┃ ┗ 📜main.ts
 ┣ 📂test
 ┃ ┣ 📜app.e2e-spec.ts
 ┃ ┣ 📜git-test.ts
 ┃ ┗ 📜jest-e2e.json
 ┣ 📜.DS_Store
 ┣ 📜.dockerignore
 ┣ 📜.env
 ┣ 📜.env.docker
 ┣ 📜.gitignore
 ┣ 📜Dockerfile
 ┣ 📜Dockerfile.prod
 ┣ 📜README.md
 ┣ 📜cloudbuild.yaml
 ┣ 📜docker-compose.dev.yaml
 ┣ 📜docker-compose.prod.yaml
 ┣ 📜docker-compose.stage.yaml
 ┣ 📜docker-compose.yaml
 ┣ 📜nest-cli.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜tsconfig.build.json
 ┣ 📜tsconfig.json
 ┗ 📜yarn.lock
```

<br><br>

# 🔒 env

```
DATABASE_TYPE
DATABASE_HOST
DATABASE_PORT
DATABASE_USERNAME
DATABASE_PASSWORD
DATABASE_DATABASE

EMAIL_SENDER
EMAIL_PASS

JWT_ACCESS_KEY
JWT_REFRESH_KEY

GCP_ID
GCP_KEY_FILE_NAME
GCP_BUCKET_NAME

MONGO_URI
```
