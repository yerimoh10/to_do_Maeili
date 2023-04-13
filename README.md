# to_do_Maeili
2023_1 캡스톤디자인 팀프로젝트

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
으로 git에서 pull 받아서 코드 보기
2. 폴더에서 Visual Studio Code 열고, terminal 창 열기
3. terminal에서 `expo init capstone-design-sevenDays` 입력하기

   (capstone-design-sevenDays)라는 폴더가 생기게 되는 것)

4. 엔터 키 누르면 사진 같은 화면 뜸. `blank` 선택하고 엔터 

![image](https://user-images.githubusercontent.com/88430021/231447166-36e6811a-4709-40b5-88d1-08053b912350.png)

5. 현재 위치 확인하고, capstone-design-sevenDays로 cd 명령어 이용하여 이동하기 `cd capstone-design-sevenDays` 

![image](https://user-images.githubusercontent.com/88430021/231447394-57128415-db46-4cf7-ab00-7be27ba174a5.png)

6. terminal 에서 `expo start` 누르면 expo 가 실행됨. 
   
   ※※주의※※ 
   
   `expo start` 명령어는 Visual Studio Code의 terminal 종류 중 `cmd`에서 입력해야 실행됨!!
   ![image](https://user-images.githubusercontent.com/88430021/231456544-2022a87d-5447-4187-8dab-30db3796c702.png)


7. cmd 창에서 명령어 실행하면 **큐알 코드** 나옴. 
8. 큐알을 실행하기 위해서는 플레이 스토어, 앱스토어에서 **`expo Go`** 앱을 다운 받아야 함. 
9. 핸드폰으로 큐알 코드 찍으면 핸드폰으로 작성한 앱 화면 확인 가능

   🌟🌟🌟여기서 주의해야 할 점은 컴퓨터의 네트워크와 핸드폰의 네트워크가 동일한 망에 있어야 한다는 점🌟🌟🌟  (이 말은, 동일한 와이파이를 사용해야 한다.)

