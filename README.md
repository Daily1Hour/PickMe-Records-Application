-   [ ] 기본경로로
-   [ ] AddDetail의 newDetail
-   [ ] 리스트 다시 클릭시 무한 재랜더링
    1.  QaForm의 useEffect와 resetField가 랜더링 후 다시 감지로 반복 수행
    2.  삭제하면 details 변화 감지를 못함 &rarr; 변화 감지는 RecordDetails에서 key로 record.id를 검사해서 하고 있음
    3.  useEffect를 RecordForm에서 수행 &rarr; record 의 변화를 감지해서 랜더링. 세부 렌더링에 걸려서 무한 반복하지는 않음. 랜더링 한 후 감지 후 재랜더링 &rarr; 2번
    4.  RecordDetails에서 key 값으로 JSON.stringify(record). 데이터를 문자열화해서 변화 감지 &rarr; 랜더링 전에 key로 미리 지정. 1번. key가 문자열화한 값은 보기 안좋음
    5.  key에 record.updatedAt. 굿.
