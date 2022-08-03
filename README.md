# wanted-3team-tripbtoz

## 커스텀 훅 문서(데이터 불러오기)

### useHotels

**호텔 목록**와 관련된 기능

- 훅을 실행하면 { isLoading, hotels, userHotels, getAllByPage, getResultsByPage } 5개 값을 가진 객체를 반환합니다.

- import할 때 전체 데이터중 첫번째 페이지의 데이터(10개)를 초기값으로 불러옵니다.

- loading은 훅이 데이터를 불러오는 동안 boolean으로 반환한합니다.

- hotels는 현재 페이지까지 불러온 호텔목록 입니다.

- userHotels는 예약한(로컬스토리지에 저장된) 호텔목록입니다.

- getAllByPage에 `(page: number)`를 주고 실행하면 해당 페이지의 데이터를 추가로 요청합니다.

- getResultsByPage에 `(searchParameter: UserDataType, page: number = 1)` 를 주고 실행하면 검색조건에 맞는 새로운데이터를 요청합니다.

```ts
interface UserDataType {
  hotelName: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
}
```
