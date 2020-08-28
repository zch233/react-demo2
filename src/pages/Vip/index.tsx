import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import AliIcon from '../../components/AliIcon';
import { Button } from 'antd';
import { StoreContext } from '../../index';
import BuyVipModal from './BuyVipModal';

const Activity = styled.section`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 30px;
  display: flex;
  text-align: center;
  margin-top: 15px;
  .activityItem {
    color: #31708f;
    display: inline-flex;
    flex-direction: column;
    margin-right: 30px;
    p {
      border-radius: 50%;
      overflow: hidden;
      display: inline-block;
    }
    svg {
      font-size: 120px;
      padding: 20px;
      background-color: rgb(217, 237, 247);
    }
  }
`;
const Section = styled.section`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 30px;
  margin-top: 15px;
  h3 {
    vertical-align: middle;
    font-size: 20px;
    text-shadow: 0 3px 5px rgba(179, 141, 57, 0.8);
    font-weight: bold;
  }
  .brand {
    vertical-align: text-bottom;
    display: inline-block;
    width: 69px;
    font-size: 12px;
    text-align: center;
    color: #8b6822;
    height: 22px;
    line-height: 22px;
    margin-left: 6px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAWCAYAAACWl1FwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMDdDMjlBNDE5NzAxMUU5ODkzNUNFMzEzMEQ5OTlFNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMDdDMjlBNTE5NzAxMUU5ODkzNUNFMzEzMEQ5OTlFNyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUwN0MyOUEyMTk3MDExRTk4OTM1Q0UzMTMwRDk5OUU3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUwN0MyOUEzMTk3MDExRTk4OTM1Q0UzMTMwRDk5OUU3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5O4WEgAABZVJREFUeNrkWL2OHEUQ7tpd4x/uzhYOkMCIAEhAhEBEgHRGQiLBAc+A3wB4AOANDomAlyDinCJZInBoAoQThISRZdm7usO3t/UxPd1d9VXP8AReaXZ2Z7qr6/err1vefflKyp/vv/v0cLjdHq58P0jPz+fpcN0ZrqMvvvwp35NkpwwO+ebSlatfvfbW+2n/+qtpuXohvxoujPfxlyB/kSyUWxuW/J3Ud+Ps4THgb2Ej86gmH01aFYcqEyQRtIKPL39BkmHzmogyG82S+ryMOT/fps3jv9Kfv99Lz07X3w6O+Vp++fHzw0svXjt++4PPqjNQ1WTjzPLBSDGlJRjp44TM8T915HgDGcPOApnMBooZHqan+gd1TWASNPvO+g5jbQii83R7ln67d5yenaxvrnLJ3HjzvbS8cIEGockx787FCJNn8PWkGqDo3VRtxf8qPyeTnRj1K9FRxHEQMhwlY8cxtHZJ/PJssZT0yuvvpAf3797OTjm8ev1Gjbwnckv7QVRnDKuMmAgtffJdJYyzQuD5zRApiilHdVRayfMxMFLH5WUEzUl+tyyujtEwG56xFIS9ay/lnx9npxwslqvReHCwUFNNplEsH7VHEDIElNvSBGgXbERUAGEQmrH5q8uWloEsY/DKuD7hECgCakahK8wSBTGHYSyv4bO3Kn93NUxgX46TVanWGTHZSVWLnJ6eYRQ1xCgJy0LEF1NQ3dkBPDVmal3Yx5LxoRwFFX6qdXVttaz0MK2K0F0VgxCU9m31KkUBTr3QFfIirfyo9pVRmbNEPQhiIWxz1Oa0DOozwvCDelnAnaYLEPEPEQ0LSmh0iuq5GVE6L6qB1FnGyFJ2aAGzMf3Q5kWligKSEhko/sbGSite7VsxKY9o6GwpMZ50hqfqVFA5CZV+MqdXp0C31aCOI7QoV/SGIpaBerqjGWXuhTMMcGfCJP3nDHAQR8Ai4fhq70B3nrAtozO6cm2SFYQGwSnnlKoIfb09c4d0PYVrvouUEOpb2lpkGP15fnkuMOivJdL1sVY2VD6mfe2aXrGgLHV5Qk2DO3opH2wNhNxtoLiA6hITg7z1cdlEHpColgOmiGdP33YjBtE7zDlrmmklO8TtsRJXQiFMyFwB2t12KjoYrKPfhdp2RPiuG7SoKWdEb3Asj0TpjYD23Erhw6jNcjdEJFRUYpjqHdboykcHTOEMSZ2DEPo/ZrHAAdHBk+sWM/LBzjAnoisrbtc9+53qmtDxbcpOIUxL3d6JtxkGtJEap86zoPJo0ddk6GwRhHUuNr2VpkzoO0yUOb2SttBmU78tQNz/BTLYk7jY4RhnAvNNHU/R3VnY4aJzDMa617iouKHGZxKzUE9xhP1IId1tS9Gwyqjb7PbAy62hAe99Wuu38g66eSYgpUngQZ0nOGXMFK5GEpidMe6MLe1i7WIuVWsJCNP6SVlRbBH5SEvjtq8BBcG4iQULtJ/uALzbmvTlJUgz29vilKe77b8Hi8WS2iEcn6S0Y8yedRAPYObYeE1odd2mr9tR05/YdhF5iodW7Lf2GBY4jISAM8mMzUFaNWyyU+5s1k9u7e3vG42fRt+zAxNChoB5rTQUfbuTANDWKYUMgEMin33MHzylmSMNmZzRhDOZcGjWYuEAcHoyNpyfs1OOHv398NblyxfTYiGB9TUWKBTVQsimQMdloHUj46nftXgjkuiOEjyUkeUKMdJGPZwz2+me0AmbJNuySN3qR95EfSLLHxR6/GiT/xwtf7374I9PPnrj4ma9+XC1XKR8ilCY7K4CodY01gJkIwOqBCRvoek9EpEmIynasVntCBlt66G1O3cncFKDY+GV+ryd+/RHYeIgK37MI3WCI6aM6pyenKV/Hj5J2+0uH0f+IDMH1zeHa/85OrheD9cxH1z/J8AAcNetkBTOECIAAAAASUVORK5CYII=)
      no-repeat center center/cover;
  }
`;
const activities = [
  { icon: 'vip', label: '会员尊享价' },
  { icon: 'activity', label: '参与专利秒杀活动' },
  { icon: 'coupon', label: '参与专利特价活动' },
];
const Vip: React.FC = () => {
  const { state } = useContext(StoreContext);
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Activity>
        {activities.map((activity) => (
          <div key={activity.icon} className={'activityItem'}>
            <p>
              <AliIcon icon={activity.icon} />
            </p>
            <em>{activity.label}</em>
          </div>
        ))}
      </Activity>
      <Section>
        {state.user.hasVip ? (
          <>
            <h3>
              {state.user.nickname} <span className={'brand'}>年卡会员</span>
            </h3>
            <p>{state.user.vipExpireDate}到期</p>
          </>
        ) : state.user.hasExpiredVip ? (
          <p>{`您的会员已于 ${state.user.vipExpireDate} 到期，继续开通享受诸多特权！`}</p>
        ) : (
          <p>尊敬的会员，开通VIP年费会员将获得诸多特权！</p>
        )}
        <Button type="primary" onClick={() => setVisible(true)}>
          开通/续费
        </Button>
      </Section>
      <BuyVipModal visible={visible} setVisible={(visible) => setVisible(visible)} />
    </>
  );
};

export default Vip;
