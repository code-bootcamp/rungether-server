# ๐ 4์กฐ - Rungether

<br><br>

# โจ Rungether ์๊ฐ

**๋ฐ๊ฒ๋**๋ ๋จ์ํ ์ด๋ ๋ชจ์๊ณผ๋ ๋ฌ๋ฆฌ ๋์ ๋น์ทํ ์ด๋ ์ฑํฅ๊ณผ ์ง์ญ,

์ด๋๋ฅ๋ ฅ์ ๊ฐ์ง ์ฌ๋๋ค๊ณผ ์ค์๊ฐ์ผ๋ก ์ํตํ์ฌ ์์๋์ด ํฌ๋ฃจ๋ฅผ ํ์ฑํด์ฃผ๋

์๋น์ค๋ฅผ ์ ๊ณตํฉ๋๋ค!

ํจ๊ป ์ด๋ํ๋ฉฐ ๋๋ง์ ํฌ๋ฃจ๋ฅผ ํ์ฑํด ๋ณด์ธ์!

์์๋์ด๋ฅผ ์ฒ์ ํด๋ณด๋ ์ด๋ณด์๋,

์์๋์ด๋ฅผ ์ฌ๋ํ๋ ์ ๋ฌธ๊ฐ๋ค๋,

๋ชจ๋์ ํจ๊ฒ ์ด์ฐ๋ฌ์ ธ ์ฆ๊ฑฐ์ด ์์๋์ด ํ๋์ ์ฆ๊ธฐ์ค ์ ์์ต๋๋ค!

<br><br>

# ๐ ๋ฐฐํฌ์ฃผ์

**Rungether** : https://rungether.shop

<br><br>

# ๐ถ๏ธ ํ์์๊ฐ

<p align="center">
<img width=80% src=https://user-images.githubusercontent.com/114567220/212851671-8a17421d-abff-4384-9fd4-f578e3ca1884.png>
</p>

<p align="center">
<img width=80% src=https://user-images.githubusercontent.com/114567220/212852263-bf231d11-f08b-4ba0-bba7-22d1a3228906.png>
</p>

<br><br>

# โก๏ธ ๊ธฐ์ ์คํ

<p align="center">
<img width=80% src=https://user-images.githubusercontent.com/114567220/212852404-111ba590-e0fa-4f66-b9cb-73ef26540c5d.png>
</p>

<br><br>

# ๐ซ Data Flow

<p align="center">
<img width=80% src=https://user-images.githubusercontent.com/114567220/212852521-e27291ae-ce95-4640-b35c-715cd4f1ea5a.png>
</p>

<br><br>

# โญ๏ธ ERD

<p align="center">
<img width=80% src=https://user-images.githubusercontent.com/114567220/212852593-9794be08-acf2-4eba-93b4-d9b2bf860732.png>
</p>

<br><br>

# ๐ ํ๋ก์ ํธ ํด๋ ๊ตฌ์กฐ

```
๐ฆF10-team04-server
 โฃ ๐.vscode
 โ โ๐setting.json
 โฃ ๐src
 โ โฃ ๐apis
 โ โ โฃ ๐attendList
 โ โ โ โฃ ๐dto
 โ โ โ โ โ ๐attendList.output.ts
 โ โ โ โฃ ๐entities
 โ โ โ โ โ ๐attendList.entity.ts
 โ โ โ โฃ ๐attendList.module.ts
 โ โ โ โฃ ๐attendList.resolver.ts
 โ โ โ โ ๐attendList.service.ts
 โ โ โฃ ๐auth
 โ โ โ โฃ ๐interface
 โ โ โ โ โ ๐auth-service.interface.ts
 โ โ โ โฃ ๐auth.module.ts
 โ โ โ โฃ ๐auth.resolver.ts
 โ โ โ โ ๐auth.service.ts
 โ โ โฃ ๐boards
 โ โ โ โฃ ๐dto
 โ โ โ โ โฃ ๐attendList.output.ts
 โ โ โ โ โฃ ๐boardAndUser.output.ts
 โ โ โ โ โฃ ๐createBoard.input.ts
 โ โ โ โ โ ๐updateBoard.input.ts
 โ โ โ โฃ ๐entities
 โ โ โ โ โ ๐board.entity.ts
 โ โ โ โฃ ๐boards.module.ts
 โ โ โ โฃ ๐boards.resolver.ts
 โ โ โ โ ๐boards.service.ts
 โ โ โฃ ๐chatHistory
 โ โ โ โฃ ๐entities
 โ โ โ โ โ ๐chatHistory.entity.ts
 โ โ โ โฃ ๐chatHistory.module.ts
 โ โ โ โฃ ๐chatHistory.resolver.ts
 โ โ โ โ ๐chatHistory.service.ts
 โ โ โฃ ๐comments
 โ โ โ โฃ ๐entity
 โ โ โ โ โ ๐comment.entity.ts
 โ โ โ โฃ ๐comments.module.ts
 โ โ โ โฃ ๐comments.resolver.ts
 โ โ โ โ ๐comments.service.ts
 โ โ โฃ ๐files
 โ โ โ โฃ ๐interfaces
 โ โ โ โ โ ๐files-service.interface.ts
 โ โ โ โฃ ๐files.module.ts
 โ โ โ โฃ ๐files.resolver.ts
 โ โ โ โฃ ๐files.service.ts
 โ โ โ โ ๐postman.txt
 โ โ โฃ ๐follow
 โ โ โ โฃ ๐dto
 โ โ โ โ โฃ ๐followerList.output.ts
 โ โ โ โ โ ๐followingList.output.ts
 โ โ โ โฃ ๐entities
 โ โ โ โ โ ๐follow.entity.ts
 โ โ โ โฃ ๐follow.module.ts
 โ โ โ โฃ ๐follow.resolver.ts
 โ โ โ โ ๐follow.service.ts
 โ โ โฃ ๐followCounts
 โ โ โ โ ๐followCount.entity.ts
 โ โ โฃ ๐Image
 โ โ โ โฃ ๐dto
 โ โ โ โ โ ๐image.input.ts
 โ โ โ โฃ ๐entities
 โ โ โ โ โ ๐image.entity.ts
 โ โ โ โฃ ๐images.module.ts
 โ โ โ โฃ ๐images.resolver.ts
 โ โ โ โ ๐images.service.ts
 โ โ โฃ ๐like
 โ โ โ โฃ ๐entities
 โ โ โ โ โ ๐like.entity.ts
 โ โ โ โฃ ๐like.module.ts
 โ โ โ โฃ ๐like.resolver.ts
 โ โ โ โ ๐like.service.ts
 โ โ โฃ ๐location
 โ โ โ โฃ ๐dto
 โ โ โ โ โ ๐location.input.ts
 โ โ โ โ ๐entities
 โ โ โ โ โ ๐location.entity.ts
 โ โ โฃ ๐mails
 โ โ โ โฃ ๐mails.module.ts
 โ โ โ โฃ ๐mails.resolver.ts
 โ โ โ โ ๐mails.service.ts
 โ โ โฃ ๐nestedComments
 โ โ โ โฃ ๐entity
 โ โ โ โ โ ๐nestedComment.entity.ts
 โ โ โ โฃ ๐nestedComments.module.ts
 โ โ โ โฃ ๐nestedComments.resolver.ts
 โ โ โ โ ๐nestedComments.service.ts
 โ โ โฃ ๐picks
 โ โ โ โฃ ๐dto
 โ โ โ โ โ ๐picksWithBoard.output.ts
 โ โ โ โฃ ๐entities
 โ โ โ โ โ ๐pick.entity.ts
 โ โ โ โฃ ๐picks.module.ts
 โ โ โ โฃ ๐picks.resolver.ts
 โ โ โ โ ๐picks.service.ts
 โ โ โฃ ๐reviewBoards
 โ โ โ โฃ ๐dto
 โ โ โ โ โฃ ๐createReviewBoard.input.ts
 โ โ โ โ โ ๐updateReviewBoard.input.ts
 โ โ โ โฃ ๐entities
 โ โ โ โ โ ๐reviewBoard.entity.ts
 โ โ โ โฃ ๐reviewBoards.module.ts
 โ โ โ โฃ ๐reviewBoards.resolver.ts
 โ โ โ โ ๐reviewBoards.service.ts
 โ โ โฃ ๐reviewComments
 โ โ โ โฃ ๐entities
 โ โ โ โ โ ๐reviewComment.entity.ts
 โ โ โ โฃ ๐reviewComments.module.ts
 โ โ โ โฃ ๐reviewComments.resolver.ts
 โ โ โ โ ๐reviewComments.service.ts
 โ โ โฃ ๐reviewImage
 โ โ โ โฃ ๐entities
 โ โ โ โ โ ๐reviewImage.entity.ts
 โ โ โ โฃ ๐reviewsImages.module.ts
 โ โ โ โฃ ๐reviewsImages.resolver.ts
 โ โ โ โ ๐reviewsImages.service.ts
 โ โ โฃ ๐reviewNestedComments
 โ โ โ โฃ ๐entities
 โ โ โ โ โ ๐reviewNestedComments.entity.ts
 โ โ โ โฃ ๐reviewNestedComments.module.ts
 โ โ โ โฃ ๐reviewNestedComments.resolver.ts
 โ โ โ โ ๐reviewNestedComments.service.ts
 โ โ โฃ ๐users
 โ โ โ โฃ ๐dto
 โ โ โ โ โฃ ๐create-user.input.ts
 โ โ โ โ โ ๐update-board.input.ts
 โ โ โ โฃ ๐entities
 โ โ โ โ โ ๐user.entity.ts
 โ โ โ โฃ ๐interfaces
 โ โ โ โ โ ๐users-service.interface.ts
 โ โ โ โฃ ๐users.module.ts
 โ โ โ โฃ ๐users.resolver.ts
 โ โ โ โ ๐users.service.ts
 โ โ โ ๐.DS_Store
 โ โฃ ๐commons
 โ โ โฃ ๐auth
 โ โ โ โฃ ๐gql-auth.guard.ts
 โ โ โ โฃ ๐jwt-access.strategy.ts
 โ โ โ โฃ ๐jwt-refresh.strategy.ts
 โ โ โ โ ๐wsGuard.ts
 โ โ โฃ ๐filter
 โ โ โ โ ๐http-exception.fillter.ts
 โ โ โฃ ๐graphql
 โ โ โ โ ๐schema.gql
 โ โ โฃ ๐libraries
 โ โ โ โ ๐utils.ts
 โ โ โ ๐type
 โ โ โ โ ๐context.ts
 โ โฃ ๐gateways
 โ โ โฃ ๐chat.gateway.ts
 โ โ โฃ ๐chat.module.ts
 โ โ โ ๐chat.service.ts
 โ โฃ ๐.DS_Store
 โ โฃ ๐app.controller.ts
 โ โฃ ๐app.module.ts
 โ โฃ ๐app.service.ts
 โ โ ๐main.ts
 โฃ ๐test
 โ โฃ ๐app.e2e-spec.ts
 โ โฃ ๐git-test.ts
 โ โ ๐jest-e2e.json
 โฃ ๐.DS_Store
 โฃ ๐.dockerignore
 โฃ ๐.env
 โฃ ๐.env.docker
 โฃ ๐.gitignore
 โฃ ๐Dockerfile
 โฃ ๐Dockerfile.prod
 โฃ ๐README.md
 โฃ ๐cloudbuild.yaml
 โฃ ๐docker-compose.dev.yaml
 โฃ ๐docker-compose.prod.yaml
 โฃ ๐docker-compose.stage.yaml
 โฃ ๐docker-compose.yaml
 โฃ ๐nest-cli.json
 โฃ ๐package-lock.json
 โฃ ๐package.json
 โฃ ๐tsconfig.build.json
 โฃ ๐tsconfig.json
 โ ๐yarn.lock
```

<br><br>

# ๐ env

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
