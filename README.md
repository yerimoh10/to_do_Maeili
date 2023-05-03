# to_do_Maeili
2023_1 캡스톤디자인 팀프로젝트
 to_do_Maeili
2023_1 캡스톤디자인 팀프로젝트

‼️ ‼️ 계속 수정된 파일이 올라가고 있으니 코딩 작업 전에 최신 git과 비교 후 새로 업데이트 된 부분 있으면  ‼️ ‼️ ‼️ 꼭 ‼️ ‼️ ‼️ `git pull origin master` 먼저 하고 작업 시작해주세요!! pull 안하고 작업하면 충돌 생겨서 파일들 그냥 날라갈 수도 있어요ㅠㅠㅠ


## 프로젝트 환경 설정 단계
1. Visual Studio Code 설치
2. 안드로이드 스튜디오 설치 - 최종적으로 앱 베포할 때 도움받기 위함 
3. node, npm 설치
   링크(누르면 설치됨) : https://nodejs.org/dist/v16.16.0/node-v16.16.0-x64.msi
4. npm은 자바스크립트의 기능을 가저오는 도구인데, npm에 있는 또 다른 도구인 yarn을 설치해야 함

   컴퓨터 cmd 창에 들어가서 `npm install -g yarn` 입력하여 설치 
5. expo 설치

   아까 yarn 설치했던 cmd 창에다 바로 명령어 입력하여 expo 설치 
  `npm install -g expo-cli`

6. expo 서비스 가입  https://expo.io/signup
7. 컴퓨터 cmd 창에서 expo 서비스 로그인 하기

    `expo login --username "@@"` @@ ← expo 가입한 자기 id 입력

    비밀번호 입력하라고 하면 비밀번호 입력하기

각자 컴퓨터에서 expo 활용할 수 있는 환경 된 것! 


---
1. 프로젝트 폴더 만들기

2. 폴더에서 Visual Studio Code 열고, terminal 창 열기
3. (git이 설치되어 있다는 가정 하에) terminal 창에서 Git Bash 창 열기 

   ![image](https://user-images.githubusercontent.com/88430021/231846204-0dfa7d12-5688-477d-b94d-789e49eabba2.png)

4. `git clone https://github.com/yerimoh10/to_do_Maeili.git` 입력하기
   
   입력하면 아래 사진 처럼 만든 폴더 아래에 git에서 받은 폴더가 생성됨
   
   ![image](https://user-images.githubusercontent.com/88430021/231846713-e51398c5-71af-4288-b794-cfb7faa088da.png)

5. terminal 창 중에서 cmd 창으로 들어가 `cd to_do_Maeili` 입력하여 위치를 이동한다.
   
   ![image](https://user-images.githubusercontent.com/88430021/231847045-4f36cb33-bcb9-4ed9-951d-21d982d7a61b.png)
   
   이동 후  --> ![image](https://user-images.githubusercontent.com/88430021/231847524-d760df98-366f-4cb2-ac7e-94d83da15fcb.png)


6. 폴더에 있는 파일 중 `yarn.lock` , `package-lock.json` (있으면) 파일을 삭제한다.
   
   ![image](https://user-images.githubusercontent.com/88430021/231847787-99717748-bc08-4486-aec0-68978a0211ae.png)

7. terminal - cmd 창에서 `npm install` 해준다.
   
   ![image](https://user-images.githubusercontent.com/88430021/231848100-a1eb9ed9-286f-43b2-b6c6-2f70ed7a43a3.png)


8. terminal - cmd 에서 `expo start` 입력하면르면 expo 가 실행됨. 

   ※※주의※※ 

   `expo start` 명령어는 꼭!! Visual Studio Code의 terminal 종류 중 `cmd`에서 입력해야 실행됨!! 
   
   명령어 입력할 떄 terminal 창을 크게 만들고 명령어 실행하는게 큐알코드가 짤리지 않음!! 

9. 큐알을 실행하기 위해서는 플레이 스토어, 앱스토어에서 **`expo Go`** 앱을 다운 받아야 함. 
10. 핸드폰으로 큐알 코드 찍으면 핸드폰으로 작성한 앱 화면 확인 가능

   🌟🌟🌟여기서 주의해야 할 점은 컴퓨터의 네트워크와 핸드폰의 네트워크가 동일한 망에 있어야 한다는 점🌟🌟🌟 
   
   (이 말은, 동일한 와이파이를 사용해야 한다.)
   
 ※ 작업할 때 주의할 점!! ※
 
 ‼️ 수정된 파일이 있을 경우 프로젝트 terminal에서 ‼️무조건‼️ `git pull origin master`하고 프로젝트에 원격 저장소에 올라온 새 파일들 자기 로컬 저장소에 옮기고 작업 시작해야 함! 

  
   
