import { Map } from 'react-kakao-maps-sdk'

export default function KakaoMap() {
    return (
        <div>
            <Map // 지도를 표시할 Container
                center={{
                    // 지도의 중심좌표
                    lat: 33.450701,
                    lng: 126.570667,
                }}
                style={{
                    // 지도의 크기
                    width: '60%',
                    height: '450px',
                }}
                level={3} // 지도의 확대 레벨
            />
        </div>
    )
}
