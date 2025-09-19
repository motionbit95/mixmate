# Choppi (쵸피)

식사 메이트 매칭 서비스를 위한 React 웹 애플리케이션입니다.

## 특징

- **Mock Database**: Firebase 대신 로컬 mock 데이터를 사용하여 포트폴리오용으로 최적화
- **사용자 매칭**: 거리순, 랜덤 방식으로 식사 파트너 매칭
- **채팅 시스템**: 매칭된 사용자와의 실시간 채팅 (모의)
- **관리자 대시보드**: 사용자, 결제, 매칭 관리
- **반응형 디자인**: Chakra UI를 사용한 모던한 UI

## 기술 스택

- React 18
- Chakra UI
- React Router
- Mock Database (Firebase 대체)

## 설치 및 실행

```bash
npm install
npm start
```

## 포트폴리오 노트

이 프로젝트는 원래 Firebase를 사용했지만, 포트폴리오 목적으로 mock 데이터를 사용하도록 리팩토링되었습니다. 모든 데이터베이스 호출은 로컬 mock 함수로 대체되어 외부 의존성 없이 실행됩니다.
