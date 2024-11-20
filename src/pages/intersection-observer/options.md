## Intersection Observer API


Intersection Observer API 는 기본적으로 브라우저 Viewport 와 Target 으로 설정한 요소의 교차점을 관찰하여
그  Target 이 Viewport 에 포함되었는지 여부 및 정도를 구별하는 기능을 제공한다.


![intersection-observer](/src/assets/images/intersectionObserver.png)

## Options

Intersection Observer API 의 옵션은 약 3가지(root, rootMargin, threshold)가 존재한다고 볼 수 있다.

### root (not Required)

root 는 지정한 target 의 가시성 확인을 위한 영역 즉 상위 속성이다.
null 또는 미 입력 시, 기본 브라우저의 Viewport 로 설정된다.


### rootMargin (not Required)

root 영역을 넘어 지정한 margin 만큼 범위 확장이 가능한 속성이다.
미 입력 시, 상하좌우 0px 로 적용되며 값 입력 시, 단위 입력을 필수로 요구한다.

### threshold (not Required)

target이 root 영역을 넘어온 정도 즉, 노출되었다고 판단하는 선을 지정하는 속성이다.
이 때, 그 값을 구분하여 정도를 넘었을 경우 지정한 callback 함수를 실행하도록 한다.
미 입력 시, [0] 배열이며, number 단일 값으로도 설정할 수 있다.

- 0 : 기본값, 아예 보이지 않을 때부터 노출됐다고 판단.
- 1 : 요소가 전부 보일 때부터 노출됐다고 판단.


----
### 참고문헌

- [MDN 공식문서](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [kakaoenterprise | Tech&](https://tech.kakaoenterprise.com/149)
