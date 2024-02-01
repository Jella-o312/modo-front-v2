import { useState } from "react";
import Calendar from "react-calendar";
import './MoimDetail-BoardComponent.css';
// import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import moment from 'moment';
import 'moment/locale/ko';  // 요일 한글로 구하려면 필요
import { Modal } from "react-bootstrap";

const MoimDetailBoardComponent = ()=>{
  //⭐임시⭐
  const [date, setDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState([]);
  // moment.locale('ko');

  //⭐임시⭐
  const addMarkToCalendar = (date) => {
    // 선택한 날짜에 이미 마크가 있는지 확인
    const dateString = date.toDateString();
    // 마크 추가 또는 개수 증가
    setMarkedDates((prevMarkedDates) => {
      const updatedMarkedDates = { ...prevMarkedDates };
      if (updatedMarkedDates[dateString] === 1) {
        // 이미 한 개의 별이 있으면 두 개로 업데이트
        updatedMarkedDates[dateString] = 2;
      } else {
        // 아직 별이 없으면 한 개로 추가
        updatedMarkedDates[dateString] = 1;
      }
      return updatedMarkedDates;
    });
  };
  
  //⭐임시⭐
  const tileContent = ({ date, view }) => {
    // 달력에 표시할 마크
    const dateString = date.toDateString();
    const markCount = markedDates[dateString] || 0;
  
    if (view === 'month' && markCount > 0) {
      return (
        <span role="img" aria-label="star" style={{fontSize: 'x-small'}}>
          {markCount === 1 ? '🟣' : '🟣🟡'}
        </span>
      );
    }
  };

  //⭐임시_Dday 계산⭐
  const moimScheduleDday = (date) => {
    // 오늘 날짜
    const today = moment().startOf('day');
    // 선택한 날짜
    const selectedDate = moment(date).startOf('day');
    // 오늘 날짜와 선택한 날짜의 차이를 계산하여 반환
    const remainingDays = selectedDate.diff(today, 'days');
    return remainingDays;
  };
  
  //⭐임시 모임일정 데이터⭐
  const imsiScheduleData = [
    {
      id : 1,
      title : '🏸정기민턴🏸',
      startDate: '12/13',
      endDate : '',
      startDay : '(수)',
      endDay : '',
      dDay : 2,
      startTime : '16:00',
      endTime : '20:00',
      place : '계양 실내 배드민턴장',
      price : '입장료 5,000원',
      joinMember : 19,
      maxMamber : 25,
      moimType : '정기'
    }
    // ,
    // {
    //   id : 2,
    //   title : '🏆연말 배드민턴 대회🏆',
    //   startDate: '12/23',
    //   endDate : '12/24',
    //   startDay : '(토)',
    //   endDay : '(일)',
    //   dDay : 12,
    //   startTime : '14:00',
    //   endTime : '12:00',
    //   place : '계양구 구민체육관 2관',
    //   price : '입장료 30,000원',
    //   joinMember : 29,
    //   maxMamber : 40,
    //  moimType : '비정기'
    // }
    ];

    const [addScheduleModal, setAddScheduleModal] = useState(false);

    console.log(imsiScheduleData.length);
  return(
    <div className="moimDetail-calendar-container">
    <div className="moimDetail-calendarBox">
      <Calendar onChange={setDate} 
                value={date} 
                formatDay={(locale, date) => moment(date).format("D")}
                tileContent={tileContent}
      />

    
      {/* ⭐임시⭐ */}
      <div>
        <span> {moment(date).format("YYYY년 M월 D일")} </span>
        <button onClick={()=>addMarkToCalendar(date)}>일정 추가하기</button>
      </div>  
    </div>

    <div className="moimDetail-calendar-scheduleBox">
      {
        imsiScheduleData.map((data, i)=>(
          <div className="moimDetail-calendar-schedule" key={i}>
            <div className="moimDetail-calendar-schedule-header">
              {/* 클릭한 날짜 (추후에 오늘을 기본으로 바꿔야할듯, 혹은 날짜를 클릭해주세요나)*/}
              <span>{moment(date).format("M월 D일 (ddd)", 'ko')}</span> 
              <div>{moimScheduleDday(date) === 0 ? 'Today' : `D-${moimScheduleDday(date)}`}</div>
            </div>

            <div className="moimDetail-calendar-schedule-body">
              <div className="moimDetail-calendar-schedule-body-title">
                <span style={{color: data.moimType === '정기' ? '#9087d3' : 'sandybrown', marginRight: '0.5rem', lineHeight: '2rem'}}>●</span>
                <div>{data.title}</div>
              </div>
              <div className="moimDetail-calendar-schedule-body-contentBox">
                {data.endDate === '' ?
                  <div className='moimDetail-moimContent-board-schedule-content-data'>
                    <span>일시</span><div>{data.startDate} {data.startDay} {data.startTime} ~ {data.endTime}</div>
                  </div>
                :
                  <div className='moimDetail-moimContent-board-schedule-content-data'>
                    <span>일시</span><div>{data.startDate} {data.startDay} {data.startTime} ~ {data.endDate} {data.endDay} {data.endTime}</div>
                  </div>
                }
                  <div className="moimDetail-moimContent-board-schedule-content-data">
                    <span>위치</span><div>{data.place}</div>
                  </div>
                  <div className="moimDetail-moimContent-board-schedule-content-data">
                    <span>비용</span><div>{data.price}</div>
                  </div>
              </div>
              <div className='moimDetail-moimContent-board-schedule-content-member'><span>{data.joinMember}</span> / {data.maxMamber}명</div> 
            </div>
          </div>
        ))
      }
      { imsiScheduleData.length >=1 &&
        <div className="moimDetail-calendar-scheduleAdd" onClick={()=>setAddScheduleModal(true)}>
          <span>+</span>모임 일정 추가하기
        </div>
      }
    </div>


    <Modal
        show={addScheduleModal}
        size="lg"
        onHide={() => setAddScheduleModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          <span style={{color: '#9087d3'}}>{moment(date).format("M월 D일 (ddd)", 'ko')}</span> 모임 일정 추가하기
          </Modal.Title>
        </Modal.Header>
 
        <Modal.Body>
          <div className="moimDetail-calendar-scheduleAdd-infoBox" style={{height: '30rem'}}>
            <div className="moimDetail-calendar-scheduleAdd-info">
              <span>일정 제목</span>
              <input></input>
            </div>
            <div className="moimDetail-calendar-scheduleAdd-info">
              <span>날짜</span>
              <input></input>
            </div>
            <div className="moimDetail-calendar-scheduleAdd-info">
              <span>시간 </span>
              <input></input>
            </div>
            <div className="moimDetail-calendar-scheduleAdd-info">
              <span>위치 </span>
              <input></input>
            </div>
            <div className="moimDetail-calendar-scheduleAdd-info">
              <span>비용 </span>
              <input></input>
            </div>
            <div className="moimDetail-calendar-scheduleAdd-info">
              <span>기타사항 </span>
              <input></input>
            </div>
            <div className="moimDetail-calendar-scheduleAdd-info">
              <span>참여자 수 </span>
              <input></input>
            </div>
          </div>
          <button>일정 추가</button>
        </Modal.Body>
      </Modal>
    
    
    
 </div>
  )
}

export default MoimDetailBoardComponent;

